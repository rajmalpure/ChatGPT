"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface Orb {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
}

export function FloatingOrbs() {
  const [orbs, setOrbs] = useState<Orb[]>([])

  useEffect(() => {
    const generateOrbs = () => {
      return Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 100 + 50,
        duration: Math.random() * 20 + 15,
        delay: Math.random() * 5
      }))
    }
    setOrbs(generateOrbs())
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 opacity-20">
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full blur-3xl"
          style={{
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle, 
              rgba(139, 92, 246, 0.3) 0%, 
              rgba(59, 130, 246, 0.2) 50%, 
              transparent 100%)`
          }}
          animate={{
            x: [0, 50, -50, 0],
            y: [0, -50, 50, 0],
            scale: [1, 1.2, 0.8, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )
}
