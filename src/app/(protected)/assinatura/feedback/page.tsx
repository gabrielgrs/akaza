import Feedback from '~/components/templates/billing/feedback'

type Props = {
	searchParams: {
		type?: 'success'
		checkoutSessionId?: string
	}
}

export default async function BillingPage(props: Props) {
	const { type } = props.searchParams

	return <Feedback success={type === 'success'} />
}
