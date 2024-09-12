export function Toggle({ open }: { open: boolean }) {
	return (
		<div className="group flex flex-col justify-between h-full w-10">
			<div
				data-open={open}
				className="w-full h-[2px] bg-muted-foreground group-hover:bg-foreground group-hover:w-[70%] data-[open=true]:-rotate-45 data-[open=true]:translate-y-2 duration-500 self-end"
			/>
			<div
				data-open={open}
				className="w-full h-[2px] bg-muted-foreground group-hover:bg-foreground group-hover:w-[70%] data-[open=true]:opacity-0 duration-500"
			/>
			<div
				data-open={open}
				className="w-full h-[2px] bg-muted-foreground group-hover:bg-foreground group-hover:w-[70%] data-[open=true]:rotate-45 data-[open=true]:-translate-y-3 duration-500 self-end"
			/>
		</div>
	)
}
