import { MetadataRoute } from 'next'
import { APP_NAME, SLOGAN } from '~/utils/constants'

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: `${APP_NAME} App`,
		short_name: APP_NAME,
		description: `${APP_NAME} - ${SLOGAN}`,
		start_url: '/',
		display: 'standalone',
		background_color: '#ffffff',
		theme_color: '#ffffff',
		icons: [
			{
				src: '/android-chrome-192x192.png',
				sizes: '192x192',
				type: 'image/png',
				purpose: 'maskable',
			},
			{
				src: '/android-chrome-512x512.png',
				sizes: '512x512',
				type: 'image/png',
				purpose: 'maskable',
			},
		],
	}
}
