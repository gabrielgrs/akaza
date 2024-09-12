import { NextRequest, NextResponse } from 'next/server'
import { decodeToken } from '~/libs/jose'
import { getMiddlewareToken } from './helpers'

export async function sharedMiddleware(request: NextRequest) {
	const response = NextResponse.next()
	const token = getMiddlewareToken(request)
	if (token) {
		const tokenData = await decodeToken(token)
		if (!tokenData) {
			response.cookies.delete('token')
			return NextResponse.redirect(new URL('/logout', request.url))
		}
		response.cookies.set('token', token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: true,
		})
	}
	return response
}
