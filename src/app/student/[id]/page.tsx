"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useStudent } from "@/hooks/useStudents";
import { useStudentServices } from "@/hooks/useServices";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, ArrowRight, Briefcase } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";

export default function StudentProfilePage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const { data: student, isLoading } = useStudent(id);
  const { data: linkedServices = [] } = useStudentServices(id);
  const { toast } = useToast();
  const { data: portfolioSlug } = useQuery({
    queryKey: ["student-portfolio-slug", id],
    queryFn: async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from("portfolios")
        .select("slug")
        .eq("student_id", id)
        .eq("status", "published")
        .single();
      return data?.slug ?? null;
    },
    enabled: !!id,
  });
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-xl text-muted-foreground">טוען...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-rubik text-3xl font-bold text-heading mb-4">לא נמצא</h1>
            <Button asChild>
              <Link href="/">חזרה לדף הבית</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: `[פנייה מדף החניך/ה: ${student.name}]\n\n${formData.message}`,
        }),
      });
      if (!res.ok) throw new Error("Failed to send");
      toast({ title: "ההודעה נשלחה!", description: `תודה ${formData.name}, נחזור אליך בהקדם.` });
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("Failed to send email:", err);
      toast({ title: "שגיאה בשליחה", description: "משהו השתבש, נסו שוב מאוחר יותר.", variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto px-4 pt-6">
          <Link href="/" className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
            <ArrowRight className="h-4 w-4" />
            חזרה לכל החניכים
          </Link>
        </div>

        <section className="py-10">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-full md:w-80 h-80 rounded-2xl overflow-hidden bg-soft-bg shrink-0">
                <img src={student.image} alt={student.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h1 className="font-rubik text-4xl md:text-5xl font-extrabold text-heading mb-3">
                  {student.name}
                </h1>
                <p className="text-lg text-muted-foreground mb-4">{student.shortDescription}</p>
                {linkedServices.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {linkedServices.map((svc) => (
                      <Link key={svc.id} href={`/services/${svc.slug}`}>
                        <Badge variant="default" className="cursor-pointer text-sm px-3 py-1 bg-primary text-primary-foreground hover:bg-heading">
                          {svc.title}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                )}
                <div className="flex flex-wrap gap-3 mb-4">
                  {portfolioSlug && (
                    <Link href={`/p/${portfolioSlug}`}>
                      <Button variant="default" size="sm" className="gap-1.5">
                        <Briefcase className="h-4 w-4" />פורטפוליו
                      </Button>
                    </Link>
                  )}
                </div>
                <p className="text-base leading-relaxed text-foreground">{student.longDescription}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-soft-bg/40">
          <div className="container mx-auto px-4">
            <h2 className="font-rubik text-2xl font-bold text-heading mb-6">שירותים</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {student.categories.map((cat) => (
                <div key={cat} className="bg-card rounded-xl p-5 shadow-sm">
                  <h3 className="font-rubik font-semibold text-heading mb-3">{cat}</h3>
                  <div className="flex flex-wrap gap-2">
                    {(student.services[cat] || []).map((service) => (
                      <Badge key={service} variant="secondary" className="bg-tag text-foreground">
                        {service}
                      </Badge>
                    ))}
                    {(!student.services[cat] || student.services[cat].length === 0) && (
                      <span className="text-sm text-muted-foreground">אין שירותים בקטגוריה זו</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4 max-w-2xl">
            <h2 className="font-rubik text-2xl font-bold text-heading mb-6">יצירת קשר</h2>
            <div className="flex items-center justify-center gap-2 bg-card rounded-xl p-4 shadow-sm mb-8">
              <Mail className="h-5 w-5 text-primary" />
              <span className="text-sm">studio@chamama.org</span>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="שם מלא"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="bg-card"
              />
              <Input
                type="email"
                placeholder="אימייל"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="bg-card"
              />
              <Textarea
                placeholder="הודעה"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={4}
                className="bg-card"
              />
              <Button type="submit" disabled={sending} className="w-full bg-primary hover:bg-heading">
                {sending ? "שולח..." : "שליחה"}
              </Button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
