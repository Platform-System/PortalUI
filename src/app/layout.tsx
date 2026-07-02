import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import I18nProvider from "@/core/providers/I18nProvider";
import { defaultLocale } from "@/i18n/config";
import viMessages from "../../messages/vi.json";
import { AbstractIntlMessages } from "next-intl";
import { BRAND_METADATA, ThemeProvider } from '@platform-system/design-ui';
import AuthProvider from "@/core/providers/AuthProvider";
import "./globals.css";

import { Header } from "@/components/portal/Header";
import { AmbientParticles } from "@/components/portal/AmbientParticles";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin", "vietnamese"],
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: BRAND_METADATA.title,
  description: "The gateway to the Nyxoris digital ecosystem.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body
        className={`${plusJakarta.variable} antialiased min-h-screen bg-background text-foreground relative overflow-x-hidden`}
      >
        <ThemeProvider defaultTheme="dark">
          <AuthProvider>
            <I18nProvider locale={defaultLocale} messages={viMessages as unknown as AbstractIntlMessages}>
              {/* Cinematic Background Atmosphere */}
              <div className="pointer-events-none fixed inset-0 z-0 bg-background" />
              
              {/* Layered Cosmic Glows */}
              <div className="pointer-events-none fixed top-[-20%] left-[-10%] z-0 h-[70%] w-[70%] rounded-full bg-[rgb(var(--store-accent-rgb)/0.02)] dark:bg-[rgb(var(--store-accent-rgb)/0.04)] blur-[120px] opacity-60 transition-opacity duration-300" />
              <div className="pointer-events-none fixed bottom-[-10%] right-[-5%] z-0 h-[50%] w-[50%] rounded-full bg-indigo-500/2 dark:bg-indigo-500/5 blur-[100px] opacity-40 transition-opacity duration-300" />
              <div className="pointer-events-none fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 h-[80%] w-[80%] bg-[radial-gradient(circle,rgba(99,102,241,0.01)_0%,transparent_70%)] dark:bg-[radial-gradient(circle,rgba(99,102,241,0.015)_0%,transparent_70%)] transition-opacity duration-300" />
              <AmbientParticles />

              {/* Animated Light Beams */}
              <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
                <div className="light-beam top-0 left-[10%] animate-beam opacity-[0.01] dark:opacity-5 transition-opacity duration-300" style={{ animationDelay: '2s' }} />
                <div className="light-beam top-0 left-[40%] animate-beam opacity-[0.005] dark:opacity-[0.03] transition-opacity duration-300" style={{ animationDelay: '7s' }} />
                <div className="light-beam top-0 left-[70%] animate-beam opacity-[0.01] dark:opacity-5 transition-opacity duration-300" style={{ animationDelay: '12s' }} />
              </div>

              {/* Premium Navigation Bar */}
              <Header />

              <div className="relative z-10 flex min-h-screen w-full flex-col pt-0">
                {children}
              </div>
            </I18nProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
