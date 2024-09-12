'use client'

import { motion } from 'framer-motion'
import { SLOGAN } from '~/utils/constants'
import { cn } from '~/utils/shadcn'
import { NavbarCTA } from './navbar-call-to-action'

export function Hero() {
	return (
		<>
			<div className="relative z-10 flex flex-col gap-4">
				<div className="flex justify-center">
					<motion.div
						initial={{ opacity: 0, x: 250 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 3, delay: 2, type: 'spring', stiffness: 120 }}
						className="text-muted-foreground w-max bg-foreground/10 text-sm md:text-base px-4 py-1 rounded-full border-[1px] border-primary"
					>
						Estamos em desenvolvimento
					</motion.div>
				</div>
				<motion.h1
					initial={{ scale: 0.1, opacity: 0, y: -100 }}
					animate={{ scale: 1, opacity: 1, y: 0, z: 0 }}
					transition={{ duration: 1 }}
					className={cn('text-5xl md:text-7xl font-thin')}
				>
					Descubra o poder
					<br />
					<div className="relative py-2 px-4 w-max">
						<motion.div
							initial={{ width: 0 }}
							animate={{ width: '100%' }}
							transition={{ duration: 3 }}
							className="h-full bg-gradient-to-r from-primary/50 to-secondary/50 backdrop-blur-lg absolute bottom-0 left-0 rounded-lg"
						/>
						<p className="z-10 relative text-white">do seu condomínio</p>
					</div>
				</motion.h1>
				<motion.p className="text-muted-foreground">
					{Array.from(SLOGAN).map((c, i) => (
						<motion.span
							key={i}
							initial={{ y: 10, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ delay: i * 0.01 }}
						>
							{c}
						</motion.span>
					))}
				</motion.p>
				<motion.div
					initial={{ opacity: 0, x: -250 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: 1.3, duration: 2, type: 'spring', stiffness: 120 }}
					className="flex flex-col items-center gap-2"
				>
					<NavbarCTA />

					<motion.button className="group flex items-center justify-center gap-1 py-2 px-4 rounded-full relative text-muted-foreground">
						<div className="w-max relative group-hover:-translate-y-4 duration-500">
							<span className="group-hover:opacity-0 duration-500">Documentation</span>
							<span className="absolute left-0 -bottom-4 opacity-0 group-hover:opacity-100 duration-500">
								Saiba mais
							</span>
						</div>
					</motion.button>
				</motion.div>
			</div>
		</>
	)
}
