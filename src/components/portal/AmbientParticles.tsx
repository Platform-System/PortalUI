"use client"

import { useEffect, useRef } from "react"

export function AmbientParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    // Handle resize
    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener("resize", handleResize)

    // Check reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (mediaQuery.matches) return

    // Particle class
    class Particle {
      x!: number
      y!: number
      size!: number
      speedY!: number
      speedX!: number
      opacity!: number
      fadeSpeed!: number

      constructor() {
        this.reset()
        // Random start position
        this.y = Math.random() * height
      }

      reset() {
        this.x = Math.random() * width
        this.y = height + Math.random() * 20
        this.size = Math.random() * 2.5 + 1 // Slightly larger to be more visible
        this.speedY = -(Math.random() * 0.3 + 0.1) // Slower, more elegant
        this.speedX = (Math.random() - 0.5) * 0.1
        this.opacity = Math.random() * 0.2 + 0.05 // Lower opacity range to make them softer
        this.fadeSpeed = 0.002 + Math.random() * 0.003
      }

      update() {
        this.y += this.speedY
        this.x += this.speedX

        // Wrap around sides
        if (this.x < 0) this.x = width
        if (this.x > width) this.x = 0

        // Reset if goes off top
        if (this.y < -10) {
          this.reset()
        }
      }

      draw(c: CanvasRenderingContext2D) {
        c.beginPath()
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        c.fillStyle = `rgba(0, 0, 0, ${this.opacity})` // Black particles
        c.fill()
      }
    }

    const particleCount = Math.min(Math.floor(width / 25), 30)
    const particles: Particle[] = []
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height)

      particles.forEach((particle) => {
        particle.update()
        particle.draw(ctx)
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-20"
    />
  )
}
