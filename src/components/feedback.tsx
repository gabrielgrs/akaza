'use client'

import { Brain, Bug, ChevronLeft, Contact, LucideIcon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { useServerAction } from 'zsa-react'
import { sendFeedback } from '~/actions/shared'
import { useAuth } from '~/hooks'
import { Card } from '../components/card'
import { Column } from '../components/column'
import { Fieldset } from '../components/fieldset'
import { Grid } from './grid'
import { Modal } from './modal'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'

type Category = {
	label: string
	icon: LucideIcon
}

const categories: Category[] = [
	{
		label: 'Contact',
		icon: Contact,
	},
	{
		label: 'Suggest an idea',
		icon: Brain,
	},
	{
		label: 'Bug Report',
		icon: Bug,
	},
]

export function Feedback() {
	const [isOpen, setIsOpen] = useState(false)
	const [selectedCategory, setSelectedCategory] = useState('')
	const { user } = useAuth()

	const feedbackAction = useServerAction(sendFeedback, {
		onError: () => toast.error('Algo de inesperado aconteceu. Tente novamente mais tarde.'),
		onSuccess: () => {
			toast.success('Feedback sent')
			setIsOpen(false)
		},
	})

	return (
		<Modal
			onOpenChange={setIsOpen}
			isOpen={isOpen}
			title="Feedback"
			trigger={
				<button
					onClick={() => setIsOpen(true)}
					className="fixed bottom-0 right-4 z-10 bg-neutral-950/70 hover:bg-neutral-950/100 text-muted-foreground hover:text-foreground px-2 py-2 translate-y-2 rounded-t-lg hover:translate-y-0 duration-500 cursor-pointer"
				>
					Feedback
				</button>
			}
		>
			<form
				action={(formData) => {
					formData.append('category', selectedCategory)
					formData.append('user', user?.email || formData.get('email') || '')
					feedbackAction.executeFormAction(formData)
				}}
			>
				{selectedCategory ? (
					<Grid>
						<Column size={12}>
							<div className="flex items-center gap-4">
								<button onClick={() => setIsOpen(false)}>
									<ChevronLeft />
								</button>
								<span className="text-lg">{selectedCategory}</span>
							</div>
						</Column>
						<Column size={12}>
							<Fieldset label="Email" required>
								<Input name="email" type="email" placeholder="Email" className="w-full" />
							</Fieldset>
						</Column>
						<Column size={12}>
							<Fieldset label="Message" required>
								<Textarea name="text" className="w-full" placeholder="Tell us something!" />
							</Fieldset>
						</Column>

						<Column size={12} className="flex justify-end">
							<Button loading={feedbackAction.isPending}>Send</Button>
						</Column>
					</Grid>
				) : (
					<Grid>
						{categories.map(({ icon: Icon, ...category }) => {
							return (
								<Column size={12} key={category.label}>
									<button onClick={() => setSelectedCategory(category.label)} className="w-full">
										<Card className="flex items-center gap-4 px-4">
											<Icon size={24} className="text-muted-foregorund" />
											<span className="text-lg">{category.label}</span>
										</Card>
									</button>
								</Column>
							)
						})}
					</Grid>
				)}
			</form>
		</Modal>
	)
}
