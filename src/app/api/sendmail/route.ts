import { type NextRequest } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

import { MailService, sendMail } from "@/lib/mail";
import db from "@/lib/db";
import { mailPayloadSchema } from "@/lib/schema";

type Unit = "ms" | "s" | "m" | "h" | "d";
type Duration = `${number} ${Unit}` | `${number}${Unit}`;

const RATELIMIT_TOKENS = parseInt(process.env.RATELIMIT_TOKENS!);
const RATELIMIT_WINDOW = process.env.RATELIMIT_WINDOW as Duration;
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  analytics: true,
  limiter: Ratelimit.slidingWindow(RATELIMIT_TOKENS, RATELIMIT_WINDOW),
});

export async function POST(request: NextRequest) {
  try {
    // check api
    const searchParams = request.nextUrl.searchParams;
    const apikey = searchParams.get("apikey");
    if (!apikey)
      return Response.json(
        { error: "Not Authorized" },
        {
          status: 401,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, HEAD",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
          },
        }
      );

    // validate api
    const isValidKey = await db.user.findUnique({ where: { apikey } });
    if (!isValidKey)
      return Response.json(
        { error: "Invalid key" },
        {
          status: 401,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, HEAD",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
          },
        }
      );

    // Ratelimit the request
    const { success, reset, remaining } = await ratelimit.limit(apikey);
    if (!success) {
      const now = Date.now();
      const ttl = Math.floor((reset - now) / 1000);
      return Response.json(
        { error: "Too Many Requests" },
        {
          status: 429,
          headers: {
            ["x-api-ttl"]: `${ttl}`,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, HEAD",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
          },
        }
      );
    }

    // validate payload
    const validatedPayload = await mailPayloadSchema.safeParseAsync(
      await request.json()
    );

    if (!validatedPayload.success) {
      const { error } = validatedPayload;
      return Response.json(
        { error: error.formErrors.fieldErrors },
        { status: 400 }
      );
    }

    // send mail
    const { from, to, body, subject } = validatedPayload.data;
    const mailService = new MailService(from, to, subject, body);
    const res = await sendMail(mailService);

    if (res.rejected.length > 0) {
      return Response.json(
        { error: "Something went wrong" },
        {
          status: 500,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, HEAD",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
          },
        }
      );
    }

    return Response.json(
      { message: "Mail sent" },
      {
        status: 200,
        headers: {
          ["x-api-remaining-call"]: `${remaining}`,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, HEAD",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      }
    );
  } catch (error) {
    let e = error as Error;
    let status: number = 500;

    if (e.name === "SyntaxError") {
      e.message =
        "Payload is empty. Please you have provide the required fields correctly!";
        status = 400
    }

    return Response.json(
      { error: e.message },
      {
        status,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, HEAD",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      }
    );
  }
}
