"use client"

import { useState, useEffect } from "react"

const COLOR_THEMES = [
  {
    name: "Ocean Blue",
    primary: "oklch(0.205 0.15 259.426)",
    accent: "oklch(0.97 0.15 259.426)",
    gradient: "from-blue-500 via-cyan-500 to-sky-500",
    emoji: "🌊",
    description: "Fresh and professional"
  },
  {
    name: "Royal Purple",
    primary: "oklch(0.537 0.198 299.289)",
    accent: "oklch(0.97 0.198 299.289)",
    gradient: "from-purple-500 via-violet-500 to-fuchsia-500",
    emoji: "👑",
    description: "Creative and luxurious"
  },
  {
    name: "Blush Rose",
    primary: "oklch(0.646 0.222 41.116)",
    accent: "oklch(0.97 0.222 41.116)",
    gradient: "from-rose-500 via-pink-500 to-red-400",
    emoji: "🌹",
    description: "Warm and passionate"
  },
  {
    name: "Forest Emerald",
    primary: "oklch(0.485 0.178 167.85)",
    accent: "oklch(0.97 0.178 167.85)",
    gradient: "from-emerald-500 via-green-500 to-teal-500",
    emoji: "🌿",
    description: "Natural and balanced"
  },
  {
    name: "Sunset Amber",
    primary: "oklch(0.628 0.177 84.429)",
    accent: "oklch(0.97 0.177 84.429)",
    gradient: "from-amber-500 via-orange-500 to-yellow-500",
    emoji: "🌅",
    description: "Energetic and vibrant"
  },
  {
    name: "Cyber Pink",
    primary: "oklch(0.58 0.25 330)",
    accent: "oklch(0.97 0.25 330)",
    gradient: "from-pink-500 via-purple-500 to-blue-500",
    emoji: "💖",
    description: "Modern and bold"
  }
]

