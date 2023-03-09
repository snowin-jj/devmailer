import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		const users = await prisma.user.findMany({ select: { name: true } });
		res.status(200).json({ data: users });
	} catch (e) {
		const error = e as Error;

		res.status(400).json({ message: error.message });
	}
}
