"use client";

import { useSearchParams } from "next/navigation";

import KeySection from "@/components/app/key-section";
import SettingsSection from "@/components/app/settings";
import { useMe } from "@/hooks/useMe";

type Tabs = "key" | "settings" | null;

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") as Tabs;
  const { user, isLoading, error } = useMe();

  if (isLoading) return <p>loading....</p>;
  if (error) return <pre>{error}</pre>;

  return (
    <main>
      {currentTab === "settings" ? (
        <SettingsSection user={user} />
      ) : (
        <KeySection apikey={user.apikey} />
      )}
    </main>
  );
}
