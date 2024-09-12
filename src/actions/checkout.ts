'use server'

import { z } from 'zod'
import { ZSAError } from 'zsa'
import stripeClient from '~/libs/stripe'
import { getDomain } from '~/utils/domains'
import { authenticatedProcedure } from './procedure'

export const createCheckout = authenticatedProcedure
	.input(z.string())
	.handler(async ({ ctx: { user }, input: priceId }) => {
		const { url } = await stripeClient.checkout.sessions.create({
			payment_method_types: ['card'],
			client_reference_id: user._id,
			success_url: `${getDomain()}/assinatura/feedback?type=success`,
			cancel_url: `${getDomain()}/assinatura/feedback?type=failure`,
			mode: 'subscription',
			currency: 'usd',
			line_items: [{ price: priceId, quantity: 1 }],
			customer: user.stripeCustomerId,
		})

		if (!url) {
			throw new ZSAError('INTERNAL_SERVER_ERROR')
		}

		return { url }
	})
