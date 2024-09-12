import { redirect } from 'next/navigation'
import { ReactNode } from 'react'
import { getAuthenticatedUser } from '~/actions/auth'
import { LayoutContent } from '~/components'
import PrivateNavbar, { PrivateNavbarHeader, PrivateNavbarItems } from '~/components/private-navbar/private-navbar'

type Props = {
	children: ReactNode
}

export default async function PrivateLayout({ children }: Props) {
	const tokenData = await getAuthenticatedUser()
	if (!tokenData) return redirect(`/logout`)

	return (
		<>
			<PrivateNavbar>
				<PrivateNavbarHeader logoHref="/condominios" />
				<PrivateNavbarItems />
			</PrivateNavbar>
			<LayoutContent>{children}</LayoutContent>
		</>
	)
}
