'use client'

import { getCondominiums } from '~/actions/condominium'
import { CondominiumFormModal } from '~/components/condominium-form-modal'
import { Button } from '~/components/ui/button'
import { useAuth, useCondominiums } from '~/hooks'
import { Column } from '../../column'
import { Grid } from '../../grid'
import { CondominiumList } from './list'

type Props = {
	initialCondominiums: NonNullable<Awaited<ReturnType<typeof getCondominiums>>[0]>
}

export function CondominiumsUI({ initialCondominiums }: Props) {
	const { condominiums, isLoading, isFetching } = useCondominiums(initialCondominiums)
	const { user } = useAuth()

	return (
		<Grid>
			<Column size={6}>
				<h1>Condomínios</h1>
			</Column>
			<Column size={6} className="justify-self-end">
				<CondominiumFormModal>
					<Button>Cadastrar condomínio</Button>
				</CondominiumFormModal>
			</Column>
			<CondominiumList
				condominiums={condominiums}
				isLoading={isLoading || isFetching}
				authenticatedUserId={user?._id || ''}
			/>
		</Grid>
	)
}
