'use client'

import { useQuery } from '@tanstack/react-query'
import { useCallback } from 'react'
import { getAuthenticatedUser } from '~/actions/auth'
import { UserSchema } from '~/libs/mongoose'

export function useAuth() {
	const { data, error, isLoading, refetch } = useQuery({
		queryKey: ['auth'],
		queryFn: () => getAuthenticatedUser().then(([data]) => data),
		refetchInterval: false,
	})

	const onUpdateUser = useCallback(
		(user: Partial<UserSchema>) => {
			refetch()
			return user
		},
		[refetch],
	)

	return {
		user: data,
		isAuthenticated: Boolean(!error && data),
		isLoading,
		onUpdateUser,
		refetch,
	}
}
