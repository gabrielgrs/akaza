'use client'

import { ReactNode, useState } from 'react'
import { toast } from 'sonner'
import { useServerAction } from 'zsa-react'
import { createCondominium } from '~/actions/condominium'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { useCondominiums } from '~/hooks'
import { Column } from './column'
import { Fieldset } from './fieldset'
import { Grid } from './grid'
import { Modal } from './modal'

export function CondominiumFormModal({ children }: { children: ReactNode }) {
	const [isOpen, setIsOpen] = useState(false)
	const { refetch } = useCondominiums()

	const createCondominiumAction = useServerAction(createCondominium, {
		onError: () => {
			toast.error('Algo de inesperado aconteceu. Tente novamente mais tarde.')
		},
		onSuccess: async () => {
			await refetch()
			toast.success('Condomínio criado com sucesso!')
			setIsOpen(false)
		},
	})

	return (
		<Modal title="Cadastrar condomínio" trigger={children} isOpen={isOpen} onOpenChange={setIsOpen}>
			<form action={createCondominiumAction.executeFormAction}>
				<Grid>
					<Column size={12}>
						<Fieldset label="Name" required>
							<Input name="name" placeholder="Nome do condomínio" />
						</Fieldset>
					</Column>

					<Column size={12}>
						<Fieldset label="Endereço" required>
							<Input name="address" placeholder="Endereço do condomínio" />
						</Fieldset>
					</Column>

					<Column size={12} className="flex justify-end">
						<Button loading={createCondominiumAction.isPending}>Salvar</Button>
					</Column>
				</Grid>
			</form>
		</Modal>
	)
}
