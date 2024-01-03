import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function Logo({
  classname,
  href = '/',
}: {
  classname?: React.AnchorHTMLAttributes<HTMLAnchorElement>['className'];
  href?: React.AnchorHTMLAttributes<HTMLAnchorElement>['href'];
}) {
  return (
    <Link
      href={href}
      className={cn(
        'btn btn-link no-underline hover:no-underline text-xl gap-0',
        classname
      )}
    >
      Dev<span className="text-[#D6A567]">Mailer</span>
    </Link>
  );
}
