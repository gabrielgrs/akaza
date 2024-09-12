/** @type {import('next').NextConfig} */
const nextConfig = {
	trailingSlash: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: process.env.BLOB_ENDPOINT,
				port: '',
			},
		],
	},
	env: {
		HUUMA_API_KEY: process.env.HUUMA_API_KEY,
		STRIPE_CUSTOMER_PORTAL: process.env.STRIPE_CUSTOMER_PORTAL,
	},
	async headers() {
		return [
			{
				// matching all API routes
				source: '/api/v1/:path*',
				headers: [
					{ key: 'Access-Control-Allow-Credentials', value: 'true' },
					{ key: 'Access-Control-Allow-Origin', value: '*' }, // replace this your actual origin
					{ key: 'Access-Control-Allow-Methods', value: 'GET,DELETE,PATCH,POST,PUT' },
					{
						key: 'Access-Control-Allow-Headers',
						value:
							'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
					},
				],
			},
		]
	},
}

export default nextConfig
