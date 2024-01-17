"use client";

import Image from "next/image";
import Link from "next/link";
import Logo from "../ui/logo";
import { signOut } from "next-auth/react";
import { useMe } from "@/hooks/useMe";

export default function Header() {
  const { user } = useMe();

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Logo href="/dashboard" />
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <Image
                alt="Tailwind CSS Navbar component"
                src={user.image}
                priority
                width={48}
                height={48}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <Link href="/dashboard?tab=key" className="justify-between">
                Api Key
              </Link>
            </li>
            <li>
              <Link href="/dashboard?tab=settings">Settings</Link>
            </li>
            <li>
              <Link href="/contact?ref=app">Contact</Link>
            </li>
            <li>
              <a onClick={() => signOut()}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
