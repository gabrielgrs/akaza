'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ReactNode } from 'react'

type Props = {
	children: ReactNode
}

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnMount: false,
			refetchOnReconnect: false,
			refetchOnWindowFocus: false,
		},
	},
})

export function RootProviders({ children }: Props) {
	return (
		<QueryClientProvider client={queryClient}>
			<NextThemesProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
				{children}
				{process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
			</NextThemesProvider>
		</QueryClientProvider>
	)
}
