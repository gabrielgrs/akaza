import * as jose from 'jose'
import { cookies } from 'next/headers'
import { UserSchema } from '../mongoose'

export type TokenData = Pick<UserSchema, '_id' | 'email' | 'role'>

export const decodeToken = async (token: string) => {
	return jose
		.jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET))
		.then((res) => res.payload as TokenData)
		.catch(() => null)
}

export const createToken = async (data: TokenData) => {
	return new jose.SignJWT(data)
		.setProtectedHeader({ alg: 'HS256' })
		.sign(new TextEncoder().encode(process.env.JWT_SECRET))
}

export const getTokenData = () => decodeToken(cookies().get('token')?.value!)
