export type Plan = {
	price: number
	active: boolean
}

export type PlanName = 'FREE' | 'BEGINNER'

export type RecurringType = 'MONTH' | 'YEAR'

export type Metadata = Record<string, string | boolean | number>
