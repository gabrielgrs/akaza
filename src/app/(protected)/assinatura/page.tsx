import { getPrices } from '~/actions/stripe'
import { BillingUI } from '~/components/templates/billing'

// export const revalidate = 600

export default async function BillingPage() {
	const [plans] = await Promise.all([getPrices()])

	return <BillingUI plans={plans} stripeCustomerPortalUrl={process.env.STRIPE_CUSTOMER_PORTAL} />
}
