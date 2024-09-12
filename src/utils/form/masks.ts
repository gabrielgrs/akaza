import { ChangeEvent } from 'react'

export function formatCurrencyAsValue(value: string) {
	const floatValue = parseFloat(value.replace(/\D/g, '')) / 100
	const formattedValue = new Intl.NumberFormat('pt-BR', {
		currency: 'BRL',
	}).format(floatValue)

	return formattedValue ?? 0
}

export function onChangeCurrencyField(event: ChangeEvent<HTMLInputElement>) {
	event.target.value = formatCurrencyAsValue(event.target.value)
	return event
}
