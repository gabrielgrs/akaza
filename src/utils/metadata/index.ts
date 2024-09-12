import type { Metadata } from 'next'
import { APP_NAME, SLOGAN } from '../constants'

const meta = {
	title: `${APP_NAME} - ${SLOGAN}`,
	description: `${APP_NAME} is an event-based widget management platform designed to streamline real-time event monitoring, communication, and organization.`,
} as const

const image = `${process.env.DOMAIN}/huuma/assets/thumb.png`

export function generateMetadata(): Metadata {
	return {
		...meta,
		title: {
			default: APP_NAME,
			template: `%s - ${APP_NAME}`,
		},
		metadataBase: new URL(process.env.DOMAIN),
		// manifest: '/manifest.json',
		openGraph: {
			...meta,
			images: [{ url: image }],
		},
		twitter: {
			...meta,
			card: 'summary_large_image',
			images: [image],
			creator: '@huumadotco',
		},
		icons: [
			{
				rel: 'apple-touch-icon',
				sizes: '32x32',
				url: '/apple-touch-icon.png',
			},
			{
				rel: 'icon',
				type: 'image/png',
				sizes: '32x32',
				url: '/favicon-32x32.png',
			},
			{
				rel: 'icon',
				type: 'image/png',
				sizes: '16x16',
				url: '/favicon-16x16.png',
			},
		],
	}
}
