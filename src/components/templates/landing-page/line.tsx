import { motion } from 'framer-motion'
import { cn } from '~/utils/shadcn'

export function Line({ className = '' }) {
	return (
		<motion.div
			initial={{ scaleX: 0 }}
			whileInView={{ scaleX: 1 }}
			transition={{ duration: 3, delay: 1, ease: 'easeInOut' }}
			className={cn('h-[1px] w-full bg-gradient-to-r  from-primary/0 via-primary to-primary/0', className)}
		/>
	)
}
