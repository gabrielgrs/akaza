import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

export function Grid({ children, className }: { children: ReactNode; className?: string }) {
	return <div className={twMerge('grid grid-cols-12 gap-4 w-full', className)}>{children}</div>
}
