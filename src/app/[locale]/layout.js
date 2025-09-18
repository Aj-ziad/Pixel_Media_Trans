import { Inter } from "next/font/google";
import "./globals.css";
import MenuBar from "@/components/MenuBar";
import Footer from "@/components/Footer";
import NextTopLoader from "nextjs-toploader";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "700"],
});

export const metadata = {
  title: "Pixel Media",
  description: "best services website",
};

export default async function LocaleLayout({ children, params }) {
  // Fix: await params in Next.js 15
  const { locale } = await params;
  
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body 
        className={`${inter.className} antialiased`}
        suppressHydrationWarning={true}
      >
        <NextIntlClientProvider locale={locale}>
          <MenuBar />
          <NextTopLoader color="#ffb900" />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
