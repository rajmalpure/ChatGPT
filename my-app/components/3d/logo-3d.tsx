"use client"

import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

export function Logo3D() {
  return (
    <motion.div
      className="relative w-20 h-20 mx-auto"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.2
      }}
    >
      {/* Outer ring */}
      <motion.div
        className="absolute inset-0 rounded-full border-4 border-primary/30"
        animate={{
          rotate: 360,
          scale: [1, 1.1, 1]
        }}
        transition={{
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }}
        style={{
          boxShadow: "0 0 40px rgba(139, 92, 246, 0.3)"
        }}
      />
      
      {/* Middle ring */}
      <motion.div
        className="absolute inset-2 rounded-full border-4 border-primary/50"
        animate={{
          rotate: -360,
          scale: [1, 0.9, 1]
        }}
        transition={{
          rotate: { duration: 15, repeat: Infinity, ease: "linear" },
          scale: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
        }}
        style={{
          boxShadow: "0 0 30px rgba(139, 92, 246, 0.4)"
        }}
      />
      
      {/* Inner circle */}
      <motion.div
        className="absolute inset-4 rounded-full bg-gradient-to-br from-primary via-purple-500 to-blue-500 flex items-center justify-center"
        animate={{
          boxShadow: [
            "0 0 20px rgba(139, 92, 246, 0.5)",
            "0 0 40px rgba(139, 92, 246, 0.8)",
            "0 0 20px rgba(139, 92, 246, 0.5)"
          ]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{
            rotate: { duration: 3, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <Sparkles className="w-6 h-6 text-white" />
        </motion.div>
      </motion.div>

      {/* Particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-primary"
          style={{
            left: "50%",
            top: "50%",
            marginLeft: -4,
            marginTop: -4
          }}
          animate={{
            x: [0, Math.cos((i * Math.PI * 2) / 6) * 40],
            y: [0, Math.sin((i * Math.PI * 2) / 6) * 40],
            opacity: [1, 0],
            scale: [1, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeOut"
          }}
        />
      ))}
    </motion.div>
  )
}
