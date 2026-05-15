"use client"

import { motion, useScroll, useTransform } from "framer-motion";
import { 
  Store, Users, Shield, ArrowRight, Sparkles, Globe, 
  ShoppingBag, Zap, Cpu, CreditCard, Palette 
} from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useRef, useState, useEffect } from "react";

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

  // Fix Hydration Mismatch by generating random particles only on client
  const [particles, setParticles] = useState<any[]>([]);
  useEffect(() => {
    setParticles([...Array(15)].map((_, i) => ({
      id: i,
      x: Math.random() * 60 - 30,
      duration: 5 + Math.random() * 5,
      delay: Math.random() * 5,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    })));
  }, []);

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
            <span className="text-[10px] font-bold tracking-[0.7em] uppercase text-primary/70">
              {t("welcome")}
            </span>
            <div className="h-px w-10 bg-primary/20" />
          </motion.div>
          
          <div className="relative mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="text-[10rem] md:text-[14rem] font-serif font-black tracking-[-0.04em] leading-[0.8] hero-title relative z-10"
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
              className="glass-card px-10 py-4 rounded-full text-[11px] font-bold uppercase tracking-widest text-slate-700 hover:bg-slate-50 transition-all border border-slate-200"
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
          {/* Store Portal Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link href="https://merchant.nyxoris.com" className="group relative block h-[580px]">
              <div className="glass-card glass-card-hover p-12 rounded-[3.5rem] h-full flex flex-col relative overflow-hidden border-white/50">
                <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
                  <ShoppingBag className="w-56 h-56 -rotate-12" />
                </div>
                
                <div className="mb-10 relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-green-600/70">
                      {t("status.online")}
                    </span>
                  </div>
                  <h2 className="text-5xl font-serif font-bold text-slate-900 mb-4 tracking-tight">{t("platforms.store.title")}</h2>
                  <p className="text-primary text-[10px] font-black uppercase tracking-[0.3em] italic opacity-80">
                    {t("platforms.store.subtitle")}
                  </p>
                </div>

                <p className="text-lg text-slate-500 font-light leading-relaxed max-w-sm flex-1 relative z-10">
                  {t("platforms.store.description")}
                </p>

                <div className="mt-12 flex items-end justify-between relative z-10">
                  <div className="space-y-4">
                    <div className="flex gap-1.5">
                      {[1,2,3].map(i => <div key={i} className="w-10 h-1 bg-indigo-100/50 rounded-full" />)}
                    </div>
                    <span className="inline-block px-5 py-2 rounded-full bg-indigo-50/50 text-[10px] font-bold text-indigo-500 tracking-widest uppercase border border-indigo-100/50">
                      {t("platforms.store.highlight")}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-slate-900 group-hover:gap-6 transition-all duration-700 font-bold uppercase tracking-[0.3em] text-[11px]">
                    <span>{t("platforms.store.cta")}</span>
                    <ArrowRight className="w-5 h-5 text-primary" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Social Portal Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link href="#" className="group relative block h-[580px]">
              <div className="glass-card glass-card-hover p-12 rounded-[3.5rem] h-full flex flex-col relative overflow-hidden border-white/50">
                <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
                  <div className="w-[500px] h-[500px] rounded-full border border-primary animate-[spin_25s_linear_infinite]" />
                  <div className="absolute w-[350px] h-[350px] rounded-full border border-primary/40 animate-[spin_20s_linear_infinite_reverse]" />
                </div>

                <div className="mb-10 relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-2 h-2 rounded-full bg-slate-200" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400">
                      {t("status.upcoming")}
                    </span>
                  </div>
                  <h2 className="text-5xl font-serif font-bold text-slate-900 mb-4 tracking-tight">{t("platforms.social.title")}</h2>
                  <p className="text-primary text-[10px] font-black uppercase tracking-[0.3em] italic opacity-80">
                    {t("platforms.social.subtitle")}
                  </p>
                </div>

                <p className="text-lg text-slate-500 font-light leading-relaxed max-w-sm flex-1 relative z-10">
                  {t("platforms.social.description")}
                </p>

                <div className="mt-12 flex items-end justify-between relative z-10">
                  <div className="space-y-4 text-left">
                    <div className="flex -space-x-2.5 overflow-hidden">
                      {[1,2,3,4].map(i => (
                        <div key={i} className="inline-block h-8 w-8 rounded-full ring-2 ring-white/50 bg-slate-50 flex items-center justify-center">
                           <Users className="w-3.5 h-3.5 text-slate-300" />
                        </div>
                      ))}
                    </div>
                    <span className="inline-block px-5 py-2 rounded-full bg-slate-50/50 text-[10px] font-bold text-slate-400 tracking-widest uppercase border border-slate-100">
                      {t("platforms.social.highlight")}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-slate-400 font-bold uppercase tracking-[0.3em] text-[11px]">
                    <span>{t("platforms.social.cta")}</span>
                    <Zap className="w-4 h-4 opacity-50" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* --- ECOSYSTEM PREVIEW SECTION --- */}
      <section className="w-full py-40 bg-slate-50/30">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-24"
          >
            <h3 className="text-[11px] font-bold uppercase tracking-[0.5em] text-primary mb-6 italic opacity-70">
              ECOSYSTEM INTEGRATION
            </h3>
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-slate-950 mb-8 tracking-tight">
              {t("ecosystem.title")}
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto font-light text-lg">
              {t("ecosystem.subtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {ecosystemItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className={`p-10 rounded-[2.5rem] ${item.color} border border-white/80 flex flex-col items-center gap-5 hover:bg-white hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 cursor-default group`}
              >
                <div className="p-4 rounded-2xl bg-white text-primary shadow-sm group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  {item.icon}
                </div>
                <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-500 group-hover:text-slate-900 transition-colors">
                  {item.name}
                </span>
              </motion.div>
            ))}
          </div>

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
