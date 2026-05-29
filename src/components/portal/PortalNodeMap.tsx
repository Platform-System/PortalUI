"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Shield, ShoppingBag, LayoutDashboard, Database, Activity, Cpu } from "lucide-react"

export interface Node {
  id: string
  label: string
  sub: string
  icon: React.ReactNode
  x: number
  y: number
  status: "active" | "inactive" | "development"
  color: string
  latency?: string
  load?: string
  href?: string
}

interface PortalNodeMapProps {
  selectedNodeId?: string
  onSelectNode?: (nodeId: string) => void
}

export function PortalNodeMap({ selectedNodeId, onSelectNode }: PortalNodeMapProps) {
  // All nodes now use the unified design system theme (indigo/violet gradients)
  const nodes: Node[] = [
    {
      id: "core",
      label: "NYXORIS CORE",
      sub: "API Gateway & Bus",
      icon: <Database className="w-6 h-6 text-indigo-400" />,
      x: 50,
      y: 50,
      status: "active",
      color: "from-indigo-400 to-indigo-600",
      latency: "1.2ms",
      load: "12%",
    },
    {
      id: "merchant",
      label: "MERCHANT SPACE",
      sub: "merchant.nyxoris.com",
      icon: <ShoppingBag className="w-5 h-5 text-indigo-400" />,
      x: 20,
      y: 25,
      status: "active",
      color: "from-indigo-400 to-indigo-600",
      latency: "14ms",
      load: "24%",
      href: "https://merchant.nyxoris.com",
    },
    {
      id: "admin",
      label: "ADMIN CENTER",
      sub: "admin.nyxoris.com",
      icon: <LayoutDashboard className="w-5 h-5 text-indigo-400" />,
      x: 80,
      y: 25,
      status: "development",
      color: "from-indigo-400 to-indigo-600",
      latency: "--",
      load: "0%",
      href: "https://admin.nyxoris.com",
    },
    {
      id: "identity",
      label: "IDENTITY SECURITY",
      sub: "Keycloak OIDC",
      icon: <Shield className="w-5 h-5 text-indigo-400" />,
      x: 20,
      y: 75,
      status: "active",
      color: "from-indigo-400 to-indigo-600",
      latency: "8ms",
      load: "4%",
    },
    {
      id: "portal",
      label: "GATEWAY PORTAL",
      sub: "Cổng Hệ Thống",
      icon: <Activity className="w-5 h-5 text-indigo-400" />,
      x: 80,
      y: 75,
      status: "active",
      color: "from-indigo-400 to-indigo-600",
      latency: "0.4ms",
      load: "1%",
    },
  ]

  // Render connections from core to other nodes using the single theme
  const connections = [
    { from: "core", to: "merchant", delay: 0 },
    { from: "core", to: "admin", delay: 1.5 },
    { from: "core", to: "identity", delay: 0.8 },
    { from: "core", to: "portal", delay: 2.2 },
  ]

  const getNodeCoords = (id: string) => {
    const node = nodes.find((n) => n.id === id)
    return node ? { x: node.x, y: node.y } : { x: 50, y: 50 }
  }

  return (
    <div className="relative w-full max-w-4xl h-[520px] mx-auto bg-zinc-950/40 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/10 overflow-hidden shadow-2xl transition-all duration-500 hover:border-indigo-500/30">
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:25px_25px] opacity-70 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.08)_0%,transparent_75%)] pointer-events-none" />

      {/* Cyber Corner Accents */}
      <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-indigo-500/30 pointer-events-none" />
      <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-indigo-500/30 pointer-events-none" />
      <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-indigo-500/30 pointer-events-none" />
      <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-indigo-500/30 pointer-events-none" />

      {/* Title HUD Overlay - Localized to Vietnamese */}
      <div className="absolute top-6 left-8 z-20 flex items-center gap-2 select-none pointer-events-none">
        <Cpu className="w-4 h-4 text-indigo-400 animate-pulse" />
        <span className="text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase">SƠ ĐỒ HỆ THỐNG // NHẤN ĐỂ KIỂM TRA</span>
      </div>

      {/* SVG Connection Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(99, 102, 241)" stopOpacity="0.1" />
            <stop offset="50%" stopColor="rgb(168, 85, 247)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="rgb(99, 102, 241)" stopOpacity="0.1" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {connections.map((conn, idx) => {
          const start = getNodeCoords(conn.from)
          const end = getNodeCoords(conn.to)
          const startX = `${start.x}%`
          const startY = `${start.y}%`
          const endX = `${end.x}%`
          const endY = `${end.y}%`

          return (
            <React.Fragment key={idx}>
              {/* Core connection track */}
              <line
                x1={startX}
                y1={startY}
                x2={endX}
                y2={endY}
                stroke="url(#lineGrad)"
                strokeWidth="1.5"
                className="transition-all duration-500"
              />

              {/* Animated data packet - strictly indigo theme */}
              <motion.line
                x1={startX}
                y1={startY}
                x2={endX}
                y2={endY}
                stroke="rgb(99, 102, 241)"
                strokeWidth="2"
                strokeDasharray="8 45"
                filter="url(#glow)"
                animate={{
                  strokeDashoffset: [-120, 120],
                }}
                transition={{
                  duration: conn.to === "admin" ? 10 : 4,
                  repeat: Infinity,
                  ease: "linear",
                  delay: conn.delay,
                }}
              />
            </React.Fragment>
          )
        })}
      </svg>

      {/* Nodes Layer */}
      <div className="absolute inset-0 w-full h-full z-10">
        {nodes.map((node) => {
          const isCore = node.id === "core"
          const isSelected = selectedNodeId === node.id

          return (
            <motion.button
              key={node.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: isSelected ? 1.08 : 1 }}
              whileHover={{ scale: isSelected ? 1.08 : 1.05 }}
              onClick={() => onSelectNode && onSelectNode(node.id)}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer focus:outline-none"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
            >
              {/* Outer Glow Ring */}
              <div
                className={`relative flex items-center justify-center rounded-full p-0.5 transition-all duration-500 bg-gradient-to-r ${node.color} ${
                  isSelected 
                    ? "w-20 h-20 ring-4 ring-indigo-500/20 shadow-2xl shadow-indigo-500/50" 
                    : isCore
                      ? "w-24 h-24 shadow-indigo-500/10 animate-[pulse_4s_infinite]"
                      : "w-16 h-16 shadow-zinc-950/50 group-hover:shadow-indigo-500/20"
                }`}
              >
                {/* Inner Dark Mask */}
                <div className="w-full h-full rounded-full bg-zinc-950 flex items-center justify-center text-white relative overflow-hidden">
                  <div className={`absolute inset-0 transition-colors duration-500 ${
                    isSelected ? "bg-white/[0.08]" : "bg-white/[0.02] group-hover:bg-white/[0.08]"
                  }`} />
                  {node.icon}
                </div>
              </div>

              {/* Node Details Label */}
              <div className={`mt-3.5 flex flex-col items-center text-center bg-zinc-950/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border transition-all duration-300 ${
                isSelected 
                  ? "border-indigo-500/60 shadow-lg shadow-indigo-500/5 translate-y-1" 
                  : "border-white/5 group-hover:border-white/20 group-hover:translate-y-0.5"
              }`}>
                <span className="text-[10px] font-extrabold tracking-wider uppercase text-white font-sans">
                  {node.label}
                </span>
                <span className="text-[8px] text-zinc-400 tracking-wider font-mono mt-0.5">
                  {node.sub}
                </span>
                {node.latency && (
                  <div className="mt-1 flex items-center gap-1.5 text-[8px] font-mono text-zinc-500">
                    <span>ĐỘ TRỄ: <span className={node.status === "active" ? "text-emerald-400" : "text-zinc-600"}>{node.latency}</span></span>
                    <span>•</span>
                    <span>TẢI: <span className={node.status === "active" ? "text-sky-400" : "text-zinc-600"}>{node.load}</span></span>
                  </div>
                )}
              </div>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
