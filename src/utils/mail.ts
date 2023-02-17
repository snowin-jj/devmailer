import type { MailPayloadTypes } from '@/pages/api/sendmail';
import { createTransport } from 'nodemailer';

export const sendMail = async (payload: MailPayloadTypes) => {
	const mailOptions = {
		from: `${payload.from} <${process.env.MAIL_ID}>`,
		to: payload.to,
		subject: payload.subject,
		html: payload.body,
	};

	try {
		const transporter = createTransport({
			service: process.env.MAIL_SERVICE,
			auth: {
				user: process.env.MAIL_ID,
				pass: process.env.MAIL_SECRET,
			},
		});

		const response = transporter.sendMail(mailOptions);
		return response;
	} catch (e) {
		throw new Error(e);
	}
};
