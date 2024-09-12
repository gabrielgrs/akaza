import { Schema } from 'mongoose'
import { CondominiumSchema as CondominiumSchema } from '../types'

export const condominiumSchema = new Schema<CondominiumSchema>(
	{
		name: {
			type: String,
			required: true,
		},
		address: {
			type: String,
			required: true,
		},
		creator: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
			immutable: true,
		},
		units: {
			type: [
				{
					name: { type: String, required: true },
					resident: { type: Schema.Types.ObjectId, ref: 'User', required: true },
					startLivingAt: { type: Date, required: true },
					rentValue: { type: Number, required: true, default: 0 },
				},
			],
			default: [],
			_id: true,
		},
		notifications: {
			type: [
				{
					title: { type: String, required: true },
					content: { type: String, required: true },
					author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
				},
			],
			default: [],
			_id: true,
		},
		rules: {
			type: [
				{
					title: { type: String, required: true },
					content: { type: String, required: true },
				},
			],
			default: [],
			_id: true,
		},
	},
	{
		timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
	},
)
