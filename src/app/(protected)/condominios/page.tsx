import { redirect } from 'next/navigation'
import { getCondominiums } from '~/actions/condominium'
import { CondominiumsUI } from '~/components/templates/condominiums'

export default async function Condominiums() {
	const [data, error] = await getCondominiums()
	if (error) return redirect('/logout')

	return <CondominiumsUI initialCondominiums={data} />
}
