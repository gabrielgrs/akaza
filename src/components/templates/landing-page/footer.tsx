'use client'

import { AtSign, Twitter } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Logo } from '~/components/logo'
import { Separator } from '~/components/ui/separator'
import { APP_NAME, SLOGAN, SUPPORT_EMAIL, TWITTER_LINK } from '~/utils/constants'

export function Footer() {
	const { theme, setTheme } = useTheme()

	return (
		<footer className="p-4">
			<Separator />
			<div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 py-6 gap-8">
				<div className="flex flex-col gap-2">
					<span className="text-primary">
						<Logo />
					</span>
					<p className="text-sm text-muted-foreground">{SLOGAN}</p>
					<p className="text-sm text-muted-foreground">
						© {new Date().getFullYear()} {APP_NAME} Inc.
					</p>
					<button
						onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
						className="text-sm text-muted-foreground w-max"
					>
						<span>Toggle theme</span>
					</button>
				</div>
				<div className="flex flex-col gap-2">
					<strong className="underline underline-offset-4">Links</strong>
					<a target="_blank" className="text-muted-foreground hover:text-foreground duration-500">
						Documentation
					</a>
					<a target="_blank" className="text-muted-foreground hover:text-foreground duration-500">
						Blog
					</a>
				</div>
				<div className="flex flex-col gap-2">
					<strong className="underline underline-offset-4">Socials</strong>
					{[
						{ href: `mailto:${SUPPORT_EMAIL}`, label: 'Email', Icon: AtSign },
						{ href: TWITTER_LINK, label: 'Twitter', Icon: Twitter },
					].map((item) => (
						<a
							key={item.href}
							href={item.href}
							target="_blank"
							className="hover:opacity-100 opacity-70 border-muted-foreground w-max duration-500 flex items-center gap-2"
						>
							<item.Icon size={20} />
							<span>{item.label}</span>
						</a>
					))}
				</div>
			</div>
		</footer>
	)
}
