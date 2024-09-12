'use client'

import { motion } from 'framer-motion'
import { ChevronLeft, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useServerAction } from 'zsa-react'
import { sendAuthEmail, validateCode } from '~/actions/auth'
import { Column, Fieldset, Grid, Link } from '~/components'
import { Button, buttonVariants } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '~/components/ui/input-otp'
import { Separator } from '~/components/ui/separator'
import { APP_NAME, SUPPORT_EMAIL } from '~/utils/constants'

export function AuthUI({ isAuthenticated = false }) {
	const { push } = useRouter()

	const authAction = useServerAction(sendAuthEmail, {
		onError: (error) => {
			toast.error(error.err.code || 'Algo de inesperado aconteceu. Tente novamente mais tarde.')
		},
	})

	const validateCodeAction = useServerAction(validateCode, {
		onSuccess: ({ data }) => push(`/acesso?token=${data.token}`),
		onError: (error) => {
			toast.error(error.err.code || 'Algo de inesperado aconteceu. Tente novamente mais tarde.')
		},
	})

	if (isAuthenticated) return <Loader2 className="m-2 text-primary animate-spin" />

	return (
		<div className="grid grid-cols-1 gap-6 md:grid-cols-2 mt-16 md:mt-0 mx-auto max-w-4xl">
			<Link
				href="/"
				className={buttonVariants({
					variant: 'ghost',
					className: 'absolute left-2 top-2  group gap-1 text-muted-foreground hover:text-foreground duration-500',
				})}
			>
				<ChevronLeft size={16} className="group-hover:-translate-x-1 duration-500 opacity-60" />
				<span>Voltar para a tela inicial</span>
			</Link>
			<div className="h-full flex flex-col items-center justify-center">
				<h1 className="text-center max-w-xs pt-[15vh] md:pt-0">Olá!👋</h1>
				<h2>
					Você está no sistema <span className="text-primary">{APP_NAME}</span>!
				</h2>
				<p className="text-center text-muted-foreground">Nós estamos em fase beta!</p>
			</div>
			<main className="mx-auto max-w-sm flex w-full items-start md:items-center min-h-screen">
				<motion.form
					key={String(authAction.isSuccess || validateCodeAction.isSuccess)}
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.5 }}
					action={
						authAction.isSuccess
							? (formData) => {
									formData.append('email', authAction.data.email)
									validateCodeAction.executeFormAction(formData)
								}
							: authAction.executeFormAction
					}
					className="w-full bg-card shadow border-[1px] border-foreground/5 py-12 px-8 rounded-lg"
				>
					{authAction.isSuccess ? (
						<Grid>
							<Column size={12}>
								<strong>Verifique seu e-mail</strong>
							</Column>
							<Column size={12} className="text-muted-foreground">
								<p>
									Nós enviamos um link mágico para o e-mail{' '}
									<span className="text-foreground">{authAction.data.email}</span>. <br /> Clique no link
								</p>
							</Column>

							<Column size={12}>
								<Separator />
							</Column>

							<Column size={12}>
								<p className="text-muted-foreground text-center">Ou insira o código abaixo</p>
								<InputOTP name="code" disabled={validateCodeAction.isPending} maxLength={6}>
									<InputOTPGroup>
										<InputOTPSlot index={0} />
										<InputOTPSlot index={1} />
										<InputOTPSlot index={2} />
									</InputOTPGroup>
									<InputOTPSeparator />
									<InputOTPGroup>
										<InputOTPSlot index={3} />
										<InputOTPSlot index={4} />
										<InputOTPSlot index={5} />
									</InputOTPGroup>
								</InputOTP>
							</Column>

							{process.env.NODE_ENV === 'development' && authAction.data && (
								<Column size={12}>Código: {authAction.data.code}</Column>
							)}

							{authAction.isPending && (
								<Column size={12} className="text-muted-foreground flex items-center gap-2">
									<p className="text-sm">Validando o código</p>
									<Loader2 size={20} className="animate-spin" />
								</Column>
							)}

							<Column size={12}>
								<Button loading={validateCodeAction.isPending} className="w-full">
									Verificar código
								</Button>
							</Column>

							<Column size={12} className="pt-8">
								<span className="text-muted-foreground">Precisa de ajuda? </span>
								<Link
									href={`mailto:${SUPPORT_EMAIL}?subject=Ajuda com o acesso`}
									target="_blank"
									className="text-primary"
								>
									Fale conosco
								</Link>
								.
							</Column>
						</Grid>
					) : (
						<Grid>
							<Column size={12}>
								<Fieldset label="E-mail">
									<Input
										name="email"
										placeholder="Digite seu e-mail"
										type="email"
										autoCapitalize="none"
										autoComplete="email"
										autoCorrect="off"
										disabled={authAction.isPending}
									/>
								</Fieldset>
							</Column>

							<Column size={12}>
								<Button loading={authAction.isPending} className="w-full">
									Acessar com meu e-mail
								</Button>
							</Column>

							<Column size={12} className="opacity-70 text-sm text-center px-2">
								Clicando no botão de acesso, você estará concordando com nossos{' '}
								<Link href="/termos-de-servico" className="underline hover:opacity-80 duration-500">
									termos de serviço
								</Link>{' '}
								e{' '}
								<Link href="/politica-de-privacidade" className="underline hover:opacity-80 duration-500">
									pol'tica de privacidade
								</Link>
								.
							</Column>
						</Grid>
					)}
				</motion.form>
			</main>
		</div>
	)
}
