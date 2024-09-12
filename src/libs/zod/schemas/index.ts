import * as z from 'zod'

// Define the Document schema
export const documentSchema = z.object({
	_id: z.string(),
	createdAt: z.date(),
	updatedAt: z.date(),
})

export const userSchema = z
	.object({
		email: z.string(),
		name: z.string(),
		avatar: z.string(),
		stripeSubscriptionId: z.string().optional(),
		stripeCustomerId: z.string(),
		role: z.enum(['USER', 'ADMIN']),
	})
	.merge(documentSchema)

export const condominiumSchema = z
	.object({
		name: z.string(),
		address: z.string(),
		creator: z.union([z.string(), userSchema]),
		units: z.array(
			z.object({
				_id: z.string(),
				name: z.string(),
				resident: userSchema,
				startLivingAt: z.date(),
				rentValue: z.number(),
			}),
		),
		notifications: z.array(
			z.object({
				_id: z.string(),
				title: z.string(),
				content: z.string(),
				author: z.union([z.string(), userSchema]),
			}),
		),
		rules: z.array(
			z.object({
				_id: z.string(),
				title: z.string(),
				content: z.string(),
			}),
		),
	})
	.merge(documentSchema)

export const sessionSchema = z
	.object({
		email: z.string(),
		code: z.string(),
		token: z.string(),
		expiresAt: z.date(),
	})
	.merge(documentSchema)

export const transactionSchema = z
	.object({
		description: z.string(),
		amount: z.number(),
		condominium: z.union([z.string(), condominiumSchema]),
		type: z.enum(['EXPENSE', 'INCOME']),
		date: z.date(),
		unit: z.string(),
	})
	.merge(documentSchema)
