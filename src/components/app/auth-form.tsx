'use client';

import GoogleIcon from '@/assets/google.svg';
import Image from 'next/image';

export default function AuthForm() {
  return (
    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="email"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            placeholder="password"
            className="input input-bordered"
            required
          />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">
              Forgot password?
            </a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
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
