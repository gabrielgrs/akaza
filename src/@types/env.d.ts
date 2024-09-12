declare namespace NodeJS {
	interface ProcessEnv {
		NODE_ENV: 'development' | 'production' | 'test'
		DOMAIN: string
		JWT_SECRET: string
		RESEND_KEY: string
		STRIPE_SECRET_KEY: string
		STRIPE_WEBHOOK_SECRET: string
		STRIPE_CUSTOMER_PORTAL: string
		MONGODB_URI: string
		BLOB_ENDPOINT: string
		BLOB_READ_WRITE_TOKEN: string
	}
}
