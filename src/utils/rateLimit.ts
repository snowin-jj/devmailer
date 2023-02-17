import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';

import prisma from '@/lib/prisma';
import { redis } from '@/lib/redis';

const ALLOWEDHITS = parseInt(process.env.ALLOWEDHITS);
const EXPIRESIN = parseInt(process.env.EXPIRESIN);

const cors = Cors({
	methods: ['POST'],
});

function runMiddleware(
	req: NextApiRequest,
	res: NextApiResponse,
	fn: Function
) {
	return new Promise((resolve, reject) => {
		fn(req, res, (result: any) => {
			if (result instanceof Error) {
				return reject(result);
			}

			return resolve(result);
		});
	});
}

export const rateLimiter =
	(handler: NextApiHandler) =>
	async (req: NextApiRequest, res: NextApiResponse) => {
		await runMiddleware(req, res, cors);

		if (req.method !== 'POST')
			return res.status(405).json({ message: 'Method not allowed' });

		const { apikey } = req.query;

		if (!apikey)
			return res.status(401).json({ message: 'Not Authorizied' });

		const key = apikey.toString();
		const validKey = await prisma.user.findUnique({
			where: { apikey: key },
		});

		if (validKey) {
			try {
				const requestCount = await redis.incr(key);

				let ttl: number;
				if (requestCount === 1) {
					// Reset the subcription
					await redis.expire(key, EXPIRESIN);
					ttl = EXPIRESIN;
				} else {
					ttl = await redis.ttl(key);
				}

				res.setHeader('x-api-ttl', ttl);

				// Catch rate limit
				if (requestCount > ALLOWEDHITS) {
					return res
						.status(503)
						.json({ message: 'Too many request', ttl });
				}

				res.setHeader(
					'x-api-remaining-call',
					ALLOWEDHITS - requestCount
				);

				return handler(req, res);
			} catch (e) {
				console.log(e);
				return res
					.status(400)
					.json({ message: 'Something went wrong' });
			}
		} else {
			return res.status(401).json({ message: 'Invalid key' });
		}
	};
