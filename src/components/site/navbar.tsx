import Link from "next/link";
import { getServerSession } from "next-auth";

import Logo from "../ui/logo";
import Navigation from "./navigation";

export default async function Navbar() {
  const session = await getServerSession();

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <Navigation />
          </ul>
        </div>
        <Logo />
      </div>
      <nav className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <Navigation />
        </ul>
      </nav>
      <div className="navbar-end mr-4">
        {session?.user ? (
          <Link href="/dashboard" className="btn btn-primary">
            Dashboard
          </Link>
        ) : (
          <Link href="/signin" className="btn btn-primary">
            Sign in
          </Link>
        )}
      </div>
    </div>
  );
}
