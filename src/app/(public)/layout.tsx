import { ReactNode } from 'react'
import { Footer, PublicNavbar } from '~/components'

type Props = {
	children: ReactNode
}

export default function PublicLayout({ children }: Props) {
	return (
		<>
			<PublicNavbar />
			<main className="mx-auto max-w-7xl py-16 px-8">{children}</main>
			<Footer />
		</>
	)
}
