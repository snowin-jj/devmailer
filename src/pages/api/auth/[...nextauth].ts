import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import EmailProvider from 'next-auth/providers/email';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@/lib/prisma';

export const authOptions: NextAuthOptions = {
	// Configure one or more authentication providers
	adapter: PrismaAdapter(prisma),
	session: {
		strategy: 'jwt',
	},
	providers: [
		EmailProvider({
			server: {
				service: process.env.MAIL_SERVICE,
				auth: {
					user: process.env.MAIL_ID,
					pass: process.env.MAIL_SECRET,
				},
			},
			from: process.env.EMAIL_FROM,
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
		// ...add more providers here
	],
	callbacks: {
		async jwt({ token, user, account, profile, isNewUser }) {
			return token;
		},
	},
	pages: {
		signIn: '/signin',
		verifyRequest: '/verifyRequest',
	},
};

export default NextAuth(authOptions);
