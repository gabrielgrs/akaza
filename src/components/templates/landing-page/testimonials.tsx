'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { cn } from '~/utils/shadcn'

const testimonials = Array.from({ length: 10 }).map((_, index) => ({
	quote:
		'It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.',
	name: 'John Doe ' + index,
	title: 'CEO',
}))

export function Testimonials() {
	const containerRef = React.useRef<HTMLDivElement>(null)
	const scrollerRef = React.useRef<HTMLUListElement>(null)

	const [start, setStart] = useState(false)

	const addAnimation = useCallback(() => {
		if (containerRef.current && scrollerRef.current) {
			const scrollerContent = Array.from(scrollerRef.current.children)

			scrollerContent.forEach((item) => {
				const duplicatedItem = item.cloneNode(true)
				if (scrollerRef.current) {
					scrollerRef.current.appendChild(duplicatedItem)
				}
			})

			getDirection()
			getSpeed()
			setStart(true)
		}
	}, [])

	useEffect(() => {
		addAnimation()
	}, [addAnimation])

	const getDirection = () => {
		if (containerRef.current) {
			// if (direction === 'left') {
			//   containerRef.current.style.setProperty('--animation-direction', 'forwards')
			// } else {
			containerRef.current.style.setProperty('--animation-direction', 'forwards')
			// }
		}
	}
	const getSpeed = () => {
		if (containerRef.current) {
			containerRef.current.style.setProperty('--animation-duration', '120s')
		}
	}
	return (
		<div ref={containerRef} className={'scroller relative z-20  max-w-7xl overflow-hidden'}>
			<ul
				ref={scrollerRef}
				className={cn(
					'flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap hover:[animation-play-state:paused]',
					start && 'animate-scroll',
				)}
			>
				{testimonials.map((item) => (
					<li
						className="max-w-[350px] border-2 border-primary/10 p-4 rounded-lg hover:border-primary/20 duration-500"
						key={item.name}
					>
						<blockquote>
							<div
								aria-hidden="true"
								className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
							></div>
							<span className="relative z-20 text-foreground font-normal">{item.quote}</span>
							<div className="relative z-20 mt-6 flex flex-row items-center">
								<span className="flex flex-col gap-1 text-sm text-muted-foreground">
									<span>{item.name}</span>
									<span>{item.title}</span>
								</span>
							</div>
						</blockquote>
					</li>
				))}
			</ul>
		</div>
	)
}
