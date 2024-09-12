import { Edit } from 'lucide-react'
import { getCondominiums } from '~/actions/condominium'
import { Card } from '~/components/card'
import { Column } from '../../column'
import { Skeleton } from '../../ui/skeleton'

type Props = {
	notifications: NonNullable<Awaited<ReturnType<typeof getCondominiums>>[0]>[number]['notifications']
	isLoading: boolean
	authenticatedUserId: string
}

export function NotificationList({ notifications = [], isLoading, authenticatedUserId }: Props) {
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

	if (notifications.length === 0) {
		return (
			<Column size={12}>
				<p className="text-muted-foreground text-center py-2 text-lg">Nenhum aviso encontrado.</p>
			</Column>
		)
	}

	return notifications.map((notification) => {
		return (
			<Column size={12} key={notification._id}>
				<Card>
					<div className="flex items-center justify-between">
						<h2>{notification.title}</h2>
						{authenticatedUserId === notification.author && (
							<button>
								<Edit className="opacity-50" />
							</button>
						)}
					</div>
					<br />
					{notification.content}
				</Card>
			</Column>
		)
	})
}
