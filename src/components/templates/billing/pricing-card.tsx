'use client'

import { motion } from 'framer-motion'
import { Card } from '~/components'
import { PLANS } from '~/utils/constants'
import { getYearPrice } from '~/utils/constants/functions'
import { PlanName, RecurringType } from '~/utils/constants/types'
import { formatCurrency } from '~/utils/formattars'
import { cn } from '~/utils/shadcn'

type PricingCardProps = {
	name: PlanName
	active?: boolean
	recurringType: RecurringType
}

export default function PricingCard({ name, active = false, recurringType }: PricingCardProps) {
	const { price } = PLANS[name]

	const planName = name.slice(0, 1).toUpperCase() + name.slice(1).toLowerCase()
	const totalPrice = recurringType === 'YEAR' ? getYearPrice(price) : price

	return (
		<Card
			data-active={active}
			className={cn('data-[active=true]:border-primary/100 border duration-500 hover:border-primary/50')}
		>
			<div className="flex justify-between items-center">
				<h2>{planName}</h2>
				{name !== 'FREE' && (
					<div>
						<br />
						<p className="text-2xl">
							<div>
								{Array.from(formatCurrency(totalPrice)).map((item, index) => {
									return (
										<motion.span
											key={`${item}-${Math.random()}`}
											initial={{ opacity: 0, translateY: '30px' }}
											animate={{ opacity: 1, translateY: '0px' }}
											transition={{ duration: 0.5, delay: index * 0.1 }}
											className="font-semibold"
										>
											{item}
										</motion.span>
									)
								})}
								<span className="text-lg text-foreground/70">
									{' / '}
									{recurringType.toLowerCase()}
								</span>
							</div>{' '}
						</p>
						<span className="text-muted-foreground text-sm">Recurrent</span>
						<br />
					</div>
				)}
			</div>
		</Card>
	)
}
