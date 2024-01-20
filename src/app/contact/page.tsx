"use client";

import { useState } from "react";
import { type MailPayloadSchema, mailPayloadSchema } from "@/lib/schema";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";

export default function ContactPage({
  searchParams,
}: {
  searchParams: { from: string };
}) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const navigation = useRouter();
  const { from } = searchParams;
  const SUBJECTS = {
    site: "Plan extend",
    app: "Feature Request",
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<MailPayloadSchema>({
    resolver: zodResolver(mailPayloadSchema),
    defaultValues: {
      body: "",
      from: "",
      to: process.env.NEXT_PUBLIC_EMAIL,
      subject: SUBJECTS[from as "site" | "app"] || "Bug Report",
    },
  });

  async function onSubmit(data: MailPayloadSchema) {
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/feedback`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const jsonRes = await res.json();

      if (res.ok) {
        toast.success(jsonRes.message);
      } else {
        toast.error(jsonRes.error);
      }
    } catch (error) {
      const e = error as Error;
      toast.error(e.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="grid place-items-center min-h-screen">
      <form className="w-full max-w-md p-2" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-4xl font-bold">
          Contact <span className="text-[#D6A567]">us</span>
        </h2>
        <label className="form-control w-full" htmlFor="subject">
          <div className="label">
            <span className="label-text">Subject</span>
          </div>
          <Controller
            {...register("subject")}
            render={({ field }) => (
              <select {...field} className="select select-bordered w-full">
                <option value="Feature Request">Feature Request</option>
                <option value="Plan extend">Plan extend</option>
                <option value="Bug report">Bug report</option>
              </select>
            )}
            name="subject"
            control={control}
          />

          {errors.subject && (
            <div className="label">
              <span className="label-text-alt text-error">
                {errors.subject.message}
              </span>
            </div>
          )}
        </label>
        <label className="form-control w-full" htmlFor="name">
          <div className="label">
            <span className="label-text">What is your name/organization?</span>
          </div>
          <input
            type="text"
            placeholder="Name"
            className={cn("input input-bordered w-full", {
              "input-error": errors.from,
            })}
            {...register("from")}
          />
          {errors.from && (
            <div className="label">
              <span className="label-text-alt text-error">
                {errors.from.message}
              </span>
            </div>
          )}
        </label>
        <label className="form-control w-full" htmlFor="describe">
          <div className="label">
            <span className="label-text">Describe in detail</span>
          </div>
          <textarea
            required
            placeholder="Describe"
            className={cn("textarea textarea-bordered h-24", {
              "textarea-error": errors.body,
            })}
            {...register("body")}
          ></textarea>
          {errors.body && (
            <div className="label">
              <span className="label-text-alt text-error">
                {errors.body.message}
              </span>
            </div>
          )}
        </label>
        <input readOnly hidden {...register("to")} />
        <button
          type="submit"
          className="btn btn-primary w-full my-2"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="loading loading-spinner"></span>
          ) : (
            "Submit"
          )}
        </button>
        <label className="form-control w-full my-2">
          <button
            type="button"
            className="btn btn-link"
            onClick={() => navigation.back()}
          >
            Back
          </button>
        </label>
        {errors.to && <p>{errors.to.message}</p>}
      </form>
    </section>
  );
}
