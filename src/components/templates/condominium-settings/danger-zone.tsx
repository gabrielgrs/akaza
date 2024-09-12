'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import { useServerAction } from 'zsa-react'
import { removeCondominium } from '~/actions/condominium'
import { Button } from '~/components/ui/button'
import { useCondominiums } from '~/hooks'
import { CondominiumSchema } from '~/libs/mongoose'
import { Column } from '../../column'
import { Grid } from '../../grid'
import { Modal } from '../../modal'

type Props = {
	condominium: CondominiumSchema
}

export function DangerZoneUI({ condominium }: Props) {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const { refetch } = useCondominiums()
	const { push } = useRouter()

	const deleteCondominiumAction = useServerAction(removeCondominium, {
		onError: () => toast.error('Algo de inesperado aconteceu. Tente novamente mais tarde.'),
		onSuccess: async () => {
			await refetch()
			push('/condominios')
			toast.success('Condomínio excluído com sucesso.')
		},
	})

	return (
		<Grid>
			<Modal isOpen={isModalOpen} onOpenChange={setIsModalOpen} title="Confirmação de exclusão de condomínio">
				<Grid>
					<Column size={12}>
						<p className="bg-red-950 p-2 text-center rounded-lg text-red-400 underline underline-offset-4">
							Aviso: Essa ação não é reversível. Por favor, tenha certeza.
						</p>
					</Column>

					<Column size={12} className="flex justify-end gap-4">
						<Button
							variant="outline"
							onClick={() => setIsModalOpen(false)}
							disabled={deleteCondominiumAction.isPending}
						>
							Cancelar
						</Button>

						<Button
							variant="destructive"
							loading={deleteCondominiumAction.isPending}
							onClick={() => deleteCondominiumAction.execute({ condominiumId: condominium._id })}
						>
							Confirmar
						</Button>
					</Column>
				</Grid>
			</Modal>
			<Column size={12}>Deletar condomínio</Column>
			<Column size={12} className="text-muted-foreground">
				O condomínio será permanentemente excluído, incluindo suas unidades e informações e essa ação é irreversível.
			</Column>
			<Column size={12} className="flex justify-end">
				<Button variant="destructive" onClick={() => setIsModalOpen(true)}>
					Deletar condomínio
				</Button>
			</Column>
		</Grid>
	)
}
