import Header from '@/components/app/header';
import SideBar from '@/components/app/sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="max-w-7xl mx-auto grid grid-rows-[auto_1fr] min-h-screen px-4 md:px-8">
      <Header />
      <main className="flex items-start gap-8 md:mt-8">
        <SideBar />
        {children}
      </main>
    </section>
  );
}
