'use server'

import { z } from 'zod'
import { createServerAction } from 'zsa'
import { resend } from '~/libs/resend'
import { SUPPORT_EMAIL } from '~/utils/constants'

export const sendFeedback = createServerAction()
	.input(
		z.object({
			email: z.string().email({ message: 'E-mail inválido' }),
			text: z.string().min(10, { message: 'Mínimo de 10 caracteres' }),
			category: z.string(),
		}),
		{ type: 'formData' },
	)
	.handler(async ({ input: { email, text, category } }) => {
		return resend.emails.send({
			from: 'Feedback <feedback@huuma.co>',
			to: SUPPORT_EMAIL,
			subject: 'Email with login link',
			html: `${email} <br/> <br/> ${text} <br/><br/> ${category}`,
		})
	})
