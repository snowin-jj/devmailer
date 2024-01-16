import { getServerSession } from "next-auth";

import db from "@/lib/db";

export async function GET(request: Request) {
  try {
    const session = await getServerSession();

    if (!session)
      return Response.json({ error: "Not Authorized" }, { status: 401 });

    const user = await db.user.findUnique({
      where: {
        email: String(session.user?.email),
      },
    });

    return Response.json(user, { status: 200 });
  } catch (error) {
    const e = error as Error;
    return Response.json({ error: e.message }, { status: 500 });
  }
}
