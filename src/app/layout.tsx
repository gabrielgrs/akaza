import { Urbanist } from 'next/font/google'
import './globals.css'
import NextTopLoader from 'nextjs-toploader'
import { Toaster } from 'sonner'
import { Feedback } from '~/components/feedback'
import { RootProviders } from '~/components/root-providers'
import { generateMetadata } from '~/utils/metadata'
import { cn } from '~/utils/shadcn'

const font = Urbanist({ subsets: ['latin'] })

export const metadata = generateMetadata()

type Props = Readonly<{
	children: React.ReactNode
}>

function RootLayout({ children }: Props) {
	return (
		<html lang="en">
			<body className={cn(font.className)}>
				<RootProviders>
					<NextTopLoader color="hsl(var(--primary))" showSpinner={false} />
					{children}
					<Toaster duration={5000} richColors />
					<Feedback />
				</RootProviders>
			</body>
		</html>
	)
}

export default RootLayout
