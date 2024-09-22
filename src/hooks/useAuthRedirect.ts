import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export const useAuthRedirect = (isProtected: boolean) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (isProtected && !session) {
      router.push("/login");
    } else if (!isProtected && session) {
      router.push("/");
    }
  }, [session, status, isProtected, router]);

  return { session, status };
};
