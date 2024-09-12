import { getAuthenticatedUser } from '~/actions/auth'
import { UserSettingsUI } from '~/components/templates/user-settings'

export const dynamic = 'force-dynamic'

export default async function UserSettingsPage() {
	const [user, error] = await getAuthenticatedUser()
	if (error) throw error

	return <UserSettingsUI defaultValues={user} />
}
