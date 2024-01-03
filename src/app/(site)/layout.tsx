import Navbar from '@/components/site/navbar';

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="max-w-7xl mx-auto grid grid-rows-[auto_1fr] min-h-screen px-4 md:px-8">
      <Navbar />
      {children}
    </section>
  );
}
