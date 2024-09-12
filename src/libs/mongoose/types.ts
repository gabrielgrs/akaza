import * as z from 'zod'
import * as schemas from '~/libs/zod/schemas'

export type UserSchema = z.infer<typeof schemas.userSchema>
export type CondominiumSchema = z.infer<typeof schemas.condominiumSchema>
export type SessionSchema = z.infer<typeof schemas.sessionSchema>
export type TransactionSchema = z.infer<typeof schemas.transactionSchema>
