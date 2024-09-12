import { ZSAError, createServerActionProcedure } from 'zsa'
import { getTokenData } from '~/libs/jose'
import schemas from '~/libs/mongoose'
import stripeClient from '~/libs/stripe'
import { parseObject } from '~/utils/actions'
import { PLANS } from '~/utils/constants'
import { PlanName } from '~/utils/constants/types'

export const getPlanBySubscriptionId = async (subscriptionId?: string) => {
	if (!subscriptionId) return PLANS.FREE
	const subscription = await stripeClient.subscriptions.retrieve(subscriptionId)
	if (!subscription) return PLANS.FREE

	const { plan } = subscription as {
		plan?: { nickname: PlanName; active: boolean }
	}
	if (!plan) return PLANS.FREE

	return PLANS[plan.nickname as PlanName] || PLANS.FREE
}

export const authenticatedProcedure = createServerActionProcedure()
	.handler(async () => {
		const tokenData = await getTokenData()
		if (!tokenData) throw new ZSAError('NOT_AUTHORIZED')

		const user = await schemas.user.findOne({
			_id: tokenData._id,
			email: tokenData.email,
		})
		if (!user) throw new ZSAError('NOT_AUTHORIZED')

		const subscription = await getPlanBySubscriptionId(user.stripeSubscriptionId)

		return { user: parseObject({ ...user.toJSON(), subscription }) }
	})
	.createServerAction()
