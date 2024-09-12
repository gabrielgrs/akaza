'use client'

import { ArrowRight, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { createCheckout } from '~/actions/checkout'
import { StripePrice } from '~/actions/stripe'
import { Column, Grid } from '~/components'
import { Label } from '~/components/ui/label'
import { Switch } from '~/components/ui/switch'
import { useAuth } from '~/hooks'
import { PlanName, RecurringType } from '~/utils/constants/types'
import PricingCard from './pricing-card'

type Props = {
	plans: StripePrice[]
	stripeCustomerPortalUrl?: string
}

export function BillingUI({ plans, stripeCustomerPortalUrl }: Props) {
	const [isRedirecting, setIsRedirecting] = useState(false)
	const [recurringType, setRecurringType] = useState<RecurringType>('MONTH')
	const { user } = useAuth()
	// const plans = Object.keys(PLANS) as PlanName[]

	const onRedirect = async (priceId: string) => {
		try {
			setIsRedirecting(true)
			const [data, error] = await createCheckout(priceId)
			if (error) throw error

			window.open(data.url)
		} catch (error) {
			if (error instanceof Error) toast.error(error.message)
		} finally {
			setIsRedirecting(false)
		}
	}

	if (isRedirecting || !user) return <Loader2 className="text-primary animate-spin" />

	return (
		<Grid>
			<Column size={12} className="flex justify-between items-center gap-4">
				<h1>Billing</h1>
				{stripeCustomerPortalUrl && (
					<a className="flex text-muted-foreground items-center gap-2 group" href={stripeCustomerPortalUrl}>
						Go to customer portal <ArrowRight size={20} className="group-hover:translate-x-1 duration-500" />
					</a>
				)}
			</Column>

			<Column size={12} className="flex justify-center items-center gap-4 pt-8">
				<Label>Montly</Label>
				<Switch
					checked={recurringType === 'YEAR'}
					onCheckedChange={(checked) => setRecurringType(checked ? 'YEAR' : 'MONTH')}
				/>
				<Label>Annually</Label>
			</Column>
			{plans
				.filter((x) => x.metadata.recurring === recurringType)
				.sort((a, b) => a.unit_amount! - b.unit_amount!)
				.map((plan) => (
					<Column size={12} key={plan.nickname}>
						<button
							onClick={() => onRedirect(plan.id)}
							className="w-full disabled:cursor-not-allowed disabled:opacity-70"
						>
							<PricingCard name={plan.nickname as PlanName} recurringType={recurringType} />
						</button>
					</Column>
				))}
		</Grid>
	)
}
