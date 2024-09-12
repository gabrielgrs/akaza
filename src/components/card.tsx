import { ReactNode } from 'react'
import { cn } from '~/utils/shadcn'

type Props = {
	children: ReactNode
	className?: string
}

export function Card({ children, className, ...rest }: Props) {
	return (
		<div {...rest} className={cn('bg-card border-[1px] p-4 rounded-lg shadow relative', className)}>
			{children}
		</div>
	)
}
