'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link } from '~/components/link'
import { Logo } from '~/components/logo'
import { cn } from '~/utils/shadcn'

const navItems = [
	{ label: 'Sobre', href: '#sobre' },
	{ label: 'Precificação', href: '#preco' },
]

export function NavbarCTA() {
	const [distance, setDistance] = useState(0)
	const ref = useRef<HTMLDivElement>(null)

	useEffect(() => {
		function calculateDistanceFromTop() {
			if (ref.current) {
				const distance = ref.current.getBoundingClientRect().top
				setDistance(distance)
			}
		}

		window.addEventListener('scroll', calculateDistanceFromTop)
		calculateDistanceFromTop()

		return () => {
			window.removeEventListener('scroll', calculateDistanceFromTop)
		}
	}, [])

	return (
		<div className="relative">
			<div ref={ref} />
			<motion.nav
				className={cn(
					'top-6 left-[50%] translate-x-[-50%] duration-500 flex justify-between gap-2 md:gap-4 items-center z-50  backdrop-blur border-2 text-base md:text-lg w-max p-2 rounded-full h-14 md:h-16 pl-6',
					distance < 30
						? 'fixed top-6 bg-neutral-950/10 border-muted-foreground/20'
						: 'relative top-0 border-neutral-200',
				)}
			>
				<Logo hideText className={cn(distance < 30 && 'sm:block hidden')} />
				<AnimatePresence>
					{distance < 30 && (
						<motion.div
							key="content"
							initial="collapsed"
							animate="open"
							exit="collapsed"
							variants={{
								open: { opacity: 1, width: 'auto' },
								collapsed: { opacity: 0, width: 0 },
							}}
							transition={{ duration: 1 }}
							className="inline-flex items-center gap-2 md:gap-4"
						>
							{navItems.map((item) => (
								<Link
									key={item.label}
									href={item.href}
									className="relative text-foreground/50 hover:text-foreground duration-500 whitespace-nowrap"
								>
									{item.label}
								</Link>
							))}
						</motion.div>
					)}
				</AnimatePresence>
				<Link
					href="/acesso"
					className="relative flex items-center justify-center group gap-1 bg-neutral-200 text-neutral-950 h-full rounded-full pr-2 md:pl-4 pl-2 group"
				>
					<motion.div className="group flex items-center justify-center gap-1 rounded-full relative">
						<p className="w-max relative group-hover:-translate-y-4 duration-500">
							<span className="group-hover:opacity-0 duration-500">Acessar</span>
							<span className="absolute left-0 -bottom-4 opacity-0 group-hover:opacity-100 duration-500">Acessar</span>
						</p>
					</motion.div>
					<ArrowRight size={20} className="hidden md:block duration-500 group-hover:-rotate-45 group-hover:scale-125" />
				</Link>
			</motion.nav>
		</div>
	)
}
