'use client'
import { toast } from 'sonner'
import { useServerAction } from 'zsa-react'
import { updateCondominium } from '~/actions/condominium'
import { Input } from '~/components/ui/input'
import { useCondominiums } from '~/hooks'
import { CondominiumSchema } from '~/libs/mongoose'
import { Column } from '../../column'
import { Fieldset } from '../../fieldset'
import { Grid } from '../../grid'
import { Button } from '../../ui/button'

type Props = {
	condominium: CondominiumSchema
}

export function GeneralUI({ condominium }: Props) {
	const { refetch } = useCondominiums()

	const updateCondominiumAction = useServerAction(updateCondominium, {
		onError: () => toast.error('Algo de inesperado aconteceu. Tente novamente mais tarde.'),
		onSuccess: async () => {
			await refetch()
			toast.success('Condomínio atuallizado com sucesso!')
		},
	})

	return (
		<form action={updateCondominiumAction.executeFormAction}>
			<Grid>
				<input type="hidden" name="condominiumId" value={condominium._id} />
				<Column size={6}>
					<Fieldset label="Name" required>
						<Input name="name" placeholder="Nome do condomínio" defaultValue={condominium.name} />
					</Fieldset>
				</Column>

				<Column size={12} className="flex justify-end">
					<Button loading={updateCondominiumAction.isPending}>Salvar</Button>
				</Column>
			</Grid>
		</form>
	)
}
