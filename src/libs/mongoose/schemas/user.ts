import { Schema } from 'mongoose'
import { UserSchema } from '../types'

export const userSchema = new Schema<UserSchema>(
	{
		email: {
			type: String,
			required: [true, 'Email is required'],
			unique: true,
			lowercase: true,
			trim: true,
			match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
		},
		name: {
			type: String,
			required: false,
		},
		avatar: {
			type: String,
			required: false,
		},
		stripeSubscriptionId: {
			type: String,
			required: false,
		},
		stripeCustomerId: {
			type: String,
			required: [true, 'Stripe customer id is required'],
		},
		role: { type: String, enum: ['USER', 'ADMIN'], default: 'USER' },
	},
	{
		timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
	},
)
