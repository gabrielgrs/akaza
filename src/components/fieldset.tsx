import { ReactNode } from 'react'
import { cn } from '~/utils/shadcn'
import { Label } from './ui/label'

type FieldsetProps = {
	children: ReactNode
	label?: string
	error?: string
	info?: string
	className?: string
	required?: boolean
}

export function Fieldset({ children, label, error, info, className, required = false }: FieldsetProps) {
	const message = error || info
	return (
		<fieldset className={cn('relative', className)}>
			{label && (
				<div>
					<Label>{label}</Label>
					{required && <span className="text-red-400/60 pl-1">*</span>}
				</div>
			)}
			<div className="relative">{children}</div>
			{message && (
				<p
					role="alert"
					data-show={Boolean(error || info)}
					data-danger={Boolean(error)}
					className={
						'text-sm overflow-hidden pl-2 pt-1 transition-all duration-500 data-[show=false]:max-h-0 data-[show=true]:max-h-14 data-[danger=true]:text-red-400/60'
					}
				>
					{message}
				</p>
			)}
		</fieldset>
	)
}
