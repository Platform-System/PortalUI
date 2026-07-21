"use client"

import * as React from "react"
import { motion } from "framer-motion"
import Link from "next/link"

interface PortalCardProps {
  href: string
  title: string
  subtitle: string
  description: string
  statusLabel: string
  statusTone: "online" | "upcoming"
  ctaLabel: string
  ctaIcon: React.ReactNode
  decorativeVisual: React.ReactNode
  footerVisual: React.ReactNode
  motionFrom: "left" | "right"
}

export function PortalCard({
  href,
  title,
  subtitle,
  description,
  statusLabel,
  statusTone,
  ctaLabel,
  ctaIcon,
  decorativeVisual,
  footerVisual,
  motionFrom,
}: PortalCardProps) {
  const statusClasses =
    statusTone === "online"
      ? {
          dot: "bg-foreground animate-pulse",
          text: "text-foreground/55",
        }
      : {
          dot: "bg-border",
          text: "text-muted-foreground",
        }

  return (
    <motion.div
      initial={{ opacity: 0, x: motionFrom === "left" ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={href} className="group relative block h-[580px]">
        <div className="ds-glass-card ds-glass-card-hover relative flex h-full flex-col overflow-hidden rounded-[3.5rem] border-white/50 p-12">
          {decorativeVisual}

          <div className="relative z-10 mb-10">
            <div className="mb-6 flex items-center gap-3">
              <div className={`h-2 w-2 rounded-full ${statusClasses.dot}`} />
              <span className={`text-[10px] font-bold uppercase tracking-[0.4em] ${statusClasses.text}`}>
                {statusLabel}
              </span>
            </div>
            <h2 className="mb-4 font-serif text-5xl font-bold tracking-tight text-foreground">{title}</h2>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] italic text-primary opacity-80">
              {subtitle}
            </p>
          </div>

          <p className="relative z-10 max-w-sm flex-1 text-lg font-light leading-relaxed text-muted-foreground">
            {description}
          </p>

          <div className="relative z-10 mt-12 flex items-end justify-between">
            {footerVisual}

            <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-foreground transition-all duration-700 group-hover:gap-6">
              <span>{ctaLabel}</span>
              {ctaIcon}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
