'use client'
import { Button } from '~/components/ui/button'
import { useAuth, useCondominiums } from '~/hooks'
import { Column } from '../../column'
import { Grid } from '../../grid'
import { FormModal } from './form-modal'
import { UnitList } from './list'

export function UnitsUI() {
	const { currentCondominium, isLoading, isFetching } = useCondominiums()
	const { user } = useAuth()

	return (
		<Grid>
			<Column size={6}>
				<h1>Unidades</h1>
			</Column>
			<Column size={6} className="justify-self-end">
				<FormModal>
					<Button>Criar unidade</Button>
				</FormModal>
			</Column>
			<UnitList
				unities={currentCondominium?.units || []}
				isLoading={isLoading || isFetching}
				isOwner={user?._id === currentCondominium?.creator}
			/>
		</Grid>
	)
}
