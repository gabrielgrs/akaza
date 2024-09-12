import { NextResponse } from 'next/server'
import { databaseConnection } from '~/libs/mongoose'

async function getDatabaseStatus() {
	try {
		return Boolean(databaseConnection?.connection.readyState)
	} catch {
		return false
	}
}

export async function GET() {
	const database = await getDatabaseStatus()
	return NextResponse.json({ route: true, database }, { status: 200 })
}
