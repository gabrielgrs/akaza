'use client'

import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Link } from '~/components/link'
import { cn } from '~/utils/shadcn'
import { Logo } from './logo'

const menuItems = [
	{ text: 'Home', href: '/' },
	{ text: 'Pricing', href: '/pricing/' },
]

export function PublicNavbar({ className }: { className?: string }) {
	const [isRedirecting, setIsRedirecting] = useState(false)
	const pathname = usePathname()

	return (
		<header
			className={cn(
				'flex justify-between md:grid md:grid-cols-[80px,auto,80px] z-20 backdrop-blur-sm bg-background/50 gap-2 items-center py-4 duration-500 px-8 border-b-[1px] border-muted-foreground/20 sticky w-full top-0',
				className,
			)}
		>
			<div className="w-max">
				<Logo />
			</div>
			<nav className="flex items-center justify-center gap-1 md:gap-4">
				{menuItems.map((event) => (
					<Link
						key={event.text}
						href={event.href}
						className={cn('font-semibold relative px-4 py-1 flex justify-center')}
					>
						<span className="z-10">{event.text}</span>

						{pathname === event.href && (
							<motion.div
								layoutId="menubar"
								className="absolute bg-muted-foreground/10 rounded-lg h-full w-full top-0 left-0"
							/>
						)}
					</Link>
				))}
			</nav>
			<div className="flex justify-end w-max">
				{isRedirecting ? (
					<Loader2 className="text-primary animate-spin cursor-not-allowed" />
				) : (
					<Link onClick={() => setIsRedirecting(true)} href="/auth" className="text-primary hover:underline">
						App
					</Link>
				)}
			</div>
		</header>
	)
}
