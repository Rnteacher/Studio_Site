"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Eye, UserCircle, User, FolderOpen, FileText, Palette, Globe, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { href: "/dashboard/preview", label: "תצוגה מקדימה", icon: Eye },
  { href: "/dashboard/profile", label: "פרופיל", icon: UserCircle },
  { href: "/dashboard/about", label: "אודות", icon: User },
  { href: "/dashboard/projects", label: "פרויקטים", icon: FolderOpen },
  { href: "/dashboard/cv", label: "קורות חיים", icon: FileText },
  { href: "/dashboard/design", label: "עיצוב", icon: Palette },
  { href: "/dashboard/publish", label: "פרסום", icon: Globe },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Top header */}
      <header className="bg-background border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <Link href="/" className="font-rubik font-bold text-lg text-primary">
              Studio Durian
            </Link>
            <span className="text-muted-foreground text-sm">/ דאשבורד</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden sm:inline">
              {user?.email}
            </span>
            <Button variant="ghost" size="sm" onClick={() => signOut()}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Desktop tab navigation */}
      <nav className="bg-background border-b hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex gap-1">
            {tabs.map((tab) => {
              const isActive = pathname === tab.href;
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={cn(
                    "flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors",
                    isActive
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/30"
                  )}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="container mx-auto px-4 py-6 pb-24 md:pb-6">
        {children}
      </main>

      {/* Mobile bottom tab bar */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 bg-background border-t z-40">
        <div className="flex justify-around">
          {tabs.map((tab) => {
            const isActive = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={cn(
                  "flex flex-col items-center gap-1 py-2 px-2 text-xs flex-1",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                <tab.icon className="h-5 w-5" />
                <span className="truncate">{tab.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
