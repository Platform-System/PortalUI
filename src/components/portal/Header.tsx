"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 ${scrolled ? 'p-3 md:p-4' : 'p-6'}`}>
      <nav className={`ds-glass-card rounded-full flex items-center border shadow-2xl backdrop-blur-md transition-all duration-500 gap-4 md:gap-8 ${
        scrolled 
          ? 'px-5 py-1.5 md:px-6 md:py-2 border-border/80 bg-card/70 shadow-md scale-95' 
          : 'px-6 py-2.5 md:px-8 md:py-3 border-border/40 bg-card/45 shadow-2xl'
      }`}>
        <Link href="/" className="text-xl font-serif font-black tracking-tighter text-foreground hover:opacity-70 transition-opacity">
          Nyxoris
        </Link>
        
        <div className="hidden md:flex items-center gap-6">
          {[
            { label: "Tổng quan", href: "#overview" },
            { label: "Nền tảng", href: "#platforms" },
            { label: "Hệ sinh thái", href: "#ecosystem" },
            { label: "Lộ trình", href: "#roadmap" },
          ].map((item) => (
            <Link 
              key={item.label} 
              href={item.href} 
              className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors nav-link-underline"
            >
              {item.label}
            </Link>
          ))}
        </div>

      </nav>
    </header>
  )
}
