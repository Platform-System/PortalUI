"use client"

import * as React from "react"
import { motion } from "framer-motion"

export interface PortalEcosystemItem {
  name: string
  icon: React.ReactNode
  color: string
}

interface PortalEcosystemGridProps {
  items: PortalEcosystemItem[]
}

export function PortalEcosystemGrid({ items }: PortalEcosystemGridProps) {
  return (
    <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5">
      {items.map((item, index) => (
        <motion.div
          key={item.name}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className={`group flex cursor-default flex-col items-center gap-5 rounded-[2.5rem] border border-white/80 p-10 transition-all duration-500 hover:bg-white hover:shadow-2xl hover:shadow-indigo-500/10 ${item.color}`}
        >
          <div className="rounded-2xl bg-white p-4 text-primary shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
            {item.icon}
          </div>
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-500 transition-colors group-hover:text-slate-900">
            {item.name}
          </span>
        </motion.div>
      ))}
    </div>
  )
}
