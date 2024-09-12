import { ChevronRight, Edit } from 'lucide-react'
import { useParams } from 'next/navigation'
import { getCondominiums } from '~/actions/condominium'
import { Card } from '~/components/card'
import { Link } from '~/components/link'
import { buttonVariants } from '~/components/ui/button'
import { formatCurrency } from '~/utils/formattars'
import { Column } from '../../column'
import { Skeleton } from '../../ui/skeleton'

type Props = {
	unities: NonNullable<Awaited<ReturnType<typeof getCondominiums>>[0]>[number]['units']
	isLoading: boolean
	isOwner: boolean
}

export function UnitList({ unities = [], isLoading, isOwner }: Props) {
	const { identifier } = useParams()

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

	if (unities.length === 0) {
		return (
			<Column size={12}>
				<p className="text-muted-foreground text-center py-2 text-lg">Nenhuma unidade encontrada.</p>
			</Column>
		)
	}

	return unities.map((unit) => {
		return (
			<Column size={6} key={unit._id}>
				<Card>
					<div>
						<div className="flex items-center justify-between">
							<h2>{unit.name}</h2>
							{isOwner && (
								<button>
									<Edit className="opacity-50" />
								</button>
							)}
						</div>
						<br />
						<div>
							Aluguel: <span className="opacity-80">{formatCurrency(unit.rentValue)}</span>
						</div>
						<div>
							Residente: <span className="opacity-80">{unit.resident.email}</span>
						</div>
					</div>

					<div className="col-span-2 flex justify-end mt-6">
						<Link
							href={`/condominio/${identifier}/unidade/${unit._id}`}
							className={buttonVariants({ size: 'sm', variant: 'link' })}
						>
							Ver detalhes da unidade
							<ChevronRight />
						</Link>
					</div>
				</Card>
			</Column>
		)
	})
}
