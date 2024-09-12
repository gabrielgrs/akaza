'use client'

import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { getCondominiums } from '~/actions/condominium'

export function useCondominiums(initialData?: NonNullable<Awaited<ReturnType<typeof getCondominiums>>[0]>) {
	const { identifier } = useParams()

	const {
		data = [],
		isLoading,
		refetch,
		isFetching,
	} = useQuery({
		queryKey: ['condominiums'],
		queryFn: async () => {
			const [data, error] = await getCondominiums()
			if (error) throw error
			return data
		},
		refetchInterval: false,
		initialData,
	})

	const currentCondominium = data.find((x) => x._id === identifier)

	return {
		condominiums: data,
		isLoading,
		isFetching,
		refetch,
		currentCondominium,
	}
}
