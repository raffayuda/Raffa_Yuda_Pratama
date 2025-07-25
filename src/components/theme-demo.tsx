"use client"

import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeDemo() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <motion.div
      className="fixed bottom-4 right-4 z-50 opacity-0 pointer-events-none"
      animate={{ 
        opacity: theme === "dark" ? 1 : 0,
        scale: theme === "dark" ? 1 : 0.8
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
        🌙 Dark Mode Active
      </div>
    </motion.div>
  )
}
