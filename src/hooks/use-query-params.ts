'use client'

import { useSearchParams } from 'next/navigation'
import { useCallback, useState } from 'react'

const urlSearchParams = new URLSearchParams()

export function useQueryParams<T extends string>(key: string, defaultValue?: T): [T, (value: T) => void] {
	const searchParams = useSearchParams()
	const [state, setState] = useState(searchParams.get(key) || defaultValue)

	const setQuery = useCallback(
		(value: T) => {
			if (typeof value === 'string' && !value) {
				urlSearchParams.delete(key)
				setState('')
				window.history.pushState(null, '', `?${urlSearchParams.toString()}`)
				return
			}
			urlSearchParams.set(key, value)
			setState(urlSearchParams.get(key) || '')
			window.history.pushState(null, '', `?${urlSearchParams.toString()}`)
		},
		[key],
	)

	return [state as T, setQuery]
}
