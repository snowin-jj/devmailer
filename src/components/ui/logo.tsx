import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Logo({
  classname,
  href = "/",
}: {
  classname?: React.AnchorHTMLAttributes<HTMLAnchorElement>["className"];
  href?: React.AnchorHTMLAttributes<HTMLAnchorElement>["href"];
}) {
  return (
    <Link
      href={href}
      className={cn(
        "relative btn btn-link no-underline hover:no-underline text-xl gap-0",
        classname
      )}
    >
      <span>
        Dev<span className="text-[#D6A567]">Mailer</span>
      </span>
      <span className="badge badge-warning absolute top-1 -right-4 badge-xs">
        beta
      </span>
    </Link>
  );
}
