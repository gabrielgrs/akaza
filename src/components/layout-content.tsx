'use client'

import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

type Props = {
	children: ReactNode
}

export function LayoutContent({ children }: Props) {
	const pathname = usePathname()

	return (
		<motion.div
			key={pathname}
			initial={{ opacity: 0, translateY: '50px' }}
			animate={{ opacity: 1, translateY: '0px' }}
			transition={{ duration: 0.7 }}
			className="mx-auto max-w-6xl px-8 pb-8 pt-16"
		>
			{children}
		</motion.div>
	)
}
