import { NextRequest, NextResponse } from 'next/server'
import { createPrice, disableAllPrices } from '~/actions/stripe'
import stripeClient from '~/libs/stripe'
import { APP_DOMAIN, PLANS } from '~/utils/constants'

// export async function createUsers() {
//   const foundUser = await schemas.user.findOneAndUpdate({ email: ADMIN_EMAIL }, { role: 'ADMIN' })
//   if (foundUser) return foundUser
//   return schemas.user.create({ email: ADMIN_EMAIL, role: 'ADMIN' })
// }

async function createWebhook() {
	if (APP_DOMAIN.includes('localhost')) throw new Error('Localhost not allowed as webhook')

	const url = `${APP_DOMAIN}/api/stripe/webhook/`

	const response = await stripeClient.webhookEndpoints.list()
	const alreadyCreated = response.data.some((webhook) => webhook.url === url)
	if (!alreadyCreated)
		return stripeClient.webhookEndpoints.create({
			url,
			enabled_events: ['customer.subscription.deleted', 'checkout.session.completed'],
		})

	return response
}

async function recreateStripePrices() {
	await disableAllPrices()
	return Promise.all(
		Object.entries(PLANS)
			.filter((x) => Boolean(x[1].active))
			.map(([name, product]) => {
				return Promise.all([
					createPrice(name, product.price, 'month', { recurring: 'MONTH' }),
					createPrice(name, product.price * 10, 'year', { recurring: 'YEAR' }),
				])
			}),
	)
}

export async function GET(req: NextRequest) {
	try {
		const key = req.headers.get('secret') ?? ''
		if (key !== process.env.JWT_SECRET) return NextResponse.json('Invalid secret', { status: 401 })

		await createWebhook()
		await recreateStripePrices()

		return NextResponse.json({ message: 'Success ' }, { status: 200 })
	} catch (error) {
		const errorToShow = error instanceof Error ? error.message : error
		return NextResponse.json(errorToShow, { status: 500 })
	}
}
