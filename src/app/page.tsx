"use client"

import { motion, useScroll, useTransform } from "framer-motion";
import { 
  Users, ArrowRight, Globe, 
  ShoppingBag, Zap, Cpu, CreditCard, Palette 
} from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useMemo, useRef } from "react";
import { PortalEcosystemGrid } from "@/components/portal/PortalEcosystemGrid";
import { PortalPlatformCard } from "@/components/portal/PortalPlatformCard";
import { PortalSectionIntro } from "@/components/portal/PortalSectionIntro";

/**
 * Nyxoris Portal: Futuristic Technology Ecosystem Homepage.
 * Design Principle: Apple-level Minimalism, Cinematic Depth, and Fluid Motion.
 */
export default function Home() {
  const t = useTranslations("Portal");
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const ecosystemItems = [
    { name: "Merchant", icon: <ShoppingBag className="w-4 h-4" />, color: "bg-indigo-50/50" },
    { name: "Social", icon: <Users className="w-4 h-4" />, color: "bg-slate-50/50" },
    { name: "Creator", icon: <Palette className="w-4 h-4" />, color: "bg-indigo-50/50" },
    { name: "AI Studio", icon: <Cpu className="w-4 h-4" />, color: "bg-slate-50/50" },
    { name: "Payments", icon: <CreditCard className="w-4 h-4" />, color: "bg-indigo-50/50" },
  ];

  const particles = useMemo(
    () =>
      Array.from({ length: 15 }, (_, i) => ({
        id: i,
        x: ((i * 17) % 60) - 30,
        duration: 5 + (i % 5),
        delay: (i % 5) * 0.6,
        left: `${(i * 13) % 100}%`,
        top: `${(i * 19) % 100}%`,
      })),
    []
  );

  return (
    <main ref={containerRef} className="flex-1 flex flex-col items-center">
      
      {/* --- HERO SECTION --- */}
      <motion.section 
        style={{ scale: heroScale, opacity: heroOpacity }}
        className="min-h-screen flex flex-col items-center justify-center relative w-full px-6 py-32 overflow-hidden"
      >
        {/* Orbital Background Atmosphere */}
        <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none opacity-20">
          <div className="w-[1200px] h-[1200px] border border-primary/10 rounded-full animate-[spin_60s_linear_infinite]" />
          <div className="absolute w-[800px] h-[800px] border border-primary/5 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
          <div className="absolute w-[400px] h-[400px] border border-primary/5 rounded-full" />
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] portal-accent-glow pointer-events-none opacity-40" />
        
        {/* Cinematic Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 0 }}
              animate={{ 
                opacity: [0, 0.4, 0], 
                y: [-20, -120],
                x: p.x 
              }}
              transition={{ 
                duration: p.duration, 
                repeat: Infinity, 
                delay: p.delay 
              }}
              className="absolute w-1 h-1 bg-primary rounded-full blur-[1px]"
              style={{ 
                left: p.left, 
                top: p.top 
              }}
            />
          ))}
        </div>

        <div className="text-center relative z-10 select-none">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <div className="h-px w-10 bg-primary/20" />
            <span className="ds-uppercase-eyebrow text-primary/70">
              {t("welcome")}
            </span>
            <div className="h-px w-10 bg-primary/20" />
          </motion.div>
          
          <div className="relative mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="text-[10rem] md:text-[14rem] ds-hero-title relative z-10"
            >
              NYXORIS
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.05, scale: 1.1 }}
              transition={{ duration: 2.5, delay: 0.5 }}
              className="absolute inset-0 -z-10 flex items-center justify-center select-none"
            >
              <span className="text-[18rem] md:text-[24rem] font-serif font-black tracking-tighter text-indigo-950">
                NYX
              </span>
            </motion.div>
          </div>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto font-light leading-relaxed tracking-wide px-6 mb-16"
          >
            {t("description")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link 
              href="#" 
              className="bg-primary text-white text-[11px] font-bold uppercase tracking-widest px-10 py-4 rounded-full hover:scale-105 transition-transform shadow-xl shadow-indigo-500/20"
            >
              {t("hero.ctaExplore")}
            </Link>
            <Link 
              href="https://merchant.nyxoris.com" 
              className="ds-glass-card px-10 py-4 rounded-full text-[11px] font-bold uppercase tracking-widest text-slate-700 hover:bg-slate-50 transition-all border border-slate-200"
            >
              {t("hero.ctaStore")}
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-20"
          >
            <div className="animate-bounce">
              <div className="w-px h-12 bg-gradient-to-b from-primary/30 to-transparent mx-auto" />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* --- PLATFORM PORTALS SECTION --- */}
      <section className="w-full max-w-7xl px-6 py-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <PortalPlatformCard
            href="https://merchant.nyxoris.com"
            title={t("platforms.store.title")}
            subtitle={t("platforms.store.subtitle")}
            description={t("platforms.store.description")}
            statusLabel={t("status.online")}
            statusTone="online"
            ctaLabel={t("platforms.store.cta")}
            ctaIcon={<ArrowRight className="h-5 w-5 text-primary" />}
            motionFrom="left"
            decorativeVisual={
              <div className="absolute top-0 right-0 p-12 opacity-5 transition-opacity group-hover:opacity-10">
                <ShoppingBag className="h-56 w-56 -rotate-12" />
              </div>
            }
            footerVisual={
              <div className="space-y-4">
                <div className="flex gap-1.5">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="h-1 w-10 rounded-full bg-indigo-100/50" />
                  ))}
                </div>
                <span className="inline-block rounded-full border border-indigo-100/50 bg-indigo-50/50 px-5 py-2 text-[10px] font-bold uppercase tracking-widest text-indigo-500">
                  {t("platforms.store.highlight")}
                </span>
              </div>
            }
          />

          <PortalPlatformCard
            href="#"
            title={t("platforms.social.title")}
            subtitle={t("platforms.social.subtitle")}
            description={t("platforms.social.description")}
            statusLabel={t("status.upcoming")}
            statusTone="upcoming"
            ctaLabel={t("platforms.social.cta")}
            ctaIcon={<Zap className="h-4 w-4 opacity-50" />}
            motionFrom="right"
            decorativeVisual={
              <div className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.02] transition-opacity group-hover:opacity-[0.05] pointer-events-none">
                <div className="h-[500px] w-[500px] animate-[spin_25s_linear_infinite] rounded-full border border-primary" />
                <div className="absolute h-[350px] w-[350px] animate-[spin_20s_linear_infinite_reverse] rounded-full border border-primary/40" />
              </div>
            }
            footerVisual={
              <div className="space-y-4 text-left">
                <div className="flex -space-x-2.5 overflow-hidden">
                  {[1, 2, 3, 4].map((item) => (
                    <div
                      key={item}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 ring-2 ring-white/50"
                    >
                      <Users className="h-3.5 w-3.5 text-slate-300" />
                    </div>
                  ))}
                </div>
                <span className="inline-block rounded-full border border-slate-100 bg-slate-50/50 px-5 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  {t("platforms.social.highlight")}
                </span>
              </div>
            }
          />
        </div>
      </section>

      {/* --- ECOSYSTEM PREVIEW SECTION --- */}
      <section className="w-full py-40 bg-slate-50/30">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <PortalSectionIntro
            eyebrow="ECOSYSTEM INTEGRATION"
            title={t("ecosystem.title")}
            description={t("ecosystem.subtitle")}
          />

          <PortalEcosystemGrid items={ecosystemItems} />

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.3 }}
            className="mt-40 flex flex-col items-center gap-6"
          >
            <Globe className="w-5 h-5 text-slate-400" />
            <p className="text-[10px] font-bold tracking-[0.5em] uppercase text-slate-400">
              {t("unifiedNetwork")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- PREMIUM FOOTER --- */}
      <footer className="w-full bg-white border-t border-slate-100 px-6 pt-24 pb-12">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-20">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 w-full text-center lg:text-left">
            <div className="lg:col-span-2 space-y-6">
              <h4 className="text-2xl font-serif font-black tracking-tighter">NYXORIS</h4>
              <p className="text-slate-400 font-light text-sm max-w-sm mx-auto lg:mx-0 leading-relaxed">
                {t("footer.description")}
              </p>
            </div>
            
            <div className="space-y-6">
              <h5 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-900">Discover</h5>
              <div className="flex flex-col gap-3">
                {[t("footer.links.platforms"), t("footer.links.vision"), t("footer.links.ecosystem")].map(link => (
                  <Link key={link} href="#" className="text-sm text-slate-400 hover:text-primary transition-colors font-light">
                    {link}
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h5 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-900">Legal</h5>
              <div className="flex flex-col gap-3">
                {[t("footer.links.privacy"), "Terms of Service", "Cookie Policy"].map(link => (
                  <Link key={link} href="#" className="text-sm text-slate-400 hover:text-primary transition-colors font-light">
                    {link}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col items-center gap-10 pt-12 border-t border-slate-50">
             <div className="text-[9px] font-black tracking-[0.8em] uppercase text-slate-200">
               {t("footer.tagline")}
             </div>
             <div className="text-[9px] tracking-[0.4em] uppercase font-bold text-slate-300">
               &copy; 2026 NYXORIS RADIANCE . ALL RIGHTS RESERVED
             </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
