import Link from "next/link";

export default function Navigation() {
  return (
    <>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/about">About</Link>
      </li>
      <li>
        <Link href="https://docs-devmailer.netlify.app/" target="_blank">
          Docs
        </Link>
      </li>
      <li>
        <Link href="/pricing">Pricing</Link>
      </li>
      <li>
        <Link href="/contact?ref=site">Contact</Link>
      </li>
    </>
  );
}
