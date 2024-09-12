import { redirect } from 'next/navigation'
import { getUnitByCondominiumIdAndUnitId } from '~/actions/condominium'
import { getTransactionsByUnitId } from '~/actions/transaction'
import { UnitUI } from '~/components/templates/unit'

type Props = {
	params: {
		identifier: string
		unitIdentfier: string
	}
}

export default async function UnitPage({ params: { identifier, unitIdentfier } }: Props) {
	const [unit, error] = await getUnitByCondominiumIdAndUnitId({ condominiumIdentifier: identifier, unitIdentfier })
	if (error) return redirect('/404')

	const [transactions, transactionError] = await getTransactionsByUnitId({ unitId: unitIdentfier })
	if (transactionError) return redirect('/404')

	return (
		<UnitUI
			unit={unit}
			isOwner={false}
			condominiumIdentifier={identifier}
			unitIdentifier={unitIdentfier}
			initialTransactions={transactions}
		/>
	)
}
