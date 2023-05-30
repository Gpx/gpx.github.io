import GoogleAnalytics from "components/GoogleAnalytics";
import "../styles/globals.css";
import { Caveat_Brush, Public_Sans, Space_Mono, VT323 } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

const caveatBrush = Caveat_Brush({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-emphasis",
});
const publicSans = Public_Sans({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["200", "400", "500", "700", "800", "900"],
  variable: "--font-sans",
});
const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
});
const vt323 = VT323({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-console",
});

export const metadata = {
  title: "Gio Polvara",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${caveatBrush.variable} ${publicSans.variable} ${spaceMono.variable} ${vt323.variable}`}
    >
      <GoogleAnalytics />
      <Analytics />
      <body>{children}</body>
    </html>
  );
}
