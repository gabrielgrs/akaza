import { NextRequest, NextResponse } from 'next/server'
import { getAuthenticatedUser } from '~/actions/auth'
import schemas from '~/libs/mongoose'
import { storage } from '~/libs/vercel-blob'
import { APP_NAME } from '~/utils/constants'

const BUCKET_NAME = APP_NAME.toLowerCase()

export async function POST(req: NextRequest) {
	try {
		const [user, error] = await getAuthenticatedUser()
		if (error) return NextResponse.json({ message: error }, { status: 401 })

		const formData = await req.formData()
		const file = formData.get('file') as File

		if (user.avatar) {
			await storage.remove(user.avatar)
		}

		const response = await storage.upload(file, BUCKET_NAME)

		await schemas.user.findOneAndUpdate({ _id: user._id }, { avatar: response.url })

		return NextResponse.json({ message: 'Success', url: response.url }, { status: 200 })
	} catch (error) {
		return NextResponse.json(
			{ message: error instanceof Error ? error.message : 'Algo de inesperado aconteceu. Tente novamente mais tarde.' },
			{ status: 500 },
		)
	}
}
