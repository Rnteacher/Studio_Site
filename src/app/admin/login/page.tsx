"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginAttempted, setLoginAttempted] = useState(false);
  const { signIn, user, isAdmin, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (!authLoading && user && isAdmin) {
      router.replace("/admin");
    }
  }, [authLoading, user, isAdmin, router]);

  useEffect(() => {
    if (loginAttempted && !authLoading && user) {
      if (isAdmin) {
        router.replace("/admin");
      } else {
        const timer = setTimeout(() => {
          if (!isAdmin) {
            toast({ title: "שגיאה", description: "אין לך הרשאות מנהל", variant: "destructive" });
            setLoginAttempted(false);
          }
        }, 2000);
        return () => clearTimeout(timer);
      }
    }
  }, [loginAttempted, authLoading, user, isAdmin, router, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) {
      toast({ title: "שגיאת התחברות", description: error.message, variant: "destructive" });
    } else {
      setLoginAttempted(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-sm mx-auto p-6">
          <h1 className="font-rubik text-3xl font-bold text-heading mb-6 text-center">כניסת מנהל</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="אימייל"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              dir="ltr"
            />
            <Input
              type="password"
              placeholder="סיסמה"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              dir="ltr"
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "מתחבר..." : "התחבר"}
            </Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
