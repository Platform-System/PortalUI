"use client"

import * as React from "react"
import { motion } from "framer-motion"

interface PortalSectionIntroProps {
  eyebrow: string
  title: string
  description: string
}

export function PortalSectionIntro({ eyebrow, title, description }: PortalSectionIntroProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-24"
    >
      <h3 className="mb-6 text-[11px] font-bold uppercase tracking-[0.5em] text-primary italic opacity-70">
        {eyebrow}
      </h3>
      <h2 className="mb-8 font-serif text-5xl font-bold tracking-tight text-foreground md:text-6xl">
        {title}
      </h2>
      <p className="mx-auto max-w-2xl text-lg font-light text-muted-foreground">
        {description}
      </p>
    </motion.div>
  )
}
