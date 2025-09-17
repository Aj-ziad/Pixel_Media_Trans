
import { Inter } from "next/font/google";
import "./globals.css";
import MenuBar from "@/components/MenuBar";
import Footer from "@/components/Footer";
import NextTopLoader from "nextjs-toploader";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",   // optional if you want to use CSS var
  weight: ["400", "700"],    // pick weights you need
});
export const metadata = {
  title:'Pixel Media',
  description: 'best services webseit',
}

export default async function LocaleLayout({ children, params  }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <html lang={locale}>
      <body className={`${inter.className} antialiased `}>
      <NextIntlClientProvider locale={locale}>
        <MenuBar/>
        <NextTopLoader color=" #ffb900"/>
        {children}
        <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
