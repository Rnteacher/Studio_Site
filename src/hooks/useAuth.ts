import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";

async function checkAdmin(userId: string): Promise<boolean> {
  try {
    const { data } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle();
    return !!data;
  } catch {
    return false;
  }
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let isMounted = true;

    console.log("[useAuth] effect started");

    // Set up listener FIRST per Supabase docs
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        console.log("[useAuth] onAuthStateChange", _event, !!newSession?.user);
        if (!isMounted) return;
        setSession(newSession);
        setUser(newSession?.user ?? null);
        if (!newSession?.user) {
          setIsAdmin(false);
          setLoading(false);
        }
        // Don't do async work inside onAuthStateChange callback per Supabase recommendations
      }
    );

    // Then get the session - this is the primary path for loading state
    supabase.auth.getSession().then(async ({ data: { session: currentSession } }) => {
      console.log("[useAuth] getSession resolved", !!currentSession?.user);
      if (!isMounted) return;
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      if (currentSession?.user) {
        console.log("[useAuth] checking admin for", currentSession.user.id);
        const admin = await checkAdmin(currentSession.user.id);
        console.log("[useAuth] admin check result:", admin);
        if (isMounted) setIsAdmin(admin);
      }
      if (isMounted) {
        console.log("[useAuth] setting loading to false");
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    return supabase.auth.signInWithPassword({ email, password });
  };

  const signOut = async () => {
    return supabase.auth.signOut();
  };

  return { user, session, loading, isAdmin, signIn, signOut };
}
