'use client'

import { motion } from 'framer-motion'
import { Minus, Plus } from 'lucide-react'
import { useState } from 'react'
import { Column } from '~/components/column'
import { Grid } from '~/components/grid'
import { Button } from '~/components/ui/button'
import { formatCurrency } from '~/utils/formattars'
import { cn } from '~/utils/shadcn'

function Telescope() {
	const className = ['p-[-70px]', 'p-[240px]', 'p-[360px]', 'p-[480px]']

	return (
		<div className="z-0 absolute left-[50%] -top-8 translate-x-[-50%] translate-y-[-50%] pointer-events-none">
			{className.map((item) => (
				<motion.div
					key={item}
					initial={{ scale: 0.5 }}
					whileInView={{ scale: 1 }}
					transition={{ duration: 4, delay: 0.1, ease: 'easeInOut' }}
					className={cn('z-0 absolute left-[10%] border-[1px] rounded-full', 'border-foreground/20 ', item)}
				/>
			))}
		</div>
	)
}

export function PricingUI() {
	const [condomains, setCondomains] = useState(0)
	const [units, setUnits] = useState(0)

	return (
		<>
			<Telescope />
			<Grid>
				<Column size={12} className="flex justify-center pb-9">
					<span className="text-center text-5xl">Pague apenas pelo que utilizar.</span>
				</Column>
				<Column size={6} className="flex justify-center">
					<div className="grid grid-cols-[max-content,160px,max-content] items-center gap-8">
						<Button
							variant="outline"
							size="icon"
							onClick={() => setCondomains((p) => p - 1)}
							disabled={condomains === 0}
						>
							<Minus size={32} />
						</Button>
						<div className="flex flex-col items-center">
							<span className="text-3xl">{condomains}</span>
							condomínios
						</div>
						<Button variant="outline" size="icon" onClick={() => setCondomains((p) => p + 1)}>
							<Plus size={32} />
						</Button>
					</div>
				</Column>
				<Column size={6} className="flex justify-center">
					<div className="grid grid-cols-[max-content,80px,max-content] items-center gap-8">
						<Button variant="outline" size="icon" onClick={() => setUnits((p) => p - 1)} disabled={units === 0}>
							<Minus size={32} />
						</Button>
						<div className="flex flex-col items-center">
							<span className="text-3xl">{units}</span>
							unidades
						</div>
						<Button variant="outline" size="icon" onClick={() => setUnits((p) => p + 1)}>
							<Plus size={32} />
						</Button>
					</div>
				</Column>
				<Column size={12} className="flex justify-center items-end pt-12">
					<span className="text-6xl">{formatCurrency((condomains * 20 + units * 3) * 100)}</span>
					<span className="text-lg opacity-70 pl-2">{'/'} por mês</span>
				</Column>
			</Grid>
		</>
	)
}
