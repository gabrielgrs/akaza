import { useAnimate } from 'framer-motion'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

const NO_CLIP = 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)'
const BOTTOM_RIGHT_CLIP = 'polygon(0 0, 100% 0, 0 0, 0% 100%)'
const TOP_RIGHT_CLIP = 'polygon(0 0, 0 100%, 100% 100%, 0% 100%)'
const BOTTOM_LEFT_CLIP = 'polygon(100% 100%, 100% 0, 100% 100%, 0 100%)'
const TOP_LEFT_CLIP = 'polygon(0 0, 100% 0, 100% 100%, 100% 0)'

const ENTRANCE_KEYFRAMES = {
	left: [BOTTOM_RIGHT_CLIP, NO_CLIP],
	bottom: [BOTTOM_RIGHT_CLIP, NO_CLIP],
	top: [BOTTOM_RIGHT_CLIP, NO_CLIP],
	right: [TOP_LEFT_CLIP, NO_CLIP],
} as const

const EXIT_KEYFRAMES = {
	left: [NO_CLIP, TOP_RIGHT_CLIP],
	bottom: [NO_CLIP, TOP_RIGHT_CLIP],
	top: [NO_CLIP, TOP_RIGHT_CLIP],
	right: [NO_CLIP, BOTTOM_LEFT_CLIP],
} as const

type CustomEvent = {
	clientX: number
	clientY: number
	target: { getBoundingClientRect: () => { left: number; right: number; top: number; bottom: number } }
}

const getNearestSide = (e: CustomEvent) => {
	const box = e.target.getBoundingClientRect()

	const proximityToLeft = {
		proximity: Math.abs(box.left - e.clientX),
		side: 'left',
	} as const
	const proximityToRight = {
		proximity: Math.abs(box.right - e.clientX),
		side: 'right',
	} as const
	const proximityToTop = {
		proximity: Math.abs(box.top - e.clientY),
		side: 'top',
	} as const
	const proximityToBottom = {
		proximity: Math.abs(box.bottom - e.clientY),
		side: 'bottom',
	} as const

	const sortedProximity = [proximityToLeft, proximityToRight, proximityToTop, proximityToBottom].sort(
		(a, b) => a.proximity - b.proximity,
	)

	return sortedProximity[0].side
}

export const Button = ({ children }: { children: ReactNode }) => {
	const [scope, animate] = useAnimate()

	const handleMouseEnter = (event: CustomEvent) => {
		const side = getNearestSide(event)

		animate(scope.current, {
			clipPath: ENTRANCE_KEYFRAMES[side],
		})
	}

	const handleMouseLeave = (e: CustomEvent) => {
		const side = getNearestSide(e)

		animate(scope.current, {
			clipPath: EXIT_KEYFRAMES[side],
		})
	}

	return (
		<motion.button
			whileHover={{ scale: 1.2 }}
			onMouseEnter={(e) => handleMouseEnter(e as any)}
			onMouseLeave={(e) => handleMouseLeave(e as any)}
			className="relative flex items-center justify-center px-4 gap-2 border-[1px] border-primary rounded-full"
		>
			{children}
			<div
				ref={scope}
				style={{
					clipPath: BOTTOM_RIGHT_CLIP,
				}}
				className="absolute inset-0 grid place-content-center bg-primary text-white rounded-full p-1"
			>
				{children}
			</div>
		</motion.button>
	)
}
