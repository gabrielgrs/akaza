'use server'

import { z } from 'zod'
import { ZSAError } from 'zsa'
import schemas, { UserSchema } from '~/libs/mongoose'
import { parseObject } from '~/utils/actions'
import { sendAuthEmail } from './auth'
import { authenticatedProcedure } from './procedure'

export const createCondominium = authenticatedProcedure
	.input(
		z.object({
			name: z.string().min(5, { message: 'Mínimo de 5 caracteres' }),
			address: z.string(),
		}),
		{
			type: 'formData',
		},
	)
	.handler(async ({ input: { name, address }, ctx: { user } }) => {
		const data = await schemas.condominium.create({ name, address, creator: user._id })
		return parseObject(data)
	})

export const getCondominiums = authenticatedProcedure.handler(async ({ ctx: { user } }) => {
	const data = await schemas.condominium
		.find({ $or: [{ creator: user._id }, { members: { user: user._id } }] })
		.populate<{ creator: UserSchema }>('creator')
		.populate('units.resident')

	return parseObject(data)
})

export const removeCondominium = authenticatedProcedure
	.input(z.object({ condominiumId: z.string() }))
	.handler(async ({ ctx, input: { condominiumId } }) => {
		const data = await schemas.condominium.findOneAndDelete({ _id: condominiumId, creator: ctx.user._id })
		if (!data) throw new ZSAError('NOT_FOUND')
		return true
	})

export const updateCondominium = authenticatedProcedure
	.input(
		z.object({
			condominiumId: z.string(),
			name: z.string().min(3, { message: 'Mínimo de 3 caracteres' }),
		}),
		{
			type: 'formData',
		},
	)
	.handler(async ({ ctx: { user }, input: { condominiumId, name } }) => {
		const data = await schemas.condominium.findOneAndUpdate(
			{
				_id: condominiumId,
				$or: [{ creator: user._id }, { 'members.user': user._id, permission: 'EDIT' }],
			},
			{ name },
		)

		return parseObject(data)
	})

export const createNotification = authenticatedProcedure
	.input(
		z.object({
			title: z.string().min(3, { message: 'Mínimo de 3 caracteres' }),
			content: z.string().min(10, { message: 'Mínimo de 10 caracteres' }),
			condominiumId: z.string(),
		}),
		{ type: 'formData' },
	)
	.handler(async ({ ctx: { user }, input }) => {
		const data = await schemas.condominium.findOneAndUpdate(
			{ _id: input.condominiumId },
			{ $push: { notifications: { title: input.title, content: input.content, author: user._id } } },
		)

		return parseObject(data)
	})

export const createRule = authenticatedProcedure
	.input(
		z.object({
			title: z.string().min(4, { message: 'Mínimo de 4 caracteres' }),
			content: z.string().min(20, { message: 'Mínimo de 20 caracteres' }),
			condominiumId: z.string(),
		}),
		{ type: 'formData' },
	)
	.handler(async ({ ctx: { user }, input }) => {
		const data = await schemas.condominium.findOneAndUpdate(
			{ _id: input.condominiumId, creator: user._id },
			{ $push: { rules: { title: input.title, content: input.content } } },
		)

		return parseObject(data)
	})

export const createUnit = authenticatedProcedure
	.input(
		z.object({
			name: z.string().min(3, { message: 'Mínimo de 3 caracteres' }),
			startLivingAt: z.string().date('Data inválida.'),
			resident: z.string().email({ message: 'Formato de e-mail inválido.' }).optional(),
			rentValue: z.string().transform((value) => Number(value)),
			condominiumId: z.string(),
		}),
		{ type: 'formData' },
	)
	.handler(async ({ ctx: { user }, input }) => {
		const formData = new FormData()
		formData.append('email', input.resident || '')
		const [foundResident] = input.resident ? await sendAuthEmail(formData) : []
		const data = await schemas.condominium.findOneAndUpdate(
			{ _id: input.condominiumId, creator: user._id },
			{
				$push: {
					units: {
						name: input.name,
						startLivingAt: input.startLivingAt,
						rentValue: input.rentValue,
						resident: foundResident?._id,
					},
				},
			},
		)

		return parseObject(data)
	})

export const getUnitByCondominiumIdAndUnitId = authenticatedProcedure
	.input(
		z.object({
			condominiumIdentifier: z.string(),
			unitIdentfier: z.string(),
		}),
	)
	.handler(async ({ input }) => {
		const data = await schemas.condominium
			.findOne({ _id: input.condominiumIdentifier })
			.populate('creator')
			.populate('units.resident')
		if (!data) throw new ZSAError('NOT_FOUND')

		const unit = data.units.find((unit) => unit._id.toString() === input.unitIdentfier)
		if (!unit) throw new ZSAError('NOT_FOUND')

		return parseObject(unit)
	})
