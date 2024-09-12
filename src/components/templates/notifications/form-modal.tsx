'use client'

import { useParams } from 'next/navigation'
import { ReactNode, useState } from 'react'
import { toast } from 'sonner'
import { useServerAction } from 'zsa-react'
import { createNotification } from '~/actions/condominium'
import { Column, Fieldset, Grid, Modal } from '~/components'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Textarea } from '~/components/ui/textarea'
import { useCondominiums } from '~/hooks'

export function NotificationFormModal({ children }: { children: ReactNode }) {
	const [isOpen, setIsOpen] = useState(false)
	const { refetch } = useCondominiums()
	const { identifier } = useParams()

	const { executeFormAction, isPending, error } = useServerAction(createNotification, {
		onError: () => toast.error('Falha ao processar sua requisição.'),
		onSuccess: async () => {
			await refetch()
			toast.success('Aviso criado com sucesso!')
			setIsOpen(false)
		},
	})

	return (
		<Modal title="Cadastrar aviso" trigger={children} isOpen={isOpen} onOpenChange={setIsOpen}>
			<form action={executeFormAction}>
				<Grid>
					<input type="hidden" name="condominiumId" value={identifier} />

					<Column size={12}>
						<Fieldset label="Título" error={error?.fieldErrors?.title?.[0]} required>
							<Input name="title" placeholder="Digite o título do aviso" />
						</Fieldset>
					</Column>

					<Column size={12}>
						<Fieldset label="Aviso" error={error?.fieldErrors?.content?.[0]} required>
							<Textarea rows={5} name="content" placeholder="Escreva o seu aviso" />
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
