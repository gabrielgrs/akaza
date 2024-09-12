import { ArrowLeft } from 'lucide-react'
import { Link } from '~/components/link'

export default function BlockedIP() {
	return (
		<div className="flex h-screen w-screen items-center justify-center px-4 text-lg flex-col gap-4">
			You are now rate limited after exceeding requests based on your IP address.
			<Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground duration-500">
				<ArrowLeft size={20} />
				Voltar para a tela inicial
			</Link>
		</div>
	)
}
