import { Link, Section, Text } from '@react-email/components'
import { APP_NAME, EXPIRATION_AUTH_CODE_DURATION } from '~/utils/constants'
import Wrapper, { type WrapperProps } from './wrapper'

type Props = Pick<WrapperProps, 'baseUrl'> & {
	token: string
	code: number
}

export default function AuthEmail({ baseUrl, token, code }: Props) {
	return (
		<Wrapper
			baseUrl={baseUrl}
			preview={`Your magic link for ${APP_NAME}`}
			title={
				<>
					Your magic link to <strong>{APP_NAME}</strong>
				</>
			}
		>
			<Section>
				<Text>
					You are just one click away from accessing {APP_NAME}. Use the magic link below to log in instantly:
				</Text>
			</Section>
			<Section>
				<Link href={`${baseUrl}/acesso?token=${token}`} className="text-black underline font-semibold">
					Click here to sign
				</Link>
			</Section>
			<Section className="pt-2">
				<p>Or use the code below</p>
				<code className="text-lg bg-black text-white px-2 py-2 rounded">{code}</code>
				<p className="text-sm text-muted-foreground">
					This code will expire in {EXPIRATION_AUTH_CODE_DURATION} minutes
				</p>
			</Section>
		</Wrapper>
	)
}
