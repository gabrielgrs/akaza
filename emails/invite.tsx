import { Link, Section, Text } from '@react-email/components'
import { APP_NAME } from '~/utils/constants'
import Wrapper, { WrapperProps } from './wrapper'

type Props = Pick<WrapperProps, 'baseUrl'> & {
	condominiumName: string
	condominiumId: string
	token: string
}

export default function InviteEmail({ baseUrl, condominiumName, token, condominiumId }: Props) {
	return (
		<Wrapper
			baseUrl={baseUrl}
			preview={`Convite para o condomínio ${condominiumName} do ${APP_NAME}!`}
			title={
				<>
					Você foi convidado para o condomínio <i>{condominiumName}</i> do <strong>{APP_NAME}</strong>!
				</>
			}
		>
			<Section>
				<Text>Você está há apenas um clique de acessar {APP_NAME}. Use o link abaixo para aceitar o convite:</Text>
			</Section>
			<Section>
				<Link
					href={`${baseUrl}/invite?token=${token}&condominiumId=${condominiumId}`}
					className="text-black underline font-semibold"
				>
					Clique aqui para acessar.
				</Link>
			</Section>
		</Wrapper>
	)
}
