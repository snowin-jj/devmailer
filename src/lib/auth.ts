import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import prisma from './prisma';

export const vaildate = (handler) => {
	return async (req: NextApiRequest, res: NextApiResponse) => {
		// Getting the user session from next auth
		const session = await getServerSession(req, res, authOptions);
		if (!session)
			return res.status(401).json({ message: 'Not Authorizied' });

		// Find the user by email id
		try {
			const user = await prisma.user.findUnique({
				where: { email: session.user.email },
			});

			if (!user)
				return res.status(401).json({ message: 'user not found' });

			return handler(req, res, user);
		} catch (e) {
			return res.status(401).json({ message: 'Something went wrong' });
		}
	};
};
