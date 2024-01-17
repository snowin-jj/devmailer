"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ContactPage({
  searchParams,
}: {
  searchParams: { ref: string };
}) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const navigation = useRouter();
  const { ref } = searchParams;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      from: formData.get("name"),
      to: process.env.NEXT_PUBLIC_EMAIL,
      subject: formData.get("subject"),
      body: formData.get("describe"),
    };
    const res = await fetch(
      `/api/sendmail?apikey=${process.env.NEXT_PUBLIC_KEY}`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (res.ok) {
      toast.success("Thanks for your feedback");
    } else if (res.status === 429) {
      toast.error("Facing too many request! Please try after sometime");
    } else {
      toast.error("Something went wrong");
    }

    setIsSubmitting(false);
  }

  return (
    <section className="grid place-items-center min-h-screen">
      <form className="w-full max-w-md p-2" onSubmit={handleSubmit}>
        <h2 className="text-4xl font-bold">
          Contact <span className="text-[#D6A567]">us</span>
        </h2>
        <label className="form-control w-full" htmlFor="subject">
          <div className="label">
            <span className="label-text">Subject</span>
          </div>
          <select
            name="subject"
            className="select select-bordered w-full"
            defaultValue={
              ref === "site"
                ? "Plan extend"
                : ref === "app"
                ? "Feature Request"
                : "Bug report"
            }
          >
            <option value="Feature Request">Feature Request</option>
            <option value="Plan extend">Plan extend</option>
            <option value="Bug report">Bug report</option>
          </select>
        </label>
        <label className="form-control w-full" htmlFor="name">
          <div className="label">
            <span className="label-text">What is your name/organization?</span>
          </div>
          <input
            name="name"
            type="text"
            placeholder="Name"
            className="input input-bordered w-full"
            required
          />
        </label>
        <label className="form-control w-full" htmlFor="describe">
          <div className="label">
            <span className="label-text">Describe in detail</span>
          </div>
          <textarea
            required
            name="describe"
            placeholder="Describe"
            className="textarea textarea-bordered h-24"
          ></textarea>
        </label>
        <label className="form-control w-full my-2">
          <button type="submit" className="btn btn-primary">
            {isSubmitting ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Submit"
            )}
          </button>
        </label>
        <label className="form-control w-full my-2">
          <button
            type="button"
            className="btn btn-link"
            onClick={() => navigation.back()}
          >
            Back
          </button>
        </label>
      </form>
    </section>
  );
}
