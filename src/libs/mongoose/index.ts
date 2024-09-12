import mongoose from 'mongoose'
import { generateModel } from './helpers'
import { condominiumSchema } from './schemas/condominium'
import { sessionSchema } from './schemas/session'
import { transactionSchema } from './schemas/transaction'
import { userSchema } from './schemas/user'
import * as T from './types'

export let databaseConnection: typeof mongoose | null = null

export const connectDatabase = async (): Promise<typeof mongoose> => {
	if (databaseConnection) return databaseConnection
	databaseConnection = await mongoose.set('strictQuery', true).connect(process.env.MONGODB_URI)
	return databaseConnection
}

connectDatabase()

const schemas = {
	condominium: generateModel<T.CondominiumSchema>(condominiumSchema, 'Condominium'),
	user: generateModel<T.UserSchema>(userSchema, 'User'),
	session: generateModel<T.SessionSchema>(sessionSchema, 'Session'),
	transaction: generateModel<T.TransactionSchema>(transactionSchema, 'Transaction'),
}

export * from './types'

export default schemas
