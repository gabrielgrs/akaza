import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Logo } from '~/components'
import { cn } from '~/utils/shadcn'
import { Toggle } from './toggle'

function useScrollPosition() {
	const [y, setY] = useState(0)

	useEffect(() => {
		const handleScroll = () => setY(window.scrollY)
		handleScroll()

		window.addEventListener('scroll', handleScroll)
		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])

	return y
}

type Props = {
	items: {
		href: string
		label: string
	}[]
}

export function Navbar({ items }: Props) {
	const y = useScrollPosition()
	const [open, setOpen] = useState(false)

	useEffect(() => {
		setOpen(false)
	}, [y])

	return (
		<header>
			<motion.div
				initial={{ y: -250 }}
				animate={{ y: 0 }}
				transition={{ duration: 0.5, delay: 1, type: 'spring', stiffness: 120 }}
				className={cn(
					'fixed flex items-center justify-between gap-4 top-0 left-0 w-full z-50 text-lg duration-500',
					y > 60 ? 'bg-background/5 backdrop-blur-lg h-16 px-4' : 'h-20 px-8',
				)}
			>
				<div>
					<Logo href="#" />
				</div>
				<div className="h-full py-1 pr-1 flex items-center gap-6">
					<a href="/acesso" className="group flex items-center gap-2 h-full">
						<span className="group-hover:scale-110 duration-500 underline underline-offset-8 hover:underline-offset-[12px] text-muted-foreground hover:text-foreground">
							Go to app
						</span>
					</a>
					<button onClick={() => setOpen((p) => !p)} className="h-6">
						<Toggle open={open} />
					</button>
				</div>
			</motion.div>
			<nav
				data-open={open}
				className="fixed z-50 rounded-lg flex right-2 flex-col gap-4 translate-y-[20vh] translate-x-[200px] data-[open=true]:translate-x-0 duration-1000 items-end"
			>
				{items.map((option, index) => (
					<a
						key={`${index}_${option.href}`}
						href={option.href}
						className="relative backdrop-blur-md rounded-lg py-1 px-2 group text-muted-foreground w-max hover:text-primary duration-1000 flex items-center gap-2 justify-end"
					>
						<span className="z-10 text-muted-foreground">{option.label}</span>
						<div className="bg-muted-foreground h-[1px] w-0 group-hover:w-8 duration-500" />
						<span className="text-sm">{index + 1}</span>
					</a>
				))}
			</nav>
		</header>
	)
}
