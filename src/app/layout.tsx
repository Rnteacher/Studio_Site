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
  Open_Sans,
  Fredoka,
  Playpen_Sans_Hebrew,
  M_PLUS_Rounded_1c,
  Rubik_Pixels,
  Rubik_Dirt,
  Rubik_Glitch,
  Rubik_Bubbles,
  Rubik_Doodle_Shadow,
  Rubik_Iso,
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

const openSans = Open_Sans({
  subsets: ["hebrew", "latin"],
  variable: "--font-open-sans",
  display: "swap",
});

const fredoka = Fredoka({
  subsets: ["hebrew", "latin"],
  variable: "--font-fredoka",
  display: "swap",
});

const playpenSans = Playpen_Sans_Hebrew({
  subsets: ["hebrew", "latin"],
  variable: "--font-playpen-sans",
  display: "swap",
});

const mplusRounded = M_PLUS_Rounded_1c({
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "700"],
  variable: "--font-mplus-rounded",
  display: "swap",
});

const rubikPixels = Rubik_Pixels({
  subsets: ["hebrew", "latin"],
  weight: "400",
  variable: "--font-rubik-pixels",
  display: "swap",
});

const rubikDirt = Rubik_Dirt({
  subsets: ["hebrew", "latin"],
  weight: "400",
  variable: "--font-rubik-dirt",
  display: "swap",
});

const rubikGlitch = Rubik_Glitch({
  subsets: ["hebrew", "latin"],
  weight: "400",
  variable: "--font-rubik-glitch",
  display: "swap",
});

const rubikBubbles = Rubik_Bubbles({
  subsets: ["hebrew", "latin"],
  weight: "400",
  variable: "--font-rubik-bubbles",
  display: "swap",
});

const rubikDoodleShadow = Rubik_Doodle_Shadow({
  subsets: ["hebrew", "latin"],
  weight: "400",
  variable: "--font-rubik-doodle",
  display: "swap",
});

const rubikIso = Rubik_Iso({
  subsets: ["hebrew", "latin"],
  weight: "400",
  variable: "--font-rubik-iso",
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
  openSans.variable,
  fredoka.variable,
  playpenSans.variable,
  mplusRounded.variable,
  rubikPixels.variable,
  rubikDirt.variable,
  rubikGlitch.variable,
  rubikBubbles.variable,
  rubikDoodleShadow.variable,
  rubikIso.variable,
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
