// frontend/components/ProtectedRoute.tsx
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/supabase-client";
import { usePathname } from "next/navigation";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const publicRoutes = ["/", "/login", "/about", "/contact"];
  const isPublic = publicRoutes.includes(pathname);

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data?.user) {
        router.replace("/login");
      } else {
        setAuthenticated(true);
      }
      setLoading(false);
    };

    checkAuth();

    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) {
        router.replace("/login");
      }
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, [router]);

  return <>{children}</>;
}

