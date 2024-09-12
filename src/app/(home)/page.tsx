import { LandingPageUI } from '~/components/templates/landing-page'
import schemas from '~/libs/mongoose'

export default async function Home() {
	const totalCondominiums = await schemas.condominium.countDocuments()

	return <LandingPageUI totalCondominiums={totalCondominiums} />
}
