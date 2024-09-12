'use client'

import { useTheme } from 'next-themes'
import { Link } from '~/components/link'
import { Logo } from './logo'

export function Footer() {
	const { theme, setTheme } = useTheme()

	return (
		<footer className="border-t-[1px] border-muted-foreground/20 flex flex-col gap-4 py-8 px-8">
			<div className="flex items-center gap-2">
				<Logo />
				<button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>Switch theme</button>
			</div>
			<div className="flex items-center gap-2">
				<Link href="/">Home</Link>
				<Link href="/pricing">Pricing</Link>
				<Link href="/app">App</Link>
			</div>
			<span>2024 All rights reserved</span>
		</footer>
	)
}
