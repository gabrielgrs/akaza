import { APP_NAME, SUPPORT_EMAIL } from '~/utils/constants'

export default function TermsOfServicePage() {
	return (
		<div>
			<h2 className="text-2xl font-semibold mb-4">Terms of Service for {APP_NAME}</h2>
			<div className="text-lg py-8 flex flex-col gap-8">
				<p>
					Welcome to the Terms of Service for <span className="text-primary">{APP_NAME}</span>. These terms outline the
					rules and regulations for the use of our services.
				</p>
				<p>
					By accessing this website and using our services, you accept these terms and conditions in full. Do not
					continue to use {APP_NAME} if you do not accept all of the terms and conditions stated on this page.
				</p>
				<p>
					We reserve the right to amend these terms at any time, effective immediately upon posting. Your continued use
					of the service after any such changes constitutes your acceptance of the new terms.
				</p>
				<p>
					You agree to use {APP_NAME} only for lawful purposes and in a way that does not infringe the rights of,
					restrict, or inhibit anyone else{"'"}s use and enjoyment of the service.
				</p>
				<p>
					If you have any questions or concerns about our terms of service, please contact us at{' '}
					<a href={`mailto:${SUPPORT_EMAIL}`} className="text-primary">
						{SUPPORT_EMAIL}
					</a>
					. We value transparency and strive to provide a clear understanding of our service terms to our users.
				</p>
			</div>
		</div>
	)
}
