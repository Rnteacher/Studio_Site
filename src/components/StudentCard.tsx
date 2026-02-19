"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Student } from "@/hooks/useStudents";
import { useStudentServices } from "@/hooks/useServices";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { Briefcase } from "lucide-react";

interface StudentCardProps {
  student: Student;
}

const StudentCard = ({ student }: StudentCardProps) => {
  const { data: linkedServices = [] } = useStudentServices(student.id);
  const { data: portfolioSlug } = useQuery({
    queryKey: ["student-portfolio-slug", student.id],
    queryFn: async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from("portfolios")
        .select("slug")
        .eq("student_id", student.id)
        .eq("status", "published")
        .single();
      return data?.slug ?? null;
    },
  });

  return (
    <Link href={`/student/${student.id}`}>
      <Card className="group hover-scale cursor-pointer overflow-hidden border-border bg-card shadow-sm hover:shadow-lg transition-shadow duration-300">
        <div className="aspect-square bg-soft-bg flex items-center justify-center overflow-hidden relative">
          <img
            src={student.image}
            alt={student.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {portfolioSlug && (
            <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
              <Briefcase className="h-3 w-3" />
              פורטפוליו
            </span>
          )}
        </div>
        <CardContent className="p-5">
          <h3 className="font-rubik text-xl font-bold text-heading mb-2">
            {student.name}
          </h3>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {student.shortDescription}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {linkedServices.slice(0, 3).map((service) => (
              <Badge
                key={service.id}
                variant="secondary"
                className="text-xs bg-tag text-foreground"
              >
                {service.title}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default StudentCard;
