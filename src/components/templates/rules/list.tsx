import { useState } from 'react'
import { getCondominiums } from '~/actions/condominium'
import { Column } from '../../column'
import { Skeleton } from '../../ui/skeleton'

type Props = {
	rules: NonNullable<Awaited<ReturnType<typeof getCondominiums>>[0]>[number]['rules']
	isLoading: boolean
	isOwner: boolean
}

export function List({ rules = [], isLoading }: Props) {
	const [selectedRule, setSelectedRule] = useState('')

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

	if (rules.length === 0) {
		return (
			<Column size={12}>
				<p className="text-muted-foreground text-center py-2 text-lg">Nenhuma regra encontrada.</p>
			</Column>
		)
	}

	const ruleToShow = rules.find((rule) => rule._id === selectedRule)

	return (
		<>
			<Column size={12} className="flex gap-2 items-center">
				{rules.map((rule) => {
					return (
						<button
							data-selected={rule._id === selectedRule}
							onClick={() => setSelectedRule(rule._id)}
							className="border-2 whitespace-nowrap border-foreground px-4 py-1 rounded-sm opacity-50 data-[selected=true]:opacity-100 duration-500"
						>
							{rule.title}
						</button>
					)
				})}
			</Column>

			{ruleToShow && <Column size={12}>{ruleToShow.content}</Column>}
		</>
	)
}
