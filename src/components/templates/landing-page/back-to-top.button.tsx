import { AnimatePresence, motion } from 'framer-motion'
import { ChevronUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import { cn } from '~/utils/shadcn'

export function BackToTopButton() {
	const [distance, setDistance] = useState(0)

	useEffect(() => {
		const calculateDistanceFromTop = () => setDistance(window.scrollY)
		calculateDistanceFromTop()

		window.addEventListener('scroll', calculateDistanceFromTop)

		return () => {
			window.removeEventListener('scroll', calculateDistanceFromTop)
		}
	}, [])

	return (
		<AnimatePresence>
			{distance > 600 && (
				<motion.button
					initial={{ y: 200 }}
					animate={{ y: 0 }}
					exit={{ y: 200 }}
					onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
					transition={{ duration: 0.3, type: 'spring', stiffness: 120 }}
					className={cn(
						'fixed bottom-12 right-4 z-10 border-2 rounded-full text-muted-foreground p-1',
						distance > 100 ? 'opacity-200' : 'opacity-0',
					)}
				>
					<ChevronUp />
				</motion.button>
			)}
		</AnimatePresence>
	)
}
