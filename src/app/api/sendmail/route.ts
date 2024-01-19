import { type NextRequest } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import Cors from "cors";

import { MailService, sendMail } from "@/lib/mail";
import db from "@/lib/db";
import { runMiddleware } from "@/lib/middleware";

type Unit = "ms" | "s" | "m" | "h" | "d";
type Duration = `${number} ${Unit}` | `${number}${Unit}`;

const cors = Cors({
  methods: ["POST", "GET", "HEAD"],
});

const RATELIMIT_TOKENS = parseInt(process.env.RATELIMIT_TOKENS!);
const RATELIMIT_WINDOW = process.env.RATELIMIT_WINDOW as Duration;
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  analytics: true,
  limiter: Ratelimit.slidingWindow(RATELIMIT_TOKENS, RATELIMIT_WINDOW),
});

export async function POST(request: NextRequest) {
  await runMiddleware(request, cors);

  try {
    const searchParams = request.nextUrl.searchParams;
    const { to, from, body, subject } = await request.json();
    const apikey = searchParams.get("apikey");
    if (!apikey)
      return Response.json(
        { error: "Not Authorized" },
        {
          status: 401,
        }
      );

    const isValidKey = await db.user.findUnique({ where: { apikey } });

    if (!isValidKey)
      return Response.json(
        { error: "Invalid key" },
        {
          status: 401,
        }
      );

    // Ratelimit the request
    const { success, reset, remaining } = await ratelimit.limit(apikey);
    if (!success) {
      const now = Date.now();
      const ttl = Math.floor((reset - now) / 1000);
      return Response.json(
        { message: "Too Many Requests" },
        {
          status: 429,
          headers: {
            ["x-api-ttl"]: `${ttl}`,
          },
        }
      );
    }

    const mailService = new MailService(from, to, subject, body);
    const res = await sendMail(mailService);

    if (res.rejected.length > 0) {
      return Response.json(
        { error: "Something went wrong" },
        {
          status: 500,
        }
      );
    }

    return Response.json(
      { message: "Mail sent" },
      {
        status: 200,
        headers: {
          ["x-api-remaining-call"]: `${remaining}`,
        },
      }
    );
  } catch (error) {
    const e = error as Error;
    return Response.json(
      { error: e.message },
      {
        status: 500,
      }
    );
  }
}
