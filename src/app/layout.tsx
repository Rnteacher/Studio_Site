import type { Metadata } from "next";
import { Heebo, Rubik } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  variable: "--font-heebo",
  display: "swap",
});

const rubik = Rubik({
  subsets: ["hebrew", "latin"],
  variable: "--font-rubik",
  display: "swap",
});

export const metadata: Metadata = {
  title: "סטודיו דוריאן | כישרונות צעירים. שירותים אמיתיים.",
  description:
    "סטודיו דוריאן — יוזמת נוער יצירתית מתוך תיכון החממה בהוד השרון. כישרונות צעירים, שירותים אמיתיים, השפעה אמיתית.",
  openGraph: {
    title: "סטודיו דוריאן",
    description: "כישרונות צעירים. שירותים אמיתיים. השפעה אמיתית.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl" className={`${heebo.variable} ${rubik.variable}`}>
      <body className="font-heebo">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
