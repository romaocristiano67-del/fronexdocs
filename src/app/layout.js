import { Sora, Instrument_Serif } from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--serif",
  weight: "400",
  style: ["italic", "normal"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Fronex Docs | SaaS",
  description: "Gerador de Documentos Escolares e Profissionais",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="pt"
      className={`${sora.variable} ${instrumentSerif.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
