"use client";

import { useState, useEffect, createContext, useContext, type ReactNode } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User, Session } from "@supabase/supabase-js";
import React from "react";

function getSupabase() {
  return createClient();
}

async function checkAdmin(userId: string): Promise<boolean> {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase.rpc("has_role", {
      _user_id: userId,
      _role: "admin",
    });
    if (error) {
      console.error("[checkAdmin] RPC error:", error.message);
      return false;
    }
    return !!data;
  } catch (e) {
    console.error("[checkAdmin] exception:", e);
    return false;
  }
}

async function checkStudent(userId: string): Promise<boolean> {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("portfolios")
      .select("id")
      .eq("user_id", userId)
      .single();
    if (error) return false;
    return !!data;
  } catch {
    return false;
  }
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAdmin: boolean;
  isStudent: boolean;
  signIn: (email: string, password: string) => ReturnType<ReturnType<typeof createClient>["auth"]["signInWithPassword"]>;
  signInWithGoogle: () => ReturnType<ReturnType<typeof createClient>["auth"]["signInWithOAuth"]>;
  signOut: () => ReturnType<ReturnType<typeof createClient>["auth"]["signOut"]>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isStudent, setIsStudent] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const supabase = getSupabase();

    const timeout = setTimeout(() => {
      if (isMounted) setLoading(false);
    }, 5000);

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        if (!isMounted) return;
        setSession(newSession);
        setUser(newSession?.user ?? null);
        if (!newSession?.user) {
          setIsAdmin(false);
          setIsStudent(false);
          setLoading(false);
          return;
        }
        setTimeout(async () => {
          if (!isMounted) return;
          const [admin, student] = await Promise.all([
            checkAdmin(newSession.user.id),
            checkStudent(newSession.user.id),
          ]);
          if (isMounted) {
            setIsAdmin(admin);
            setIsStudent(student);
            setLoading(false);
          }
        }, 0);
      }
    );

    supabase.auth.getSession().then(async ({ data: { session: s } }) => {
      if (!isMounted) return;
      setSession(s);
      setUser(s?.user ?? null);
      if (s?.user) {
        const [admin, student] = await Promise.all([
          checkAdmin(s.user.id),
          checkStudent(s.user.id),
        ]);
        if (isMounted) {
          setIsAdmin(admin);
          setIsStudent(student);
        }
      }
      if (isMounted) setLoading(false);
    }).catch(() => {
      if (isMounted) setLoading(false);
    });

    return () => {
      isMounted = false;
      clearTimeout(timeout);
      subscription.unsubscribe();
    };
  }, []);

  const signIn = (email: string, password: string) => {
    const supabase = getSupabase();
    return supabase.auth.signInWithPassword({ email, password });
  };

  const signInWithGoogle = () => {
    const supabase = getSupabase();
    return supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  const signOut = () => {
    const supabase = getSupabase();
    return supabase.auth.signOut();
  };

  return React.createElement(AuthContext.Provider, {
    value: { user, session, loading, isAdmin, isStudent, signIn, signInWithGoogle, signOut },
    children,
  });
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
