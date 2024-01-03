import Navbar from '@/components/site/navbar';

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="max-w-7xl mx-auto grid grid-rows-[auto_1fr] min-h-screen">
      <Navbar />
      {children}
    </section>
  );
}
