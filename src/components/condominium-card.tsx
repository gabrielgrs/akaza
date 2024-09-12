'use client'

import { Users } from 'lucide-react'
import { Card } from './card'

type Props = {
	name: string
	membersQuantity: number
	isOwner: boolean
}

export function CondominiumCard({ name, membersQuantity, isOwner }: Props) {
	return (
		<Card className="flex flex-col justify-between h-40">
			<span className="lowercase absolute top-3 right-3 text-xs text-primary font-mono px-2 rounded-full">
				{isOwner ? 'Proprietário' : 'Morador'}
			</span>
			<div className="flex gap-2 items-center">
				{/* <Image src={image} alt={'alt'} width={40} height={40} /> */}
				<div className="flex flex-col">
					<span className="font-semibold">{name}</span>
				</div>
			</div>
			<div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
				<div className="flex items-center gap-[2px] whitespace-nowrap">
					<Users size={14} />
					<span>{membersQuantity} members</span>
				</div>
			</div>
		</Card>
	)
}
