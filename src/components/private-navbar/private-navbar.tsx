'use client'

// import { format } from 'date-fns'
import { motion } from 'framer-motion'
import { useParams, usePathname } from 'next/navigation'
import { Link } from '~/components/link'
import { Skeleton } from '~/components/ui/skeleton'
import { useAuth } from '~/hooks'
// import { PLANS } from '~/utils/constants'
import { PLANS } from '~/utils/constants'
import { PlanName } from '~/utils/constants/types'
import { cn } from '~/utils/shadcn'
import { Logo } from '../logo'
import { CondominiumSwitcher } from './condominium-switcher'
import { UserInfo } from './user-info'

export const menuItems = [
	// { text: 'Dashboard', href: '/dashboard/' },
	{ text: 'Avisos', href: '/avisos/' },
	{ text: 'Regras', href: '/regras/' },
	{ text: 'Unidades', href: '/unidades/', child: ['/unidade/'] },
	{ text: 'Configurações', href: '/configuracoes/' },
]

const getPlanNameByPrice = (price: number): PlanName => {
	const plansByKeys = Object.keys(PLANS) as PlanName[]
	return plansByKeys.find((key: PlanName) => PLANS[key].price === price) || 'FREE'
}

export function PrivateNavbarHeader({ logoHref = '/' }) {
	const { user } = useAuth()

	return (
		<div className="flex justify-between items-center">
			<div className="flex gap-2 items-center">
				<Logo href={logoHref} />
				<span className="text-lg opacity-30 scale-y-150">{'/'}</span>
				<CondominiumSwitcher />
				{user && (
					<Link href="/assinatura" className="bg-foreground text-background px-2 rounded-full text-sm font-semibold">
						{getPlanNameByPrice(user.subscription.price).toLowerCase()}
					</Link>
				)}
			</div>
			{user ? <UserInfo user={user} /> : <Skeleton className="h-7 w-10" />}
		</div>
	)
}

export function PrivateNavbarItems() {
	const pathname = usePathname()
	const { identifier } = useParams()

	if (!pathname.includes('/condominio/')) return null

	return (
		<motion.nav
			initial={{ opacity: 0, translateX: '-160px' }}
			animate={{ opacity: [0, 1], translateX: '0' }}
			transition={{ duration: 0.5 }}
			className="flex items-center gap-4"
		>
			{menuItems.map((item) => {
				const isActive =
					pathname.includes(item.href) || (item.child && item.child.some((child) => pathname.includes(child)))

				return (
					<Link
						data-active={isActive}
						key={item.text}
						href={`/condominio/${identifier}/${item.href}`}
						className="relative px-2 py-0 duration-500 data-[active=true]:font-semibold text-muted-foreground hover:text-foreground"
					>
						<span className="relative z-10">{item.text}</span>
						{isActive && (
							<motion.div layoutId="menubar" className="absolute bg-primary h-[2px] w-full -bottom-4 left-0" />
						)}
					</Link>
				)
			})}
		</motion.nav>
	)
}

type Props = {
	children: React.ReactNode
}

export default function PrivateNavbar({ children }: Props) {
	const pathname = usePathname()

	return (
		<header
			className={cn(
				'flex flex-col z-20 backdrop-blur-sm gap-6 py-2 dark:bg-black/70 bg-white/70 shadow-sm px-8 border-b-[1px] border-muted-foreground/20 sticky top-0 min-h-20 justify-center',
				pathname.includes('/condominio/') ? 'h-32' : 'h-20',
			)}
		>
			{children}
		</header>
	)
}
