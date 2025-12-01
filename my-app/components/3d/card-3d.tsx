"use client"

import { useSpring, animated } from "@react-spring/web"
import { useGesture } from "@use-gesture/react"
import React, { useRef } from "react"

interface Card3DProps {
  children: React.ReactNode
  className?: string
  intensity?: number
}

export function Card3D({ children, className = "", intensity = 15 }: Card3DProps) {
  const ref = useRef<HTMLDivElement>(null)

  const [{ rotateX, rotateY, scale }, api] = useSpring(() => ({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    config: { mass: 1, tension: 170, friction: 26 }
  }))

  useGesture(
    {
      onMove: ({ xy: [px, py] }) => {
        if (!ref.current) return
        const rect = ref.current.getBoundingClientRect()
        const x = px - rect.left - rect.width / 2
        const y = py - rect.top - rect.height / 2
        
        api.start({
          rotateY: (x / rect.width) * intensity,
          rotateX: -(y / rect.height) * intensity,
          scale: 1.02
        })
      },
      onHover: ({ hovering }) => {
        if (!hovering) {
          api.start({ rotateX: 0, rotateY: 0, scale: 1 })
        }
      }
    },
    { target: ref }
  )

  return (
    <animated.div
      ref={ref}
      className={className}
      style={{
        transform: rotateX.to(
          (rx) => `perspective(1000px) rotateX(${rx}deg) rotateY(${rotateY.get()}deg) scale(${scale.get()})`
        ),
        transformStyle: "preserve-3d",
        willChange: "transform"
      }}
    >
      {children}
    </animated.div>
  )
}
