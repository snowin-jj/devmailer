import * as z from "zod";

export const mailPayloadSchema = z.object({
  to: z.string({ required_error: "The field `to` is required" }).email(),
  from: z.string({ required_error: "The field `from` is required" }).min(3),
  subject: z.string({ required_error: "The field `subject` is required" }),
  body: z.string({ required_error: "The field `body` is required" }).min(2),
});

export interface MailPayloadSchema extends z.infer<typeof mailPayloadSchema> {}
