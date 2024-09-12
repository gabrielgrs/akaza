import { MetadataRoute } from 'next'
import { headers } from 'next/headers'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const domain = headers().get('host') as string

	return [
		{
			url: `https://${domain}`,
			lastModified: new Date(),
		},
	]
}
