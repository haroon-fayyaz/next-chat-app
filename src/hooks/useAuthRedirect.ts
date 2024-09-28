import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useAuth } from "@/components/AuthProvider";

export const useAuthRedirect = (isProtected: boolean) => {
  const { user, status } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (isProtected && !user) {
      router.push("/login");
    } else if (!isProtected && user) {
      router.push("/");
    }
  }, [user, status, isProtected, router]);

  return { user, status };
};
