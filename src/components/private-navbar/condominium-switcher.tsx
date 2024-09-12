'use client'

import { Check, ChevronsUpDown } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { Link } from '~/components/link'
import { Button } from '~/components/ui/button'
import { Command, CommandGroup, CommandItem, CommandList } from '~/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover'
import { Skeleton } from '~/components/ui/skeleton'
import { useCondominiums } from '~/hooks'
import { CondominiumFormModal } from '../condominium-form-modal'
import { menuItems } from './private-navbar'

export function CondominiumSwitcher() {
	const [open, setOpen] = useState(false)
	const { identifier } = useParams()

	const { condominiums, isLoading } = useCondominiums()

	const condominiumName = condominiums.find((x) => x._id === identifier)?.name

	if (isLoading) return <Skeleton className="w-[120px] h-8" />

	return (
		<>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="ghost"
						role="combobox"
						aria-expanded={open}
						aria-label="Select a list"
						size="sm"
						className="max-w-[200px] justify-between px-0 gap-4 hover:bg-white/0"
					>
						<span className="w-full truncate">{condominiumName || 'Selecione o condomínio'}</span>
						<ChevronsUpDown size={14} className="min-w-[14px]" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-[200px] p-0">
					<Command>
						<CommandList>
							{condominiums.length > 0 && (
								<CommandGroup className="p-1" heading="Condomínios">
									{condominiums.map((condominium) => (
										<Link href={`/condominio/${condominium._id}${menuItems[0].href}`} key={condominium._id}>
											<CommandItem onSelect={() => setOpen(false)} className="p-0">
												<div className="text-sm px-2 py-2 rounded flex justify-between items-center h-full w-full cursor-pointer hover:bg-foreground/10 duration-500">
													{condominium.name}
													{condominium._id === identifier && <Check size={14} />}
												</div>
											</CommandItem>
										</Link>
									))}
								</CommandGroup>
							)}
						</CommandList>
						<CommandList>
							<CommandGroup className="p-0">
								<CommandItem className="p-0">
									<CondominiumFormModal>
										<Button size="sm" variant="link" aria-label="Criar condomínio" className=" h-12 w-full text-center">
											Criar condomínio
										</Button>
									</CondominiumFormModal>
								</CommandItem>
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		</>
	)
}
