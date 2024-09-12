import { Schema } from 'mongoose'
import { EXPIRATION_AUTH_CODE_DURATION } from '~/utils/constants'
import { SessionSchema } from '../types'

export const sessionSchema = new Schema<SessionSchema>(
	{
		email: {
			type: String,
			required: [true, 'Email is required'],
		},
		code: {
			type: String,
			required: [true, 'Code is required'],
		},
		token: {
			type: String,
			required: [true, 'Token is required'],
		},
		expiresAt: {
			type: Date,
			expires: EXPIRATION_AUTH_CODE_DURATION * 60,
			default: Date.now,
		},
	},
	{
		timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
	},
)
