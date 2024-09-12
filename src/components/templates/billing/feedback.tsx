import { Link } from '~/components/link'
import { buttonVariants } from '~/components/ui/button'
import { SUPPORT_EMAIL } from '~/utils/constants'

export default function Feedback({ success = false }) {
	return (
		<main className="py-12 w-full flex flex-col gap-4 justify-center">
			<h1 className="">{success ? 'Success!' : 'Failure.'}</h1>
			{success ? (
				<p>Your subscription will be active shortly.</p>
			) : (
				<p className="text-muted-foreground">
					Algo de inesperado aconteceu. Tente novamente mais tarde.. Contact us via email{' '}
					<span className="text-primary">{SUPPORT_EMAIL}</span>
				</p>
			)}
			<Link
				href={success ? '/condominios' : '/billing'}
				className={buttonVariants({ variant: 'outline', className: 'w-max' })}
			>
				Back to {success ? 'home' : 'billing'}
			</Link>
		</main>
	)
}
