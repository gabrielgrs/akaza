import { Schema } from 'mongoose'
import { TransactionSchema } from '../types'

export const transactionSchema = new Schema<TransactionSchema>(
	{
		description: {
			type: String,
			required: true,
		},
		amount: {
			type: Number,
			required: true,
		},
		type: {
			type: String,
			enum: ['EXPENSE', 'INCOME'],
			required: true,
		},
		date: {
			type: Date,
			required: true,
		},
		condominium: {
			type: Schema.Types.ObjectId,
			ref: 'Condominium',
			required: true,
		},
		unit: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
	},
)
