import useSWR from "swr";
import type { User } from "@prisma/client";

import fetcher from "@/lib/utils";

export function useMe() {
  const { data, isLoading, error } = useSWR<User>("me", fetcher);
  const name = data?.name || "Unknown";
  const image =
    data?.image || "https://api.dicebear.com/7.x/shapes/png?seed=Bailey";

  return {
    user: {
      ...data!,
      name,
      image,
    },
    isLoading,
    error,
  };
}
