import type { Metadata } from "next";
import {
  Heebo,
  Rubik,
  Assistant,
  Varela_Round,
  Frank_Ruhl_Libre,
  Secular_One,
  Suez_One,
  Karantina,
  Amatic_SC,
} from "next/font/google";
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

const assistant = Assistant({
  subsets: ["hebrew", "latin"],
  variable: "--font-assistant",
  display: "swap",
});

const varelaRound = Varela_Round({
  subsets: ["hebrew", "latin"],
  weight: "400",
  variable: "--font-varela-round",
  display: "swap",
});

const frankRuhlLibre = Frank_Ruhl_Libre({
  subsets: ["hebrew", "latin"],
  variable: "--font-frank-ruhl",
  display: "swap",
});

const secularOne = Secular_One({
  subsets: ["hebrew", "latin"],
  weight: "400",
  variable: "--font-secular-one",
  display: "swap",
});

const suezOne = Suez_One({
  subsets: ["hebrew", "latin"],
  weight: "400",
  variable: "--font-suez-one",
  display: "swap",
});

const karantina = Karantina({
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "700"],
  variable: "--font-karantina",
  display: "swap",
});

const amaticSC = Amatic_SC({
  subsets: ["hebrew", "latin"],
  weight: ["400", "700"],
  variable: "--font-amatic-sc",
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

const fontVars = [
  heebo.variable,
  rubik.variable,
  assistant.variable,
  varelaRound.variable,
  frankRuhlLibre.variable,
  secularOne.variable,
  suezOne.variable,
  karantina.variable,
  amaticSC.variable,
].join(" ");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl" className={fontVars}>
      <body className="font-heebo">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
