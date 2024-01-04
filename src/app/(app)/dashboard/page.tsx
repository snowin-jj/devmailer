'use client';

import KeySection from '@/components/app/key-section';
import SettingsSection from '@/components/app/settings';
import { useSearchParams } from 'next/navigation';

type Tabs = 'key' | 'settings' | null;

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('tab') as Tabs;

  return (
    <main>
      {currentTab === 'settings' ? <SettingsSection /> : <KeySection />}
    </main>
  );
}
