'use client'

import { ArrowRight } from 'lucide-react'
import { Link } from '~/components'
// import { Testimonials } from './testimonials'
import { Vortex } from './Vortex'
import { About } from './about'
import { BackToTopButton } from './back-to-top.button'
import { CTA } from './call-to-action'
import { Footer } from './footer'
import { Hero } from './hero'
import { Line } from './line'
import { PricingUI } from './pricing'

type Props = {
	totalCondominiums: number
}

export function LandingPageUI({ totalCondominiums }: Props) {
	return (
		<div className="overflow-x-hidden squared-bg">
			<Vortex />

			<BackToTopButton />

			<Link
				href="/acesso"
				className="absolute top-4 z-10 right-4 text-xl underline underline-offset-4 group text-muted-foreground flex items-center gap-2"
			>
				Acesso
				<ArrowRight size={20} className="group-hover:-rotate-[400deg] group-hover:scale-110 duration-500" />
			</Link>

			<main>
				<section
					id="home"
					className="flex flex-col md:pt-0 gap-8 md:gap-12 justify-center items-center text-center min-h-[calc(100vh-80px)] relative px-4"
				>
					<Hero />
				</section>

				<section id="sobre" className="mx-auto max-w-7xl pt-28 relative flex flex-col gap-8 h-full justify-center px-4">
					<About totalCondominiums={totalCondominiums} />
				</section>

				<Line className="my-40" />

				<section id="preco" className="mx-auto max-w-7xl min-h-screen pt-24 relative px-4">
					<PricingUI />
				</section>

				{/* <section id="testimonials" className="pt-48 pb-16 relative">
          <Testimonials />
        </section> */}

				<section>
					<CTA />
				</section>
			</main>

			<Footer />
		</div>
	)
}
