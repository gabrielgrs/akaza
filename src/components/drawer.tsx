'use client'

import { ReactNode } from 'react'
import { Sheet, SheetContent, SheetTrigger } from '~/components/ui/sheet'

type ModalProps = {
	title: string
	description?: string | ReactNode
	children: ReactNode
	trigger: ReactNode
	isOpen: boolean
	onOpenChange: (open: boolean) => void
}

function Content({ title, description, children }: Pick<ModalProps, 'title' | 'description' | 'children'>) {
	return (
		<>
			<div className="bg-card py-8 px-6 rounded-t-lg">
				<h1 className="text-3xl font-normal">{title}</h1>
				{description && <p className="text-muted-foreground pt-2 underline-offset-4">{description}</p>}
			</div>
			<div className="p-6">{children}</div>
		</>
	)
}

export function Drawer({ children, trigger, isOpen, onOpenChange, title, description }: ModalProps) {
	return (
		<Sheet open={isOpen} onOpenChange={onOpenChange}>
			<SheetTrigger asChild>{trigger}</SheetTrigger>
			<SheetContent className="p-0 backdrop-blur-md min-w-[40vw] overflow-y-auto">
				<Content title={title} description={description}>
					{children}
				</Content>
			</SheetContent>
		</Sheet>
	)
}
