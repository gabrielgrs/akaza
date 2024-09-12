'use client'

import { useParams } from 'next/navigation'
import { CondominiumSettingsUI } from '~/components/templates/condominium-settings'
import { useCondominiums } from '~/hooks'

export default function Settings() {
	const { identifier } = useParams()
	const { condominiums } = useCondominiums()

	const currentCondominium = condominiums.find((x) => x._id === identifier)

	if (!currentCondominium) return null

	return <CondominiumSettingsUI condominium={currentCondominium} />
}
