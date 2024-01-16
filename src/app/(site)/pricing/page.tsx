import Link from "next/link";

export default function PricingPage() {
  return (
    <section className="grid place-items-center">
      <div className="text-center space-y-4 max-w-2xl">
        <h2 className="font-bold text-6xl">
          Start with <span className="text-[#D6A567]">zero-cost</span>
        </h2>
        <p>
          Get your API keys and start hacking. Ideal for individual developers
          working on personal sites, and client projects.
        </p>
        <Link href="/dashboard" className="btn btn-primary">
          Start Now
        </Link>
      </div>
    </section>
  );
}
