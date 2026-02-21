"use client";

import Link from "next/link";
import { useSiteContent } from "@/hooks/useSiteContent";

const Footer = () => {
  const { data: content } = useSiteContent();
  const footer = content?.footer ?? {};

  const title = footer.title ?? "סטודיו דוריאן";
  const description = footer.description ?? "יוזמת נוער יצירתית מתוך תיכון החממה בהוד השרון.\nכישרונות צעירים, שירותים אמיתיים.";
  const email = footer.email ?? "studio@chamama.org";
  const copyright = footer.copyright ?? "תיכון החממה. כל הזכויות שמורות.";

  return (
    <footer className="bg-heading text-primary-foreground py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-rubik text-xl font-bold mb-3">{title}</h3>
            <p className="text-sm opacity-80 leading-relaxed whitespace-pre-line">
              {description}
            </p>
          </div>
          <div>
            <h4 className="font-rubik font-semibold mb-3">ניווט</h4>
            <div className="flex flex-col gap-2 text-sm opacity-80">
              <Link href="/" className="hover:opacity-100 transition-opacity">בית</Link>
              <Link href="/students" className="hover:opacity-100 transition-opacity">החניכים שלנו</Link>
              <Link href="/about" className="hover:opacity-100 transition-opacity">אודות</Link>
              <Link href="/contact" className="hover:opacity-100 transition-opacity">יצירת קשר</Link>
              <Link href="/auth/login" className="hover:opacity-100 transition-opacity">כניסת חניכים</Link>
            </div>
          </div>
          <div>
            <h4 className="font-rubik font-semibold mb-3">צרו קשר</h4>
            <p className="text-sm opacity-80">{email}</p>
          </div>
        </div>
        <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-center text-xs opacity-60">
          © {new Date().getFullYear()} {copyright}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
