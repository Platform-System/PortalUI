"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { 
  Globe, ShoppingBag, MessageSquare 
} from "lucide-react"
import { PlatformSwitcherMenu } from '@platform-system/design-ui';

const portals = [
  { id: 'customer', name: 'Cổng khách hàng', url: 'https://nyxoris.com', icon: <Globe size={16} />, active: true },
  { id: 'merchant', name: 'Cổng người bán', url: 'https://merchant.nyxoris.com', icon: <ShoppingBag size={16} />, active: true },
  { id: 'community', name: 'Cổng cộng đồng', url: '#', icon: <MessageSquare size={16} />, active: false },
]

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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full ${
      scrolled 
        ? 'bg-background/80 backdrop-blur-md border-b border-border/40 py-3.5 shadow-sm' 
        : 'bg-transparent py-5'
    }`}>
      <div className="w-full px-6 md:px-12 lg:px-16 flex items-center justify-between">
        {/* Left: Logo */}
        <Link href="/" className="text-xl font-serif font-black tracking-tighter text-foreground hover:opacity-70 transition-opacity">
          Nyxoris
        </Link>
        
        {/* Center: Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
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

        {/* Right: Actions (Dropdown Switcher) */}
        <div className="flex items-center gap-4">
          <PlatformSwitcherMenu
            items={portals.map((portal) => ({
              id: portal.id,
              name: portal.name,
              icon: portal.icon,
              href: portal.url,
              active: portal.active,
              target: portal.active ? "_blank" : undefined,
              rel: portal.active ? "noreferrer" : undefined,
            }))}
            currentPlatformId="portal"
          />
        </div>
      </div>
    </header>
  )
}
