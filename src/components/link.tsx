import NextLink, { LinkProps } from 'next/link'
import { ReactNode } from 'react'
import { cn } from '~/utils/shadcn'

type Props = {
	children: ReactNode
	href: LinkProps['href']
	className?: string
	onClick?: LinkProps['onClick']
	target?: '_blank'
}

export function Link({ children, href, className }: Props) {
	return (
		<NextLink href={href} prefetch={false} className={cn('relative', className)}>
			{children}
		</NextLink>
	)
}
