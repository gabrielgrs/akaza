'use client'

import { motion } from 'framer-motion'
import { ReactNode, useState } from 'react'
import { CondominiumSchema } from '~/libs/mongoose'
import { Card } from '../../card'
import { DangerZoneUI } from './danger-zone'
import { GeneralUI } from './general'

type Props = {
	condominium: CondominiumSchema
}

type Section = {
	title: string
	render: (props: Props) => ReactNode
}

const sections: Section[] = [
	{
		title: 'Geral',
		render: GeneralUI,
	},
	{
		title: 'Zona de risco',
		render: DangerZoneUI,
	},
]

export function CondominiumSettingsUI({ condominium }: Props) {
	const [selected, setSelected] = useState(0)

	const { render: Render, title } = sections[selected]

	return (
		<div className="grid grid-cols-1 md:grid-cols-[200px,auto] gap-8">
			<aside>
				<Card>
					<ul className="flex gap-4 md:gap-0 flex-row md:flex-col flex-wrap items-start">
						{sections.map((item, index) => (
							<button
								onClick={() => setSelected(index)}
								key={`${item.title}-${index}`}
								className="relative md:w-full text-left p-2"
							>
								<span className="relative z-10">{item.title}</span>
								{index === selected && (
									<motion.div
										className="h-full w-full absolute bg-foreground/10 rounded-lg top-0 left-0"
										layoutId="activeDoc"
									/>
								)}
							</button>
						))}
					</ul>
				</Card>
			</aside>
			<main>
				<motion.div
					key={selected}
					initial={{ opacity: 0, translateY: '50px' }}
					animate={{ opacity: 1, translateY: '0px' }}
					transition={{ duration: 0.5 }}
				>
					<Card className="pt-8">
						<h1 className="pb-8">{title}</h1>
						<div className="px-4">
							<Render condominium={condominium} />
						</div>
					</Card>
				</motion.div>
			</main>
		</div>
	)
}
