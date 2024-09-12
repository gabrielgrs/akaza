import { Loader2, Upload } from 'lucide-react'
import Image from 'next/image'

type Props = {
	loading: Boolean
	value?: string
	onChange: (file: File) => void
}

export function AvatarUpload({ loading, value, onChange }: Props) {
	return (
		<div className="relative w-20 h-20 group hover:opacity-70 duration-500 cursor-pointer">
			{value && !loading && (
				<Image
					src={value}
					height={80}
					width={80}
					alt="User profile picture"
					className="rounded-full group-hover:opacity-0 relative duration-500 z-40"
					priority
				/>
			)}
			<div
				data-loading={loading}
				data-value={Boolean(value)}
				className="absolute w-20 duration-500 h-20 top-0 left-0 bg-card rounded-full flex items-center justify-center data-[loading=true]:pointer-events-none"
			>
				{loading ? <Loader2 size={40} className="animate-spin" /> : <Upload size={24} />}
			</div>
			<input
				type="file"
				accept="image/*"
				className="absolute cursor-pointer z-50 top-0 left-0 opacity-0 w-20 h-20"
				onChange={(event) => {
					const file = event.target.files?.[0]
					if (file) {
						return onChange(file)
					}
				}}
			/>
		</div>
	)
}
