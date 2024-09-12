'use server'

import { z } from 'zod'
import schemas from '~/libs/mongoose'
import { parseObject } from '~/utils/actions'
import { authenticatedProcedure } from './procedure'

export const createExpense = authenticatedProcedure
	.input(
		z.object({
			condominiumId: z.string(),
			amount: z.string().transform((value) => Number(value)),
			description: z.string({ message: 'Campo inválido.' }),
			date: z.string().date('Data inválida.'),
			unit: z.string(),
			resident: z.string().optional(),
		}),
		{ type: 'formData' },
	)
	.handler(async ({ input }) => {
		const data = await schemas.transaction.create({
			condominium: input.condominiumId,
			user: input.resident,
			amount: input.amount,
			unit: input.unit,
			description: input.description,
			date: new Date(input.date),
			type: 'EXPENSE',
		})

		return parseObject(data)
	})

export const createIncome = authenticatedProcedure
	.input(
		z.object({
			condominiumId: z.string(),
			amount: z.string().transform((value) => Number(value)),
			description: z.string({ message: 'Campo inválido.' }),
			date: z.string().date('Data inválida.'),
			unit: z.string(),
			resident: z.string().optional(),
		}),
		{ type: 'formData' },
	)
	.handler(async ({ input }) => {
		const data = await schemas.transaction.create({
			condominium: input.condominiumId,
			user: input.resident,
			amount: input.amount,
			unit: input.unit,
			description: input.description,
			date: new Date(input.date),
			type: 'INCOME',
		})

		return parseObject(data)
	})

export const getTransactionsByUnitId = authenticatedProcedure
	.input(z.object({ unitId: z.string() }))
	.handler(async ({ input }) => {
		const transactions = await schemas.transaction.find({ unit: input.unitId }).sort({ date: -1 })
		return parseObject(transactions)
	})
