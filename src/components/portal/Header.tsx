"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { 
  Globe, ShoppingBag, MessageSquare, User, LogOut, LogIn
} from "lucide-react"
import { 
  HeaderLayout,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  Avatar,
  AvatarImage,
  AvatarFallback,
  UserProfileDropdown,
  UserProfileCard,
  Button
} from '@platform-system/design-ui';
import { useAuth } from "@/core/providers/AuthProvider"
import { apiClient } from "@/core/apiClient"

const portals = [
  { id: 'customer', name: 'Cổng khách hàng', url: 'https://nyxoris.com', icon: <Globe size={16} />, active: true },
  { id: 'merchant', name: 'Cổng người bán', url: 'https://merchant.nyxoris.com', icon: <ShoppingBag size={16} />, active: true },
  { id: 'community', name: 'Cổng cộng đồng', url: '#', icon: <MessageSquare size={16} />, active: false },
]

export function Header() {
  const { isAuthenticated, login, logout, token } = useAuth()
  const [scrolled, setScrolled] = useState(false)
  const [resolvedName, setResolvedName] = useState("Khách hàng")
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    let active = true
    if (!isAuthenticated) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setResolvedName("Khách hàng")
      setAvatarUrl(null)
      return
    }

    const fetchProfile = async () => {
      try {
        const response = await apiClient.get('/api/identity/users/me')
        if (response.data && response.data.success && response.data.data) {
          const data = response.data.data
          if (!active) return
          
          let name = data.displayName || data.userName || "Người dùng"
          let avatar = data.avatarUrl || null
          
          try {
            const [avatarRes, profileRes] = await Promise.allSettled([
              apiClient.get('/api/identity/users/me/images/avatar'),
              apiClient.get('/api/identity/users/me/profile')
            ])
            
            if (avatarRes.status === "fulfilled" && avatarRes.value.data && avatarRes.value.data.success && avatarRes.value.data.data?.url) {
              avatar = avatarRes.value.data.data.url
            }
            
            if (profileRes.status === "fulfilled" && profileRes.value.data && profileRes.value.data.success && profileRes.value.data.data?.displayName) {
              name = profileRes.value.data.data.displayName
            }
          } catch {
            // ignore
          }

          if (!active) return

          if (typeof window !== "undefined" && data.identityId) {
            const localAvatar = localStorage.getItem("user_avatar_" + data.identityId)
            if (localAvatar) {
              avatar = localAvatar
            }
          }

          setResolvedName(name)
          setAvatarUrl(avatar)
        }
      } catch (err) {
        console.error("Failed to load user profile in PortalUI Header:", err)
      }
    }

    fetchProfile()
    
    return () => {
      active = false
    }
  }, [isAuthenticated, token])

  return (
    <HeaderLayout
      isScrolled={scrolled}
      className="fixed z-50 w-full"
      logo={
        <Link href="/" className="flex items-center group cursor-pointer select-none">
          <span className="font-sans text-xl font-black tracking-tighter text-foreground transition-all duration-300 group-hover:text-primary">
            Nyxoris
          </span>
          <div className="h-4 w-px bg-border mx-6 hidden sm:block opacity-30" />
        </Link>
      }
      centerContent={
        <nav className="hidden md:flex items-center gap-8">
          {[
            { label: "Tổng quan", href: "#overview" },
            { label: "Nền tảng", href: "#platforms" },
            { label: "Hệ sinh thái", href: "#ecosystem" },
            { label: "Lộ trình", href: "#roadmap" },
          ].map((item) => (
            <Link 
              key={item.label} 
              href={item.href} 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors nav-link-underline"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      }
      rightActions={
        isAuthenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon-lg" className="relative rounded-full hover:bg-transparent focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 shrink-0 cursor-pointer">
                <Avatar className="size-9 transition-transform hover:scale-110 active:scale-95 shrink-0" showDropdownIndicator>
                  <AvatarImage src={avatarUrl || undefined} alt={resolvedName} className="object-cover shrink-0" />
                  <AvatarFallback className="shrink-0">
                    <User className="size-5 shrink-0" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" alignOffset={5} forceMount>
              <UserProfileDropdown
                userCard={
                  <DropdownMenuItem asChild className="cursor-pointer font-normal p-2.5 min-w-0 focus:bg-[rgb(var(--store-accent-rgb)/0.05)] focus:text-foreground w-full">
                    <a href="https://account.nyxoris.com" target="_blank" rel="noreferrer" className="w-full">
                      <UserProfileCard
                        name={resolvedName}
                        avatarSrc={avatarUrl || undefined}
                        subtext="Gói: Miễn phí"
                        showChevron={true}
                      />
                    </a>
                  </DropdownMenuItem>
                }
                menuItems={null}
                portals={portals.map((portal) => ({
                  id: portal.id,
                  name: portal.name,
                  icon: portal.icon,
                  href: portal.url,
                  active: portal.active,
                  target: portal.active ? '_blank' : undefined,
                  rel: portal.active ? 'noreferrer' : undefined,
                }))}
                currentPortalId="customer"
                logoutItem={
                  <DropdownMenuItem
                    onClick={() => logout()}
                    className="cursor-pointer w-full flex items-center text-destructive focus:bg-destructive/10 focus:text-destructive"
                  >
                    <LogOut className="mr-2 h-4 w-4 shrink-0" />
                    <span>Đăng xuất</span>
                  </DropdownMenuItem>
                }
              />
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => login()} 
            className="flex items-center gap-2 text-foreground hover:text-primary font-medium shrink-0 focus:ring-0 focus-visible:ring-0 cursor-pointer"
          >
            <LogIn className="h-4 w-4 shrink-0" />
            <span>Đăng nhập</span>
          </Button>
        )
      }
    />
  )
}

