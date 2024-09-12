'use client'
import { Button } from '~/components/ui/button'
import { useAuth, useCondominiums } from '~/hooks'
import { Column } from '../../column'
import { Grid } from '../../grid'
import { NotificationFormModal } from './form-modal'
import { NotificationList } from './list'

export function NotificationsUI() {
	const { currentCondominium, isLoading, isFetching } = useCondominiums()
	const { user } = useAuth()

	return (
		<Grid>
			<Column size={6}>
				<h1>Avisos</h1>
			</Column>
			<Column size={6} className="justify-self-end">
				<NotificationFormModal>
					<Button>Criar aviso</Button>
				</NotificationFormModal>
			</Column>
			<NotificationList
				notifications={currentCondominium?.notifications || []}
				isLoading={isLoading || isFetching}
				authenticatedUserId={user?._id || ''}
			/>
		</Grid>
	)
}
