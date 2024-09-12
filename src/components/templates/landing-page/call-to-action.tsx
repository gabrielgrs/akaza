'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

export function CTA() {
	return (
		<section className="pt-16">
			<div className="relative bg-primary">
				<motion.a
					href="/acesso"
					drag
					dragConstraints={{ top: 0, bottom: 0, right: 100, left: 100 }}
					className="text-4xl md:text-5xl flex items-center gap-2 group w-full justify-center animate-bounce px-4"
				>
					<span>Start the revolution</span>
					<ArrowUpRight
						size={48}
						className="group-hover:translate-x-4 translate-y-1  duration-500 group-hover:rotate-45"
					/>
				</motion.a>
			</div>
		</section>
	)
}
