import { Body, Container, Head, Heading, Hr, Html, Img, Link, Preview, Tailwind, Text } from '@react-email/components'
import * as React from 'react'
import { APP_DOMAIN, APP_NAME } from '~/utils/constants'

export type WrapperProps = {
	baseUrl: string
	preview: string
	children: React.ReactNode
	title: React.ReactNode
}

function Footer({ baseUrl }: { baseUrl: string }) {
	return (
		<>
			<Hr className="my-8" />
			<Link href={baseUrl} target="_blank">
				{APP_NAME}
			</Link>
			<br />
			<Text className="text-xs opacity-70"> If you didn{"'"}t request this, please just ignore this email!</Text>
		</>
	)
}

export default function Wrapper({ children, baseUrl, preview, title }: WrapperProps) {
	return (
		<Html>
			<Head />
			<Preview>{preview}</Preview>
			<Tailwind>
				<Body className="bg-white font-sans p-4">
					<Container>
						<Img src={`${APP_DOMAIN}/icon.png`} width="42" height="42" alt={APP_NAME} />
						<Heading className="font-thin">{title}</Heading>

						{children}

						<Footer baseUrl={baseUrl} />
					</Container>
				</Body>
			</Tailwind>
		</Html>
	)
}

Wrapper.PreviewProps = {
	baseUrl: 'http://localhost:3000',
	preview: `Your magic link for ${APP_NAME}`,
	title: (
		<>
			Your magic link to <strong>{APP_NAME}</strong>
		</>
	),
} as WrapperProps
