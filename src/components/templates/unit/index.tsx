'use client'
import { format } from 'date-fns'
import { ArrowDownLeft, ArrowUpRight, ChevronLeft, Edit } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { getCondominiums } from '~/actions/condominium'
import { getTransactionsByUnitId } from '~/actions/transaction'
import { Card } from '~/components/card'
import { Button, buttonVariants } from '~/components/ui/button'
import { TransactionSchema } from '~/libs/mongoose'
import { formatCurrency } from '~/utils/formattars'
import { Column } from '../../column'
import { Grid } from '../../grid'
import { TransactionModal } from './transaction-modal'

type Props = {
	unit: NonNullable<Awaited<ReturnType<typeof getCondominiums>>[0]>[number]['units'][number]
	isOwner: boolean
	unitIdentifier: string
	condominiumIdentifier: string
	residentId?: string
	initialTransactions: NonNullable<Awaited<ReturnType<typeof getTransactionsByUnitId>>[0]>
}

export function UnitUI({
	unit,
	isOwner,
	condominiumIdentifier,
	unitIdentifier,
	residentId,
	initialTransactions,
}: Props) {
	const [transactions, setTransactions] = useState<TransactionSchema[]>(initialTransactions)

	const onCreateTransaction = (transaction: TransactionSchema, isNew: boolean) => {
		if (isNew) return setTransactions((p) => [transaction, ...p].sort((a, b) => +new Date(b.date) - +new Date(a.date)))
		return setTransactions((p) => p.map((t) => (t._id === transaction._id ? transaction : t)))
	}

	return (
		<Grid>
			<Column size={6}>
				<Link
					href={`/condominio/${condominiumIdentifier}/unidade/${unitIdentifier}`}
					className={buttonVariants({ size: 'sm', variant: 'link' })}
				>
					<ChevronLeft />
					Voltar para listagem de unidades
				</Link>
			</Column>

			<Column size={12} key={unit._id}>
				<Card>
					<div className="flex items-center justify-between">
						<h2>{unit.name}</h2>
						{isOwner && (
							<button>
								<Edit className="opacity-50" />
							</button>
						)}
					</div>
					<div>
						Aluguel: <span className="opacity-80">{formatCurrency(unit.rentValue)}</span>
					</div>
					<div>
						Residente: <span className="opacity-80">{unit.resident.name || unit.resident.email}</span>
					</div>
					<br />
					<div className="flex gap-2">
						<TransactionModal
							type="income"
							resident={residentId}
							unit={unitIdentifier}
							onCreateTransaction={onCreateTransaction}
						>
							<Button size="sm" variant="outline">
								Nova entrada
								<ArrowUpRight size={16} className="text-green-400" />
							</Button>
						</TransactionModal>
						<TransactionModal
							type="expense"
							resident={residentId}
							unit={unitIdentifier}
							onCreateTransaction={onCreateTransaction}
						>
							<Button size="sm" variant="outline">
								Nova saída
								<ArrowDownLeft size={16} className="text-red-400" />
							</Button>
						</TransactionModal>
					</div>
					<br />
					{transactions.map((transaction) => (
						<div
							key={transaction._id}
							className="flex items-center gap-4 p-4 hover:bg-foreground/5 duration-500 rounded"
						>
							<span>
								{transaction.type === 'INCOME' ? (
									<ArrowUpRight size={16} className="text-green-400" />
								) : (
									<ArrowDownLeft size={16} className="text-red-400" />
								)}
							</span>
							<div>
								<span className="text-lg underline underline-offset-4">{transaction.description}</span>
								<br />
								<span className="opacity-80">{format(new Date(transaction.date), 'dd/MM/yyyy')}</span>
							</div>
							<span className="text-lg">{formatCurrency(transaction.amount)}</span>
						</div>
					))}
				</Card>
			</Column>
		</Grid>
	)
}
