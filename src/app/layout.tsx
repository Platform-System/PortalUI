import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono, Playfair_Display } from "next/font/google";
import I18nProvider from "@/core/providers/I18nProvider";
import { defaultLocale } from "@/i18n/config";
import viMessages from "../../messages/vi.json";
import { AbstractIntlMessages } from "next-intl";
import { ThemeProvider } from "@platform/design-system/ThemeProvider";
import "./globals.css";
import Link from "next/link";
import { GlobalLoadingBarWrapper } from "@/components/portal/GlobalLoadingBarWrapper";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin", "vietnamese"],
  weight: ['400', '500', '600', '700', '800'],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin', 'vietnamese'],
  style: ['italic', 'normal'],
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: "NYXORIS | Universe Portal",
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
        className={`${plusJakarta.variable} ${geistMono.variable} ${playfair.variable} antialiased min-h-screen bg-white text-foreground relative overflow-x-hidden`}
      >
        {/* Cinematic Background Atmosphere */}
        <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_top,rgba(248,250,252,0.8)_0%,rgba(255,255,255,1)_50%)]" />
        
        {/* Layered Cosmic Glows */}
        <div className="pointer-events-none fixed top-[-20%] left-[-10%] z-0 h-[70%] w-[70%] rounded-full bg-[rgb(var(--store-accent-rgb)/0.08)] blur-[120px] opacity-60" />
        <div className="pointer-events-none fixed bottom-[-10%] right-[-5%] z-0 h-[50%] w-[50%] rounded-full bg-[rgb(var(--store-border-rgb)/0.3)] blur-[100px] opacity-40" />
        <div className="pointer-events-none fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 h-[80%] w-[80%] bg-[radial-gradient(circle,rgba(99,102,241,0.03)_0%,transparent_70%)]" />

        {/* Animated Light Beams */}
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          <div className="light-beam top-0 left-[10%] animate-beam opacity-20" style={{ animationDelay: '2s' }} />
          <div className="light-beam top-0 left-[40%] animate-beam opacity-10" style={{ animationDelay: '7s' }} />
          <div className="light-beam top-0 left-[70%] animate-beam opacity-20" style={{ animationDelay: '12s' }} />
        </div>

        {/* Premium Navigation Bar */}
        <header className="fixed top-0 left-0 right-0 z-50 flex justify-center p-6">
          <nav className="ds-glass-card px-8 py-3 rounded-full flex items-center gap-12 border border-white/40 shadow-xl shadow-slate-200/50">
            <Link href="/" className="text-xl font-serif font-black tracking-tighter hover:opacity-70 transition-opacity">
              NYXORIS
            </Link>
            
            <div className="hidden md:flex items-center gap-8">
              {['Platforms', 'Vision', 'Ecosystem'].map((item) => (
                <Link key={item} href="#" className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors">
                  {item}
                </Link>
              ))}
            </div>

            <Link 
              href="https://merchant.nyxoris.com" 
              className="bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-6 py-2.5 rounded-full hover:scale-105 transition-transform shadow-lg shadow-indigo-500/25"
            >
              Launch Merchant
            </Link>
          </nav>
        </header>

        <div className="relative z-10 flex min-h-screen w-full flex-col">
          <ThemeProvider defaultTheme="light">
            <I18nProvider locale={defaultLocale} messages={viMessages as unknown as AbstractIntlMessages}>
              <GlobalLoadingBarWrapper />
              {children}
            </I18nProvider>
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
