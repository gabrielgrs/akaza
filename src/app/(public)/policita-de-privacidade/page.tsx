import { APP_NAME, SUPPORT_EMAIL } from '~/utils/constants'

export default function PrivacyPolicyPage() {
	return (
		<div>
			<h2 className="text-2xl font-semibold mb-4">Privacy Policy for {APP_NAME}</h2>
			<div className="text-lg py-8 flex flex-col gap-8">
				<p>
					Welcome to the Privacy Policy for <span className="text-primary">{APP_NAME}</span>. We are committed to
					protecting your privacy and ensuring the security of your personal information. We collect and use personal
					information, including name, email address, and usage data, to provide and improve our services.
				</p>
				<p>
					Your privacy is paramount to us, and we take all necessary precautions to safeguard the security of your
					personal information. However, please note that no method of transmission over the internet or electronic
					storage is entirely secure. Rest assured, we do not share your personal information with third parties except
					as necessary for service provision or as required by law.
				</p>
				<p>
					To enhance user experience and provide valuable insights, we may use cookies and similar tracking technologies
					for analytics purposes. You have the right to access, correct, or delete your personal information at any time
					and may opt out of certain data processing activities.
				</p>
				<p>
					We reserve the right to update or change our privacy policy at any time. Any changes will be promptly
					communicated to you and will be effective immediately upon posting. If you have any questions or concerns
					about our privacy policy, please don{"'"}t hesitate to contact us at{' '}
					<a href={`mailto:${SUPPORT_EMAIL}`} className="text-primary">
						{SUPPORT_EMAIL}
					</a>
					. Your privacy matters to us, and we{"'"}re here to address any inquiries you may have.
				</p>
			</div>
		</div>
	)
}