export default function ColorSwitcher() {
  const [mounted, setMounted] = useState(false)
  const [currentTheme, setCurrentTheme] = useState(0)
  const [showPalette, setShowPalette] = useState(false)
  const [isRotating, setIsRotating] = useState(false)
  const [autoRotate, setAutoRotate] = useState(false)
  const [hoveredTheme, setHoveredTheme] = useState<number | null>(null)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem("colorTheme")
    if (saved) {
      const themeIndex = Number.parseInt(saved)
      setCurrentTheme(themeIndex)
      applyTheme(themeIndex)
    } else {
      applyTheme(0)
    }
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (autoRotate) {
      interval = setInterval(() => {
        rotateTheme()
      }, 1500)
    }
    return () => clearInterval(interval)
  }, [autoRotate, currentTheme])

  const applyTheme = (index: number) => {
    const theme = COLOR_THEMES[index]
    const root = document.documentElement

    root.style.setProperty("--primary", theme.primary)
    root.style.setProperty("--accent", theme.accent)

    COLOR_THEMES.forEach((_, i) => {
      root.classList.remove("color-theme-" + i)
    })
    
    root.classList.add("color-theme-" + index)
    localStorage.setItem("colorTheme", index.toString())
  }

  const switchTheme = (index: number) => {
    setIsRotating(true)
    setCurrentTheme(index)
    applyTheme(index)
    setShowPalette(false)
    
    setTimeout(() => setIsRotating(false), 400)
  }

  const rotateTheme = () => {
    setIsRotating(true)
    const nextTheme = (currentTheme + 1) % COLOR_THEMES.length
    setCurrentTheme(nextTheme)
    applyTheme(nextTheme)
    
    setTimeout(() => setIsRotating(false), 400)
  }

  const toggleAutoRotate = () => {
    setAutoRotate(!autoRotate)
    if (!autoRotate) {
      setIsRotating(true)
      setTimeout(() => setIsRotating(false), 400)
    }
  }

  if (!mounted) return null

  return (
    <div className="relative">
      {/* Main Control Panel */}
      <div className="flex items-center gap-1 bg-card/80 backdrop-blur-lg border border-border rounded-2xl p-1 shadow-lg">
        {/* Auto Rotate Toggle */}
        <button
          onClick={toggleAutoRotate}
          className={`p-2 rounded-xl transition-all duration-500 ${
            autoRotate 
              ? `bg-gradient-to-r ${COLOR_THEMES[currentTheme].gradient} text-white shadow-lg scale-105` 
              : "hover:bg-secondary/80 text-foreground/70"
          }`}
          title={autoRotate ? "Stop color rotation" : "Auto rotate colors"}
        >
          <div className={`w-5 h-5 transition-all duration-500 ${autoRotate ? "animate-spin" : "hover:scale-110"}`}>
            {autoRotate ? "⚡" : "🔄"}
          </div>
        </button>

        {/* Color Spectrum Wheel */}
        <button
          onClick={() => setShowPalette(!showPalette)}
          className={`relative p-2 rounded-xl transition-all duration-500 group ${
            showPalette 
              ? `bg-gradient-to-r ${COLOR_THEMES[currentTheme].gradient} text-white shadow-lg` 
              : "hover:bg-secondary/80"
          }`}
          aria-label="Color theme picker"
        >
          {/* Animated Color Spectrum */}
          <div className="relative w-6 h-6">
            {/* Rotating Gradient Ring */}
            <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${COLOR_THEMES[currentTheme].gradient} ${
              isRotating ? "animate-pulse-scale" : "group-hover:animate-rotate-slow"
            }`} />
            
            {/* Center Current Color */}
            <div 
              className="absolute inset-1 rounded-full border-2 border-white/80 shadow-inner transition-all duration-500"
              style={{ backgroundColor: COLOR_THEMES[currentTheme].primary }}
            />
            
            {/* Sparkle Particles */}
            <div className={`absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full ${
              isRotating ? "animate-ping" : "opacity-0"
            }`} />
            <div className={`absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-yellow-300 rounded-full ${
              isRotating ? "animate-ping delay-300" : "opacity-0"
            }`} />
          </div>

          {/* Floating Theme Name */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-foreground text-background px-2 py-1 rounded-lg text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            {COLOR_THEMES[currentTheme].name}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-2 h-2 bg-foreground rotate-45" />
          </div>
        </button>
      </div>

      {/* Advanced Color Palette */}
      {showPalette && (
        <div className="absolute right-0 mt-3 p-4 bg-card/95 backdrop-blur-xl border border-border rounded-2xl shadow-2xl z-50 space-y-4 animate-in fade-in slide-in-from-top-5 duration-400 min-w-64">
          {/* Current Theme Preview */}
          <div className="text-center space-y-2 pb-3 border-b border-border/50">
            <div className="flex items-center justify-center gap-2">
              <span className="text-lg">{COLOR_THEMES[currentTheme].emoji}</span>
              <h3 className="font-bold text-foreground">{COLOR_THEMES[currentTheme].name}</h3>
            </div>
            <p className="text-xs text-foreground/60">{COLOR_THEMES[currentTheme].description}</p>
          </div>

          {/* Color Grid */}
          <div className="grid grid-cols-3 gap-3">
            {COLOR_THEMES.map((theme, index) => (
              <button
                key={index}
                onClick={() => switchTheme(index)}
                onMouseEnter={() => setHoveredTheme(index)}
                onMouseLeave={() => setHoveredTheme(null)}
                className={`relative group p-3 rounded-xl transition-all duration-500 ${
                  currentTheme === index 
                    ? `ring-2 ring-primary shadow-lg scale-105` 
                    : "hover:scale-110 hover:bg-secondary/50"
                } ${
                  hoveredTheme === index ? "transform-gpu" : ""
                }`}
                title={theme.name}
              >
                {/* Animated Color Orb */}
                <div className="relative">
                  <div 
                    className={`w-10 h-10 rounded-full border-2 border-foreground/20 transition-all duration-500 group-hover:border-foreground/40 ${
                      currentTheme === index ? "ring-2 ring-white" : ""
                    }`}
                    style={{ backgroundColor: theme.primary }}
                  />
                  
                  {/* Hover Gradient Aura */}
                  <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${theme.gradient} opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-md -z-10`} />
                  
                  {/* Theme Emoji */}
                  <div className="absolute -top-1 -right-1 bg-background rounded-full p-0.5 text-xs shadow-sm">
                    {theme.emoji}
                  </div>
                </div>

                {/* Selection Animation */}
                {currentTheme === index && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center animate-pulse">
                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                  </div>
                )}

                {/* Theme Info Tooltip */}
                <div className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-foreground text-background px-2 py-1 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap z-10 ${
                  hoveredTheme === index ? "scale-100" : "scale-90"
                }`}>
                  {theme.name}
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-foreground rotate-45" />
                </div>
              </button>
            ))}
          </div>

          {/* Advanced Controls */}
          <div className="space-y-3 pt-3 border-t border-border/50">
            {/* Auto Rotate Control */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-foreground">Auto Rotate</span>
                {autoRotate && (
                  <span className="text-xs px-1.5 py-0.5 bg-primary/20 text-primary rounded-full animate-pulse">
                    LIVE
                  </span>
                )}
              </div>
              <button
                onClick={toggleAutoRotate}
                className={`relative w-12 h-6 rounded-full transition-all duration-500 ${
                  autoRotate 
                    ? `bg-gradient-to-r ${COLOR_THEMES[currentTheme].gradient}` 
                    : "bg-foreground/20"
                }`}
              >
                <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-500 shadow-lg ${
                  autoRotate ? "translate-x-6" : "translate-x-0"
                }`} />
              </button>
            </div>

            {/* Theme Progress */}
            <div className="flex items-center justify-between text-xs text-foreground/60">
              <span>Theme {currentTheme + 1} of {COLOR_THEMES.length}</span>
              <span>{Math.round(((currentTheme + 1) / COLOR_THEMES.length) * 100)}%</span>
            </div>
          </div>
        </div>
      )}

      {/* Custom Advanced Animations */}
      <style jsx>{`
        @keyframes rotate-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-scale {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        .animate-rotate-slow {
          animation: rotate-slow 3s linear infinite;
        }
        .animate-pulse-scale {
          animation: pulse-scale 0.4s ease-in-out;
        }
      `}</style>
    </div>
  )
}