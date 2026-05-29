"use client"

import { motion, useMotionValue, useTransform } from "framer-motion";
import { 
  ArrowRight, ShoppingBag, Users, Film, Zap, Globe, Plus
} from "lucide-react";
import Link from "next/link";
import { ACTIVE_PLATFORM_URL } from "@/core/constants";
import { PortalSectionIntro } from "@/components/portal/PortalSectionIntro";

export default function Home() {
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  } as const;

  const fadeUpItem = {
    hidden: { opacity: 0, y: 25 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
  } as const;

  return (
    <main className="flex-1 flex flex-col items-center bg-background text-foreground overflow-hidden font-sans">
      
      {/* --- HERO SECTION --- */}
      <section id="overview" className="min-h-screen flex flex-col lg:flex-row items-center justify-center relative w-full max-w-7xl px-6 md:px-12 pt-32 pb-20 gap-16 overflow-hidden">
        {/* Soft immersive background blobs and grid */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-[10%] left-[10%] w-[350px] h-[350px] rounded-full bg-primary/3 dark:bg-primary/5 blur-[100px] animate-blob-slow" />
          <div className="absolute bottom-[20%] right-[5%] w-[400px] h-[400px] rounded-full bg-indigo-500/2 dark:bg-indigo-500/4 blur-[120px] animate-blob-slow-delayed" />
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.18] dark:opacity-[0.3]" />
        </div>

        {/* Left column: Text */}
        <div className="flex-1 text-left relative z-10 flex flex-col items-start max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-muted/30 backdrop-blur-md mb-6"
          >
            <Globe className="w-3.5 h-3.5 text-primary" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Cổng chính Nyxoris
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif font-black tracking-tighter leading-tight text-foreground mb-6"
          >
            Khám phá hệ sinh thái Nyxoris
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-base md:text-lg text-muted-foreground font-light leading-relaxed tracking-wide mb-10"
          >
            Nyxoris là cổng truy cập trung tâm giúp bạn khám phá các nền tảng mua bán, cộng đồng và giải trí trong cùng một trải nghiệm thống nhất.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
          >
            <a 
              href="#platforms"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold px-8 py-3.5 rounded-full text-xs uppercase tracking-wider transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98] text-center"
            >
              Khám phá nền tảng
            </a>
          </motion.div>
        </div>

        {/* Right column: Abstract UI Cards Visual */}
        <div className="flex-1 w-full max-w-lg relative h-[450px] flex items-center justify-center z-10 select-none">
            {/* Orbital indicators */}
            <div className="absolute w-[290px] h-[290px] border border-primary/10 rounded-full pointer-events-none z-0 animate-[spin_50s_linear_infinite]" />
            <div className="absolute w-[380px] h-[380px] border border-dashed border-border/20 rounded-full pointer-events-none z-0 animate-[spin_80s_linear_infinite_reverse]" />
            
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--store-accent-rgb),0.05)_0%,transparent_70%)] pointer-events-none" />
            
            {/* Animated SVG Connection Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 450 450" fill="none">
              {/* Center node: (225, 225) */}
              {/* To Card 1: (225 - 110, 225 - 110) = (115, 115) */}
              <motion.path 
                className="stroke-primary/25 dark:stroke-primary/35" 
                strokeWidth="1.5" 
                strokeDasharray="4 4"
                animate={{ 
                  strokeDashoffset: [0, -20],
                  d: ["M 225 225 L 123 115", "M 225 225 L 115 123", "M 225 225 L 107 115", "M 225 225 L 115 107", "M 225 225 L 123 115"]
                }}
                transition={{ 
                  strokeDashoffset: { repeat: Infinity, duration: 2, ease: "linear" },
                  d: { repeat: Infinity, duration: 6, ease: "linear" }
                }}
              />
              {/* To Card 2: (225 + 110, 225 - 80) = (335, 145) */}
              <motion.path 
                className="stroke-primary/25 dark:stroke-primary/35" 
                strokeWidth="1.5" 
                strokeDasharray="4 4"
                animate={{ 
                  strokeDashoffset: [0, -20],
                  d: ["M 225 225 L 343 145", "M 225 225 L 335 153", "M 225 225 L 327 145", "M 225 225 L 335 137", "M 225 225 L 343 145"]
                }}
                transition={{ 
                  strokeDashoffset: { repeat: Infinity, duration: 2.5, ease: "linear" },
                  d: { repeat: Infinity, duration: 6, ease: "linear" }
                }}
              />
              {/* To Card 3: (225 - 20, 225 + 130) = (205, 355) */}
              <motion.path 
                className="stroke-primary/25 dark:stroke-primary/35" 
                strokeWidth="1.5" 
                strokeDasharray="4 4"
                animate={{ 
                  strokeDashoffset: [0, -20],
                  d: ["M 225 225 L 213 355", "M 225 225 L 205 363", "M 225 225 L 197 355", "M 225 225 L 205 347", "M 225 225 L 213 355"]
                }}
                transition={{ 
                  strokeDashoffset: { repeat: Infinity, duration: 3, ease: "linear" },
                  d: { repeat: Infinity, duration: 6, ease: "linear" }
                }}
              />
            </svg>

            {/* Main Central Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
              transition={{ 
                scale: { duration: 1 },
                opacity: { duration: 1 },
                y: { repeat: Infinity, duration: 6, ease: "easeInOut" }
              }}
              whileHover={{ scale: 1.03 }}
              style={{ transform: "translateZ(20px)" }}
              className="w-64 p-6 bg-card/90 backdrop-blur-md border border-primary/20 dark:border-primary/35 rounded-3xl shadow-2xl relative z-20 text-center flex flex-col items-center justify-center hover:border-primary/40 hover:shadow-primary/5 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-3">
                <Globe className="w-6 h-6 animate-pulse" />
              </div>
              <h3 className="text-xl font-bold tracking-tight text-foreground">Nyxoris</h3>
              <span className="text-[9px] uppercase tracking-wider text-muted-foreground mt-1">Hệ sinh thái số</span>
            </motion.div>

            {/* Connected Card 1: Nền tảng bán hàng */}
            <motion.div 
              initial={{ opacity: 0, x: -110, y: -110 }}
              animate={{ 
                opacity: 1, 
                x: [-102, -110, -118, -110, -102], 
                y: [-110, -102, -110, -118, -110] 
              }}
              transition={{ 
                opacity: { duration: 1, delay: 0.3 },
                x: { repeat: Infinity, duration: 6, ease: "linear" },
                y: { repeat: Infinity, duration: 6, ease: "linear" }
              }}
              whileHover={{ scale: 1.03, rotate: -1 }}
              style={{ transform: "translateZ(40px)" }}
              className="absolute p-4 w-44 bg-card/90 backdrop-blur-sm border border-border rounded-2xl shadow-xl z-30 hover:border-primary/30 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2 mb-2">
                <ShoppingBag className="w-4 h-4 text-primary" />
                <span className="text-[10px] font-bold text-foreground">Nền tảng bán hàng</span>
              </div>
              <p className="text-[9px] text-muted-foreground leading-relaxed">Vận hành và tương tác mua bán trong hệ sinh thái.</p>
              <div className="mt-2.5 flex justify-between items-center">
                <span className="text-[8px] bg-primary/10 text-primary px-2 py-0.5 rounded font-medium">Đang hoạt động</span>
              </div>
            </motion.div>

            {/* Connected Card 2: Nền tảng cộng đồng */}
            <motion.div 
              initial={{ opacity: 0, x: 110, y: -80 }}
              animate={{ 
                opacity: 1, 
                x: [110, 102, 110, 118, 110], 
                y: [-72, -80, -88, -80, -72] 
              }}
              transition={{ 
                opacity: { duration: 1, delay: 0.5 },
                x: { repeat: Infinity, duration: 6, ease: "linear" },
                y: { repeat: Infinity, duration: 6, ease: "linear" }
              }}
              whileHover={{ scale: 1.03, rotate: 1 }}
              style={{ transform: "translateZ(40px)" }}
              className="absolute p-4 w-44 bg-card/90 backdrop-blur-sm border border-border rounded-2xl shadow-xl z-30 transition-all cursor-not-allowed"
            >
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-primary" />
                <span className="text-[10px] font-bold text-foreground">Nền tảng cộng đồng</span>
              </div>
              <p className="text-[9px] text-muted-foreground leading-relaxed">Kết nối, tương tác và chia sẻ với người dùng.</p>
              <div className="mt-2.5 flex justify-between items-center">
                <span className="text-[8px] bg-muted text-muted-foreground px-2 py-0.5 rounded font-medium">Đang phát triển</span>
              </div>
            </motion.div>

            {/* Connected Card 3: Nền tảng xem phim */}
            <motion.div 
              initial={{ opacity: 0, x: -20, y: 130 }}
              animate={{ 
                opacity: 1, 
                x: [-28, -20, -12, -20, -28], 
                y: [130, 138, 130, 122, 130] 
              }}
              transition={{ 
                opacity: { duration: 1, delay: 0.7 },
                x: { repeat: Infinity, duration: 6, ease: "linear" },
                y: { repeat: Infinity, duration: 6, ease: "linear" }
              }}
              whileHover={{ scale: 1.03, rotate: -1 }}
              style={{ transform: "translateZ(40px)" }}
              className="absolute p-4 w-44 bg-card/90 backdrop-blur-sm border border-border rounded-2xl shadow-xl z-30 transition-all cursor-not-allowed"
            >
              <div className="flex items-center gap-2 mb-2">
                <Film className="w-4 h-4 text-primary" />
                <span className="text-[10px] font-bold text-foreground">Nền tảng xem phim</span>
              </div>
              <p className="text-[9px] text-muted-foreground leading-relaxed">Thưởng thức kho nội dung giải trí chất lượng cao.</p>
              <div className="mt-2.5 flex justify-between items-center">
                <span className="text-[8px] bg-muted text-muted-foreground px-2 py-0.5 rounded font-medium">Đang phát triển</span>
              </div>
            </motion.div>
        </div>
      </section>

      {/* --- PLATFORM DIRECTORY SECTION --- */}
      <section id="platforms" className="w-full max-w-7xl px-6 md:px-12 py-28 relative z-10 scroll-mt-24">
        <PortalSectionIntro
          eyebrow="Nền tảng"
          title="Các nền tảng trong Nyxoris"
          description="Mỗi nền tảng trong Nyxoris được xây dựng cho một nhu cầu riêng, nhưng cùng chia sẻ một trải nghiệm thống nhất."
        />

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
        >
          
          {/* Card 1: Nền tảng bán hàng */}
          <motion.div 
            variants={fadeUpItem}
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col justify-between p-8 bg-card border border-border rounded-[2rem] shadow-sm hover:border-primary/20 hover:shadow-lg transition-all duration-300 min-h-[350px] group"
          >
            <div>
              <div className="flex justify-between items-start mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full group-hover:bg-primary/25 transition-all">
                  Đang hoạt động
                </span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Nền tảng bán hàng</h3>
              <p className="text-sm text-muted-foreground font-light leading-relaxed">
                Tạo cửa hàng, mời thành viên và vận hành hoạt động mua bán trong hệ sinh thái Nyxoris.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-border/40">
              <Link
                href={ACTIVE_PLATFORM_URL}
                className="w-full inline-flex items-center justify-center gap-2 bg-primary hover:opacity-90 text-primary-foreground text-xs font-bold uppercase tracking-wider py-3 rounded-xl transition-all hover:scale-102 active:scale-[0.98] group-hover:shadow-lg group-hover:shadow-primary/10"
              >
                <span>Truy cập nền tảng</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* Card 2: Nền tảng cộng đồng */}
          <motion.div 
            variants={fadeUpItem}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col justify-between p-8 bg-card border border-border rounded-[2rem] shadow-sm min-h-[350px] hover:border-border/80 transition-all duration-300"
          >
            <div>
              <div className="flex justify-between items-start mb-6">
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground border border-border">
                  <Users className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground bg-muted border border-border px-3 py-1 rounded-full">
                  Đang phát triển
                </span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Nền tảng cộng đồng</h3>
              <p className="text-sm text-muted-foreground font-light leading-relaxed">
                Kết nối, chia sẻ bài viết, theo dõi người khác và xây dựng cộng đồng riêng trong Nyxoris.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-border/40">
              <button
                disabled
                className="w-full inline-flex items-center justify-center gap-2 bg-muted text-muted-foreground text-xs font-bold uppercase tracking-wider py-3 rounded-xl cursor-not-allowed opacity-70 border border-border/40"
              >
                Đang phát triển
              </button>
            </div>
          </motion.div>

          {/* Card 3: Nền tảng xem phim */}
          <motion.div 
            variants={fadeUpItem}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col justify-between p-8 bg-card border border-border rounded-[2rem] shadow-sm min-h-[350px] hover:border-border/80 transition-all duration-300"
          >
            <div>
              <div className="flex justify-between items-start mb-6">
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground border border-border">
                  <Film className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground bg-muted border border-border px-3 py-1 rounded-full">
                  Đang phát triển
                </span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Nền tảng xem phim</h3>
              <p className="text-sm text-muted-foreground font-light leading-relaxed">
                Khám phá và thưởng thức nội dung giải trí trong cùng một trải nghiệm thống nhất.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-border/40">
              <button
                disabled
                className="w-full inline-flex items-center justify-center gap-2 bg-muted text-muted-foreground text-xs font-bold uppercase tracking-wider py-3 rounded-xl cursor-not-allowed opacity-70 border border-border/40"
              >
                Đang phát triển
              </button>
            </div>
          </motion.div>

        </motion.div>
      </section>

      {/* --- ECOSYSTEM SECTION (Alternating visual layout) --- */}
      <section id="ecosystem" className="w-full py-24 relative z-10 scroll-mt-24 bg-muted/20 border-y border-border/20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <PortalSectionIntro
            eyebrow="Hệ sinh thái"
            title="Một hệ sinh thái, nhiều trải nghiệm"
            description="Nyxoris kết nối nhiều nền tảng trong cùng một không gian số, giúp người dùng dễ dàng khám phá, truy cập và sử dụng từng dịch vụ theo nhu cầu."
          />

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
          >
            <motion.div 
              variants={fadeUpItem}
              whileHover={{ scale: 1.02, y: -2 }}
              className="p-6 bg-card border border-border rounded-2xl shadow-sm hover:shadow-md hover:border-primary/10 transition-all duration-300"
            >
              <Globe className="w-5 h-5 text-primary mb-4" />
              <h4 className="text-lg font-bold text-foreground mb-2">Cổng truy cập trung tâm</h4>
              <p className="text-xs text-muted-foreground font-light leading-relaxed">
                Người dùng có thể bắt đầu từ Nyxoris để tìm hiểu và đi đến các nền tảng phù hợp.
              </p>
            </motion.div>
            <motion.div 
              variants={fadeUpItem}
              whileHover={{ scale: 1.02, y: -2 }}
              className="p-6 bg-card border border-border rounded-2xl shadow-sm hover:shadow-md hover:border-primary/10 transition-all duration-300"
            >
              <Zap className="w-5 h-5 text-primary mb-4" />
              <h4 className="text-lg font-bold text-foreground mb-2">Trải nghiệm thống nhất</h4>
              <p className="text-xs text-muted-foreground font-light leading-relaxed">
                Các nền tảng trong Nyxoris được định hướng theo một phong cách giao diện đồng bộ và dễ sử dụng.
              </p>
            </motion.div>
            <motion.div 
              variants={fadeUpItem}
              whileHover={{ scale: 1.02, y: -2 }}
              className="p-6 bg-card border border-border rounded-2xl shadow-sm hover:shadow-md hover:border-primary/10 transition-all duration-300"
            >
              <Plus className="w-5 h-5 text-primary mb-4" />
              <h4 className="text-lg font-bold text-foreground mb-2">Mở rộng theo thời gian</h4>
              <p className="text-xs text-muted-foreground font-light leading-relaxed">
                Nyxoris được xây dựng để có thể phát triển thêm nhiều nền tảng mới trong tương lai.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- ROADMAP SECTION (Elegant timeline layout) --- */}
      <section id="roadmap" className="w-full max-w-7xl px-6 md:px-12 py-28 relative z-10 scroll-mt-24">
        <PortalSectionIntro
          eyebrow="Lộ trình"
          title="Nyxoris đang mở rộng từng bước"
          description="Từ nền tảng bán hàng đang hoạt động đến các trải nghiệm cộng đồng và giải trí đang được phát triển, Nyxoris hướng đến một hệ sinh thái số ngày càng hoàn chỉnh hơn."
        />

        <div className="relative mt-16 md:mt-24 pl-8 md:pl-0">
          {/* Central Connecting Lines for Timeline */}
          <div className="absolute top-0 bottom-0 left-2 md:left-1/2 w-0.5 bg-border/50 -translate-x-1/2" />

          <div className="flex flex-col gap-12 md:gap-16">
            
            {/* Timeline Item 1 */}
            <div className="relative flex flex-col md:flex-row md:justify-start items-start md:items-center w-full">
              {/* Dot indicator */}
              <div className="absolute left-[-24px] md:left-1/2 top-1.5 md:top-auto w-3.5 h-3.5 rounded-full bg-background border-2 border-primary -translate-x-1/2 flex items-center justify-center z-20">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
              </div>
              <motion.div 
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: -30 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="w-full md:w-[calc(50%-2rem)] p-6 bg-card border border-border rounded-2xl shadow-sm hover:border-primary/20 transition-all duration-300"
              >
                <span className="text-[9px] font-bold uppercase tracking-wider text-primary border border-primary/20 bg-primary/5 px-2.5 py-1 rounded-md block w-fit mb-3">
                  Hiện tại
                </span>
                <h4 className="text-base font-bold text-foreground mb-2">Nền tảng bán hàng</h4>
                <p className="text-xs text-muted-foreground font-light leading-relaxed">
                  Cho phép người dùng tạo cửa hàng, mời thành viên và tham gia hoạt động mua bán.
                </p>
              </motion.div>
            </div>

            {/* Timeline Item 2 */}
            <div className="relative flex flex-col md:flex-row md:justify-end items-start md:items-center w-full">
              {/* Dot indicator */}
              <div className="absolute left-[-24px] md:left-1/2 top-1.5 md:top-auto w-3.5 h-3.5 rounded-full bg-background border-2 border-border/80 -translate-x-1/2 flex items-center justify-center z-20">
                <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
              </div>
              <motion.div 
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: 30 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="w-full md:w-[calc(50%-2rem)] p-6 bg-card border border-border rounded-2xl shadow-sm hover:border-border/80 transition-all duration-300"
              >
                <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground border border-border bg-muted px-2.5 py-1 rounded-md block w-fit mb-3">
                  Đang phát triển
                </span>
                <h4 className="text-base font-bold text-foreground mb-2">Nền tảng cộng đồng</h4>
                <p className="text-xs text-muted-foreground font-light leading-relaxed">
                  Hướng đến trải nghiệm kết nối, chia sẻ và tương tác giữa người dùng.
                </p>
              </motion.div>
            </div>

            {/* Timeline Item 3 */}
            <div className="relative flex flex-col md:flex-row md:justify-start items-start md:items-center w-full">
              {/* Dot indicator */}
              <div className="absolute left-[-24px] md:left-1/2 top-1.5 md:top-auto w-3.5 h-3.5 rounded-full bg-background border-2 border-border/80 -translate-x-1/2 flex items-center justify-center z-20">
                <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
              </div>
              <motion.div 
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: -30 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="w-full md:w-[calc(50%-2rem)] p-6 bg-card border border-border rounded-2xl shadow-sm hover:border-border/80 transition-all duration-300"
              >
                <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground border border-border bg-muted px-2.5 py-1 rounded-md block w-fit mb-3">
                  Đang phát triển
                </span>
                <h4 className="text-base font-bold text-foreground mb-2">Nền tảng xem phim</h4>
                <p className="text-xs text-muted-foreground font-light leading-relaxed">
                  Hướng đến không gian giải trí nơi người dùng có thể khám phá và xem nội dung phim.
                </p>
              </motion.div>
            </div>

            {/* Timeline Item 4 */}
            <div className="relative flex flex-col md:flex-row md:justify-end items-start md:items-center w-full">
              {/* Dot indicator */}
              <div className="absolute left-[-24px] md:left-1/2 top-1.5 md:top-auto w-3.5 h-3.5 rounded-full bg-background border-2 border-border/80 -translate-x-1/2 flex items-center justify-center z-20">
                <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
              </div>
              <motion.div 
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: 30 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="w-full md:w-[calc(50%-2rem)] p-6 bg-card border border-border rounded-2xl shadow-sm hover:border-border/80 transition-all duration-300"
              >
                <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground border border-border bg-muted px-2.5 py-1 rounded-md block w-fit mb-3">
                  Tương lai
                </span>
                <h4 className="text-base font-bold text-foreground mb-2">Mở rộng hệ sinh thái</h4>
                <p className="text-xs text-muted-foreground font-light leading-relaxed">
                  Nyxoris sẽ tiếp tục phát triển thêm nhiều nền tảng mới trong cùng một trải nghiệm thống nhất.
                </p>
              </motion.div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
