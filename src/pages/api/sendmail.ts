import { NextApiRequest, NextApiResponse } from 'next';
import { sendMail } from '@/utils/mail';
import { rateLimiter } from '@/utils/rateLimit';

export type MailPayloadTypes = {
	from: string;
	to: string;
	subject: string;
	body: string;
};

export default rateLimiter(
	async (req: NextApiRequest, res: NextApiResponse) => {
		const { from, to, subject, body } = req.body;

		if (from && to && subject && body) {
			const mailData: MailPayloadTypes = {
				from,
				to,
				subject,
				body,
			};

			const response = await sendMail(mailData);

			return res
				.status(200)
				.json({ message: 'mail has been sent', data: response });
		}

		return res.status(404).json({
			message: 'from, to, subject, body - these fields are required!',
		});
	}
);
