import { randomUUID } from 'crypto'
import { ReactElement } from 'react'
import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_KEY)

export function sendEmail(to: string, subject: string, react: ReactElement) {
	return resend.emails.send({
		from: 'noreply@huuma.co',
		to: [to],
		subject,
		react,
		headers: {
			'X-Entity-Ref-ID': randomUUID(),
		},
	})
}
