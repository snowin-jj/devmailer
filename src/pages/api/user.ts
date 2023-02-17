import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { vaildate } from '@/lib/auth';

export default vaildate(
	async (req: NextApiRequest, res: NextApiResponse, user) => {
		switch (req.method) {
			case 'GET':
				return res.status(200).json({
					data: user,
				});
			case 'POST':
				const { name } = req.body;

				try {
					const updatedUser = await prisma.user.update({
						where: {
							id: user.id,
						},
						data: {
							name,
						},
					});
					return res.json({ data: updatedUser.id });
				} catch (e) {
					return res.status(404).json({ message: 'User not found' });
				}

			default:
				return res.status(405).json({
					message: 'Method Not Allowed',
				});
		}
	}
);
