import type { Plan, PlanName } from './types'

const isProductionBuild = process.env.NODE_ENV === 'production'

export const SUPPORT_EMAIL = 'grxgabriel@gmail.com'

export const ADMIN_EMAIL = SUPPORT_EMAIL

export const APP_NAME = 'Huuma'

export const SLOGAN = 'Sistema de gerenciamento de condomínios'

export const APP_DOMAIN = isProductionBuild ? 'https://huuma.co' : `http://localhost:3000`

export const SESSION_DURATION = 10 * 60 // in seconds

export const TWITTER_LINK = 'https://twitter.com/huumadotco'

export const EXPIRATION_AUTH_CODE_DURATION = 15

export const FETCH_LIMIT = 20

export const PLANS: Record<PlanName, Plan> = {
	FREE: {
		price: 0,
		active: true,
	},
	BEGINNER: {
		price: 9_90,
		active: true,
	},
}
