'use client'

import { useParams } from 'next/navigation'
import { ReactNode, useState } from 'react'
import { toast } from 'sonner'
import { useServerAction } from 'zsa-react'
import { createExpense, createIncome } from '~/actions/transaction'
import { Column, Fieldset, Grid, Modal } from '~/components'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { TransactionSchema } from '~/libs/mongoose'
import { onChangeCurrencyField } from '~/utils/form/masks'

type Props = {
	children: ReactNode
	type: 'income' | 'expense'
	resident?: string
	unit: string
	onCreateTransaction: (transaction: TransactionSchema, isNew: boolean) => void
}

export function TransactionModal({ children, type, resident, unit, onCreateTransaction }: Props) {
	const [isOpen, setIsOpen] = useState(false)
	const { identifier } = useParams()

	const createExpenseAction = useServerAction(createExpense, {
		onError: () => toast.error('Falha ao processar sua requisição.'),
		onSuccess: async (response) => {
			onCreateTransaction(response.data, true)
			toast.success('Entrada criada com sucesso!')
			setIsOpen(false)
		},
	})

	const createIncomeAction = useServerAction(createIncome, {
		onError: () => toast.error('Falha ao processar sua requisição.'),
		onSuccess: async (response) => {
			onCreateTransaction(response.data, true)
			toast.success('Saída criada com sucesso!')
			setIsOpen(false)
		},
	})

	return (
		<Modal
			title={type === 'income' ? 'Nova entrada' : 'Nova saida'}
			trigger={children}
			isOpen={isOpen}
			onOpenChange={setIsOpen}
		>
			<form action={type === 'income' ? createIncomeAction.executeFormAction : createExpenseAction.executeFormAction}>
				<Grid>
					<input type="hidden" name="condominiumId" value={identifier} />
					<input type="hidden" name="type" value={type.toUpperCase()} />
					<input type="hidden" name="resident" value={resident} />
					<input type="hidden" name="unit" value={unit} />

					<Column size={12}>
						<Fieldset
							label="Valor"
							error={
								type === 'income'
									? createIncomeAction.error?.fieldErrors?.amount?.[0]
									: createExpenseAction.error?.fieldErrors?.amount?.[0]
							}
							required
						>
							<Input name="amount" placeholder="Digite o valor do aluguel" onChange={onChangeCurrencyField} />
						</Fieldset>
					</Column>

					<Column size={12}>
						<Fieldset label="Descrição">
							<Input name="description" placeholder="Digite uma descrição" />
						</Fieldset>
					</Column>

					<Column size={12}>
						<Fieldset
							label="Data"
							error={
								type === 'income'
									? createIncomeAction.error?.fieldErrors?.date?.[0]
									: createExpenseAction.error?.fieldErrors?.date?.[0]
							}
							required
						>
							<Input type="date" name="date" placeholder="Selecione a data" />
						</Fieldset>
					</Column>

					<Column size={12} className="flex justify-end">
						<Button loading={type === 'income' ? createIncomeAction.isPending : createExpenseAction.isPending}>
							Adicionar
						</Button>
					</Column>
				</Grid>
			</form>
		</Modal>
	)
}
