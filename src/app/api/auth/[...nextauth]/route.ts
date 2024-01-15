import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import EmailProvider from "next-auth/providers/email";

import db from "@/lib/db";

const handler = NextAuth({
  // @ts-ignore
  adapter: PrismaAdapter(db),
  providers: [
    EmailProvider({
      server: {
        service: process.env.MAIL_SERVICE,
        auth: {
          user: process.env.MAIL_ID,
          pass: process.env.MAIL_SECRET,
        },
      },
      from: process.env.MAIL_ID,
    }),
  ],
});

export { handler as GET, handler as POST };
