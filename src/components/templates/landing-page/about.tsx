'use client'

import { animate, motion, useMotionValue, useTransform } from 'framer-motion'
import { useEffect } from 'react'
import { cn } from '~/utils/shadcn'

const Counter = ({ from, to, duration }: { from: number; to: number; duration: number }) => {
	const count = useMotionValue(from)
	const rounded = useTransform(count, (latest) => Math.round(latest))

	useEffect(() => {
		const controls = animate(count, to, { duration })

		return controls.stop
	}, [count, duration, to])

	return <motion.p>{rounded}</motion.p>
}

type Props = {
	totalCondominiums: number
}

export function About({ totalCondominiums }: Props) {
	return (
		<>
			<p className="font-thin">
				{String(
					'" Nós transformamos o caos da administração em uma história organizada! Cada interação, solicitação e decisão se torna um ponto importante na gestão do seu condomínio, criando uma experiência fluida e eficaz para todos os moradores.',
				)
					.split(' ')
					.map((c, index) => (
						<motion.span
							key={`${c}_${index}`}
							initial={{ y: 10, fontSize: '0', opacity: 0 }}
							whileInView={{ y: 0, fontSize: '40px', opacity: 1 }}
							transition={{ delay: index * 0.2, duration: 0.4 }}
							viewport={{ once: true }}
							className={cn(
								[
									'"',
									'transformamos',
									'caos',
									'criando',
									'experiência',
									'fluida',
									'eficaz',
									'para',
									'moradores.',
								].includes(c.toLowerCase())
									? 'text-primary'
									: 'text-foreground/80',
							)}
						>
							{c}{' '}
						</motion.span>
					))}
			</p>
			<div className="px-8 pt-48 flex flex-col md:flex-row justify-around gap-4">
				{[{ quantity: totalCondominiums, label: 'Condomínios criados' }].map((item) => (
					<div key={item.label} className="text-center">
						<div className="text-3xl md:text-7xl bg-gradient-to-r from-neutral-100 to-neutral-500 text-transparent bg-clip-text">
							<Counter from={0} to={item.quantity} duration={String(item.quantity).length} />
						</div>
						<div className="text-lg text-muted-foreground">{item.label}</div>
					</div>
				))}
			</div>
		</>
	)
}
