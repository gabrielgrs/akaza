'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import { useServerAction } from 'zsa-react'
import { updateUser } from '~/actions/auth'
import { Column, Fieldset, Grid } from '~/components'
import { Link } from '~/components/link'
import { Button, buttonVariants } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { useAuth } from '~/hooks'
import { UserSchema } from '~/libs/mongoose'
import { AvatarUpload } from './avatar-upload'

export function UserSettingsUI({ defaultValues }: { defaultValues: Partial<UserSchema> }) {
	const [uploadingAvatar, setUploadingAvatar] = useState(false)
	const { push } = useRouter()
	const { onUpdateUser, refetch } = useAuth()
	const [avatar, setAvatar] = useState(defaultValues.avatar || '')

	const updateUserAction = useServerAction(updateUser, {
		onError: () => toast.error('Algo de inesperado aconteceu. Tente novamente mais tarde.'),
		onSuccess: async () => {
			toast.success('Profile updated')
			await refetch()
			return push('/condominios')
		},
	})

	const onUploadFile = async (file: File) => {
		try {
			const formData = new FormData()
			formData.append('file', file)

			setUploadingAvatar(true)

			const response = await fetch(`${window.location.origin}/api/storage/upload/avatar`, {
				method: 'POST',
				body: formData,
			})
			if (!response.ok) throw new Error('Failed to process your request')

			const data = await response.json()
			onUpdateUser({ avatar: data.url })
			setAvatar(data.url)

			toast.success('Avatar updated')
		} catch (error) {
			return toast.error(
				error instanceof Error ? error.message : 'Algo de inesperado aconteceu. Tente novamente mais tarde.',
			)
		} finally {
			setUploadingAvatar(false)
		}
	}

	return (
		<main>
			<form
				action={(formData) => {
					formData.append('avatar', avatar)
					updateUserAction.executeFormAction(formData)
				}}
			>
				<Grid>
					<Column size={12}>
						<h1>Settings</h1>
					</Column>
					<Column size={6}>
						<Fieldset label="Email">
							<Input name="email" disabled defaultValue={defaultValues.email} />
						</Fieldset>
					</Column>

					<Column size={6}>
						<Fieldset label="Name">
							<Input name="name" placeholder="Type your name" defaultValue={defaultValues.name} />
						</Fieldset>
					</Column>

					<Column size={12}>
						<Fieldset label="Profile picture">
							<AvatarUpload
								loading={uploadingAvatar}
								value={avatar ?? undefined}
								onChange={(file) => onUploadFile(file)}
							/>
						</Fieldset>
					</Column>

					<Column size={12} className="flex items-center justify-self-end gap-2">
						<Link href="/app" className={buttonVariants({ variant: 'ghost' })}>
							Cancel
						</Link>
						<Button loading={updateUserAction.isPending} disabled={uploadingAvatar}>
							Submit
						</Button>
					</Column>
				</Grid>
			</form>
		</main>
	)
}
