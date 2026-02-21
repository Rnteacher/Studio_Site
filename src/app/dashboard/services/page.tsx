"use client";

import { useStudentProfile } from "@/hooks/useStudentProfile";
import { useStudentServices } from "@/hooks/useServices";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export default function ServicesPage() {
  const { data: profile, isLoading: loadingProfile } = useStudentProfile();
  const { data: services = [], isLoading: loadingServices } = useStudentServices(profile?.id);

  if (loadingProfile || loadingServices) {
    return (
      <div className="space-y-4 max-w-2xl">
        <Skeleton className="h-8 w-48" />
        {[1, 2, 3].map((i) => <Skeleton key={i} className="h-24 rounded-lg" />)}
      </div>
    );
  }

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold font-rubik">שירותים</h1>
      <p className="text-sm text-muted-foreground">
        השירותים המקושרים אליך. לשינויים פנה למנהל המערכת.
      </p>

      {services.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p>אין שירותים מקושרים עדיין.</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {services.map((service) => (
            <div key={service.id} className="flex items-center gap-4 bg-card rounded-xl p-4 shadow-sm">
              {service.image && service.image !== "/placeholder.svg" && (
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-16 h-16 rounded-lg object-cover shrink-0"
                />
              )}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-heading">{service.title}</p>
                {service.category && (
                  <Badge variant="secondary" className="text-xs mt-1">{service.category}</Badge>
                )}
                <p className="text-sm text-muted-foreground mt-1 truncate">{service.shortDescription}</p>
              </div>
              <Link href={`/services/${service.slug}`} target="_blank" className="shrink-0">
                <ExternalLink className="h-4 w-4 text-muted-foreground hover:text-primary" />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
