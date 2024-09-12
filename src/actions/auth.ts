'use server'

import { cookies } from 'next/headers'
import { z } from 'zod'
import { ZSAError, createServerAction } from 'zsa'
import { createToken } from '~/libs/jose'
import schemas from '~/libs/mongoose'
import { resend } from '~/libs/resend'
import { createOrFindCustomerByEmail } from '~/libs/stripe/utils'
import { parseObject } from '~/utils/actions'
import { APP_NAME } from '~/utils/constants'
import { getDomain } from '~/utils/domains'
import AuthEmail from '../../emails/auth'
import { authenticatedProcedure } from './procedure'

export const createOrFindUserAndCustomer = createServerAction()
	.input(z.string().email({ message: 'E-mail inválido' }))
	.handler(async ({ input: email }) => {
		const foundUser = await schemas.user.findOne({ email })
		if (foundUser) return foundUser
		const customer = await createOrFindCustomerByEmail(email)
		const createdUser = await schemas.user.create({ email, stripeCustomerId: customer.id })
		return parseObject(createdUser)
	})

export const getAuthenticatedUser = authenticatedProcedure.handler(async ({ ctx }) => {
	return ctx.user
})

export async function logout() {
	cookies().delete('token')
	return true
}

export const sendAuthEmail = createServerAction()
	.input(
		z.object({
			email: z.string().email({ message: 'E-mail inválido' }),
		}),
		{ type: 'formData' },
	)
	.handler(async ({ input: { email } }) => {
		const [user] = await createOrFindUserAndCustomer(email)
		if (!user) throw new ZSAError('NOT_AUTHORIZED')

		const token = await createToken({ _id: user._id, email: user.email, role: user.role })
		const code = Math.floor(100000 + Math.random() * 900000)

		await schemas.session.create({ email, code, token })

		if (process.env.NODE_ENV === 'development') {
			return parseObject({ code, _id: user._id, email })
		}

		await resend.emails.send({
			from: `${APP_NAME} Magic Link <auth@huuma.co>`,
			to: email,
			subject: 'Email with login link',
			react: AuthEmail({
				baseUrl: getDomain(),
				token,
				code,
			}),
		})

		return parseObject({ code: 9, _id: user._id, email })
	})

export const updateUser = authenticatedProcedure
	.input(
		z.object({
			name: z.string().min(3, { message: 'Mínimo de 3 caracteres' }),
		}),
		{ type: 'formData' },
	)
	.handler(async ({ input: { name }, ctx }) => {
		const updatedUser = await schemas.user.findOneAndUpdate({ _id: ctx.user._id }, { name }, { new: true })
		if (!updatedUser) throw new Error('Not found')
		return parseObject(updatedUser.toJSON())
	})

export const validateCode = createServerAction()
	.input(
		z.object({
			email: z.string().email({ message: 'E-mail inválido' }),
			code: z.string().min(6, { message: 'Código inválido' }).max(6, { message: 'Código inválido' }),
		}),
		{ type: 'formData' },
	)
	.handler(async ({ input: { email, code } }) => {
		const foundSession = await schemas.session.findOneAndDelete({ code, email })
		if (!foundSession) throw new ZSAError('NOT_FOUND')

		const { token } = foundSession
		return { token }
	})
