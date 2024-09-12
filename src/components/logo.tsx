import { Montserrat } from 'next/font/google'
import Image from 'next/image'
import { Link } from '~/components/link'
import { APP_NAME } from '~/utils/constants'
import { cn } from '~/utils/shadcn'

const montserrat = Montserrat({ subsets: ['latin'] })

export function Logo({ href = '/', hideText = false, className = '' }) {
	return (
		<Link href={href} className={cn('text-xl font flex gap-1 items-center', montserrat.className, className)}>
			<Image src="/assets/svgs/logo.svg" width={40} height={40} alt={APP_NAME} className="rounded p-1" />
			{!hideText && <p className="lg:block hidden">{APP_NAME.toLowerCase()}.</p>}
		</Link>
	)
}
