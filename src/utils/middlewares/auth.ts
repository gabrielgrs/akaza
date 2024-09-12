import { NextRequest, NextResponse } from 'next/server'
import { decodeToken } from '~/libs/jose'
import { getMiddlewareToken } from './helpers'

export async function authMiddleware(request: NextRequest) {
	try {
		const token = getMiddlewareToken(request) || ''
		const tokenData = await decodeToken(token)
		if (!tokenData) throw new Error('Unauthorized access')
		const response = NextResponse.redirect(new URL('/condominios', request.url))
		response.cookies.set('token', token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: true,
		})
		return response
	} catch {
		const response = NextResponse.next()
		response.cookies.delete('token')
		return response
	}
}
