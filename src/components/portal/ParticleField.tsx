"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "@platform-system/design-ui/use-theme"

interface Particle {
  x: number
  y: number
  originX: number
  originY: number
  vx: number
  vy: number
  radius: number
  baseOpacity: number
  opacity: number
}

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { resolvedTheme } = useTheme()
  const mouseRef = useRef({ x: -1000, y: -1000, active: false })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let particles: Particle[] = []
    const particleCount = 50
    const interactionRadius = 140

    // Handle Resize
    const resizeCanvas = () => {
      const parent = canvas.parentElement
      if (parent) {
        canvas.width = parent.clientWidth
        canvas.height = parent.clientHeight
      }
      initParticles()
    }

    // Initialize Particles
    const initParticles = () => {
      particles = []
      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        particles.push({
          x,
          y,
          originX: x,
          originY: y,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          radius: Math.random() * 1.5 + 1.2,
          baseOpacity: Math.random() * 0.18 + 0.1,
          opacity: 0,
        })
      }
    }

    // Animation Loop
    const draw = () => {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Get accent color dynamically from document theme
      const style = getComputedStyle(document.documentElement)
      const accentRgb = style.getPropertyValue("--store-accent-rgb").trim() || "99 102 241"

      // Vẽ các hạt và tính toán vị trí mới
      particles.forEach((p) => {
        // Trôi chậm tự do
        p.originX += p.vx
        p.originY += p.vy

        // Tràn biên màn hình
        if (p.originX < 0) p.originX = canvas.width
        if (p.originX > canvas.width) p.originX = 0
        if (p.originY < 0) p.originY = canvas.height
        if (p.originY > canvas.height) p.originY = 0

        // Giá trị mục tiêu mặc định
        let targetX = p.originX
        let targetY = p.originY
        let targetOpacity = p.baseOpacity
        let targetRadius = p.radius

        // Tương tác chuột (Lực đẩy phản trọng lực - Anti-gravity Repulsion)
        if (mouseRef.current.active) {
          const dx = p.originX - mouseRef.current.x
          const dy = p.originY - mouseRef.current.y
          const dist = Math.hypot(dx, dy)

          if (dist < interactionRadius) {
            const factor = 1 - dist / interactionRadius
            const pushDistance = factor * 50 // Đẩy tối đa 50px
            
            // Tính toán góc đẩy và dịch chuyển vị trí hạt ra ngoài vùng trỏ chuột
            const angle = Math.atan2(dy, dx)
            targetX = p.originX + Math.cos(angle) * pushDistance
            targetY = p.originY + Math.sin(angle) * pushDistance
            
            // Tăng nhẹ kích thước và độ sáng hạt khi bị tác động lực đẩy
            targetOpacity = p.baseOpacity + (0.55 - p.baseOpacity) * factor
            targetRadius = p.radius + 1.0 * factor
          }
        }

        // Nội suy di chuyển hạt mượt mà
        p.x += (targetX - p.x) * 0.08
        p.y += (targetY - p.y) * 0.08
        p.opacity += (targetOpacity - p.opacity) * 0.08
        p.radius += (targetRadius - p.radius) * 0.08

        // Vẽ hạt
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${accentRgb}, ${p.opacity})`
        ctx.fill()
      })

      // Vẽ các liên kết mạng lưới (Constellation Grid) giữa các hạt gần nhau
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i]
          const p2 = particles[j]
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const dist = Math.hypot(dx, dy)

          // Nếu 2 hạt gần nhau dưới 85px, vẽ đường nối giữa chúng
          if (dist < 85) {
            const lineOpacity = (1 - dist / 85) * 0.12 // Độ mờ tỉ lệ thuận với khoảng cách
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(${accentRgb}, ${lineOpacity})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw)
    }

    // Listeners
    const parent = canvas.parentElement
    const handleMouseMove = (e: MouseEvent) => {
      if (!parent) return
      const rect = parent.getBoundingClientRect()
      // Support viewport sizing
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      }
    }

    const handleMouseLeave = () => {
      mouseRef.current.active = false
    }

    if (parent) {
      parent.addEventListener("mousemove", handleMouseMove)
      parent.addEventListener("mouseleave", handleMouseLeave)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)
    animationFrameId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", resizeCanvas)
      if (parent) {
        parent.removeEventListener("mousemove", handleMouseMove)
        parent.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [resolvedTheme])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  )
}
