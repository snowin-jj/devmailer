import { MailService, sendMail } from "@/lib/mail";

export async function POST(request: Request) {
  try {
    const { to, from, body, subject } = await request.json();
    const mailService = new MailService(from, to, subject, body);
    const res = await sendMail(mailService);
    return Response.json({ messsage: res.response });
  } catch (error) {
    const e = error as Error;
    return Response.json({ error: e.message }, { status: 500 });
  }
}
