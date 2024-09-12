import { getCondominiums } from '~/actions/condominium'
import { menuItems } from '~/components/private-navbar'
import { Column } from '../../column'
import { CondominiumCard } from '../../condominium-card'
import { Link } from '../../link'
import { Skeleton } from '../../ui/skeleton'

type Props = {
	condominiums: NonNullable<Awaited<ReturnType<typeof getCondominiums>>[0]>
	isLoading: boolean
	authenticatedUserId: string
}

export function CondominiumList({ condominiums = [], isLoading, authenticatedUserId }: Props) {
	if (isLoading)
		return (
			<>
				{Array.from({ length: 4 }).map((_, index) => (
					<Column key={`skeleton_${index}`} size={6}>
						<Skeleton className="h-32 w-full" />
					</Column>
				))}
			</>
		)

	if (condominiums.length === 0) {
		return (
			<Column size={12}>
				<p className="text-muted-foreground text-center py-2 text-lg">Nenhum condomínio encontrado.</p>
			</Column>
		)
	}

	return (
		<>
			{condominiums.map((condominium) => {
				return (
					<Column size={6} key={condominium._id}>
						<Link href={`/condominio/${condominium._id}${menuItems[0].href}`}>
							<CondominiumCard
								name={condominium.name}
								membersQuantity={0}
								isOwner={authenticatedUserId === String(condominium.creator._id)}
							/>
						</Link>
					</Column>
				)
			})}
		</>
	)
}
