'use client'

import { useParams } from 'next/navigation'
import { ReactNode, useState } from 'react'
import { toast } from 'sonner'
import { useServerAction } from 'zsa-react'
import { createUnit } from '~/actions/condominium'
import { Column, Fieldset, Grid, Modal } from '~/components'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { useCondominiums } from '~/hooks'
import { onChangeCurrencyField } from '~/utils/form/masks'

export function FormModal({ children }: { children: ReactNode }) {
	const [isOpen, setIsOpen] = useState(false)
	const { refetch } = useCondominiums()
	const { identifier } = useParams()

	const { executeFormAction, isPending, error } = useServerAction(createUnit, {
		onError: () => toast.error('Falha ao processar sua requisição.'),
		onSuccess: async () => {
			await refetch()
			toast.success('Unidade criada com sucesso!')
			setIsOpen(false)
		},
	})

	return (
		<Modal title="Cadastrar unidade" trigger={children} isOpen={isOpen} onOpenChange={setIsOpen}>
			<form action={executeFormAction}>
				<Grid>
					<input type="hidden" name="condominiumId" value={identifier} />

					<Column size={12}>
						<Fieldset label="Nome" error={error?.fieldErrors?.name?.[0]} required>
							<Input name="name" placeholder="Digite o nome da unidade" />
						</Fieldset>
					</Column>

					<Column size={12}>
						<Fieldset label="Data início" error={error?.fieldErrors?.startLivingAt?.[0]} required>
							<Input type="date" name="startLivingAt" placeholder="Selecione a data" />
						</Fieldset>
					</Column>

					<Column size={12}>
						<Fieldset label="Valor do aluguel" error={error?.fieldErrors?.rentValue?.[0]} required>
							<Input
								name="rentValue"
								type="number"
								placeholder="Digite o valor do aluguel"
								onChange={onChangeCurrencyField}
							/>
						</Fieldset>
					</Column>

					<Column size={12}>
						<Fieldset label="E-mail do residente">
							<Input name="resident" placeholder="Digite o e-mail do residente" />
						</Fieldset>
					</Column>

					<Column size={12} className="flex justify-end">
						<Button loading={isPending}>Salvar</Button>
					</Column>
				</Grid>
			</form>
		</Modal>
	)
}
