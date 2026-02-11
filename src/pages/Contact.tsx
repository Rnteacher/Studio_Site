import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "ההודעה נשלחה!", description: "תודה שפנית אלינו, נחזור אליך בהקדם." });
    setFormData({ name: "", email: "", phone: "", service: "", message: "" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <h1 className="font-rubik text-4xl md:text-5xl font-extrabold text-heading text-center mb-4">
            יצירת קשר
          </h1>
          <p className="text-center text-muted-foreground mb-10">
            רוצים לשמוע עוד? יש לכם פרויקט? נשמח לשמוע!
          </p>

          {/* Studio email */}
          <div className="flex items-center justify-center gap-2 bg-card rounded-xl p-4 shadow-sm mb-10">
            <Mail className="h-5 w-5 text-primary" />
            <span className="font-medium">studio.dorian@example.co.il</span>
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
            <Input
              type="tel"
              placeholder="טלפון"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="bg-card"
            />
            <Input
              placeholder="שירות מבוקש"
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              className="bg-card"
            />
            <Textarea
              placeholder="הודעה"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              rows={5}
              className="bg-card"
            />
            <Button type="submit" className="w-full bg-primary hover:bg-heading text-lg h-12">
              שליחה
            </Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
