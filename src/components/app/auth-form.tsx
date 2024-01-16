"use client";

import Image from "next/image";
import { useState } from "react";
import { signIn } from "next-auth/react";

import GoogleIcon from "@/assets/google.svg";

export default function AuthForm() {
  const [isSubmiting, setIssubmiting] = useState<boolean>(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email")?.toString();

    if (!email) throw new Error("Please provide valid email");

    try {
      setIssubmiting(true);
      await signIn("email", {
        email,
        callbackUrl: "/dashboard",
      });
    } catch (error) {
      const e = error as Error;
      throw new Error(e.message);
    } finally {
      setIssubmiting(false);
    }
  }

  return (
    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form className="card-body" onSubmit={handleSubmit}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="email"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">
            {isSubmiting ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Login"
            )}
          </button>
        </div>
        <span className="text-center text-accent">or</span>
        <div className="form-control">
          <button className="btn">
            <Image src={GoogleIcon} alt="google icon" width={18} height={18} />
            Continue with google
          </button>
        </div>
      </form>
    </div>
  );
}
