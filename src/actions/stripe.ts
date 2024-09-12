'use server'

import Stripe from 'stripe'
import stripeClient from '~/libs/stripe'
import { RecurringType } from '~/utils/constants/types'

export type StripePrice = Stripe.Price & { metadata: { recurring: RecurringType } }

export async function createPrice(
	name: string,
	amount: number,
	recurring: 'month' | 'year',
	metadata: StripePrice['metadata'],
) {
	const price = await stripeClient.prices.create({
		active: true,
		currency: 'usd',
		nickname: name,
		unit_amount: amount,
		recurring: { interval: recurring },
		product_data: { name },
		metadata,
	})

	return price
}

export async function getPrices() {
	const { data } = await stripeClient.prices.list({ active: true })

	return data as StripePrice[]
}

export async function disableAllPrices() {
	const { data } = await stripeClient.prices.list()

	const response = await Promise.all(data.map((price) => stripeClient.prices.update(price.id, { active: false })))
	return response
}
