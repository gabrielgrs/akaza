export const formatChannel = (text: string) => {
	return text.replaceAll(' ', '-').trim()
}

export const formatCurrency = (amountInCents: number) => {
	return new Intl.NumberFormat('pt-BR', { currency: 'BRL', style: 'currency', minimumFractionDigits: 2 }).format(
		Number(amountInCents / 100),
	)
}

export const formatNumberWithDots = (value: number) => {
	return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}
