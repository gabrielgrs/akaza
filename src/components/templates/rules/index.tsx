'use client'
import { Button } from '~/components/ui/button'
import { useAuth, useCondominiums } from '~/hooks'
import { Column } from '../../column'
import { Grid } from '../../grid'
import { FormModal } from './form-modal'
import { List } from './list'

export function RulesUI() {
	const { currentCondominium, isLoading, isFetching } = useCondominiums()
	const { user } = useAuth()

	return (
		<Grid>
			<Column size={6}>
				<h1>Regras</h1>
			</Column>
			<Column size={6} className="justify-self-end">
				<FormModal>
					<Button>Criar regra</Button>
				</FormModal>
			</Column>
			<List
				rules={currentCondominium?.rules || []}
				isLoading={isLoading || isFetching}
				isOwner={user?._id === currentCondominium?.creator}
			/>
		</Grid>
	)
}
