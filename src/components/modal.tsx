'use client'

import { ReactNode, useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from '~/components/ui/dialog'
import { Drawer, DrawerContent, DrawerTrigger } from '~/components/ui/drawer'

export type ModalProps = {
	title: string
	description?: string | ReactNode
	children: ReactNode
	trigger?: ReactNode
	isOpen?: boolean
	onOpenChange?: (open: boolean) => void
}

function Content({
	title,
	description,
	children,
	className,
}: Pick<ModalProps, 'title' | 'description' | 'children'> & { className?: string }) {
	return (
		<div className={className}>
			<div className="bg-card py-8 px-6 rounded-t-lg">
				<h1 className="text-3xl font-normal">{title}</h1>
				{description && <p className="text-muted-foreground pt-2 underline-offset-4">{description}</p>}
			</div>
			<div className="p-6 overflow-y-auto">{children}</div>
		</div>
	)
}

export function Modal({ children, trigger, isOpen, onOpenChange, title, description }: ModalProps) {
	const [showDrawer, setShowDrawer] = useState(false)

	useEffect(() => {
		const onResize = () => {
			setShowDrawer(window.innerWidth < 600)
		}

		onResize()

		window.addEventListener('resize', onResize)
		return () => {
			window.removeEventListener('resize', onResize)
		}
	}, [])

	return showDrawer ? (
		<Drawer open={isOpen} onOpenChange={onOpenChange}>
			{trigger && <DrawerTrigger asChild>{trigger}</DrawerTrigger>}
			<DrawerContent className="p-0 backdrop-blur-md min-h-[60vh]">
				<Content title={title} description={description} className="overflow-y-auto max-h-[80vh]">
					{children}
				</Content>
			</DrawerContent>
		</Drawer>
	) : (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent className="p-0 backdrop-blur-md">
				<Content title={title} description={description}>
					{children}
				</Content>
			</DialogContent>
		</Dialog>
	)
}
