"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Moon, Sun, Download, Sparkles, Home, User, Briefcase, Phone, ChevronDown, Eye, Users } from "lucide-react"
import ColorSwitcher from "./color-switcher"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showColorDropdown, setShowColorDropdown] = useState(false)
  const [viewerCount, setViewerCount] = useState(0)
  const [isOnline, setIsOnline] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setIsDark(true)
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)

    // Simulate viewer count
    const initialViewers = Math.floor(Math.random() * 50) + 10
    setViewerCount(initialViewers)
    setIsOnline(true)

    // Simulate viewer count changes
    const viewerInterval = setInterval(() => {
      setViewerCount(prev => {
        const change = Math.random() > 0.5 ? 1 : -1
        const newCount = prev + change
        return Math.max(5, Math.min(80, newCount)) // Keep between 5-80
      })
    }, 5000)

    // Simulate online status changes
    const onlineInterval = setInterval(() => {
      if (Math.random() > 0.8) {
        setIsOnline(prev => !prev)
      }
    }, 10000)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearInterval(viewerInterval)
      clearInterval(onlineInterval)
    }
  }, [])

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark")
      localStorage.theme = "light"
    } else {
      document.documentElement.classList.add("dark")
      localStorage.theme = "dark"
    }
    setIsDark(!isDark)
  }

  const handleDownloadCV = () => {
    const link = document.createElement("a")
    link.href = "/cv/resume.pdf"
    link.download = "Resume_Ret_Naphut.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const navLinks = [
    { href: "#home", label: "Home", icon: Home },
    { href: "#about", label: "About", icon: User },
    { href: "#portfolio", label: "Portfolio", icon: Briefcase },
    { href: "#contact", label: "Contact", icon: Phone },
  ]

  if (!mounted) return null

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      scrolled 
        ? "bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-lg" 
        : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Animated Logo with Live Badge */}
          <div className="flex items-center gap-4">
            <Link
              href="#home"
              className="flex items-center gap-2 text-xl font-bold group animate-fade-in relative"
            >
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg">
                <Sparkles className="w-4 h-4 text-white animate-pulse" />
              </div>
              <span className="text-primary group-hover:scale-105 transition-transform duration-300">
                Naphut
              </span>
              
              {/* Live Badge */}
              <div className="absolute -top-2 -right-2 flex items-center gap-1">
                <div className={`w-2 h-2 rounded-full animate-ping ${isOnline ? 'bg-green-500' : 'bg-gray-500'}`} />
                <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-500'}`} />
              </div>
            </Link>

            {/* Viewer Count */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20 animate-fade-in">
              <Eye className="w-3 h-3 text-primary" />
              <span className="text-xs font-medium text-primary">
                <span className="animate-pulse">{viewerCount}</span> viewing now
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 animate-slide-down">
            {navLinks.map((link) => {
              const Icon = link.icon
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-2 text-foreground hover:text-primary transition-all duration-300 text-sm font-medium group relative"
                >
                  <Icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                  <span className="group-hover:translate-x-0.5 transition-transform duration-300">
                    {link.label}
                  </span>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                </a>
              )
            })}
          </div>

          {/* Desktop Controls */}
          <div className="hidden md:flex items-center gap-3 animate-slide-down">
            {/* Online Users Indicator */}
            <div className="flex items-center gap-2 px-3 py-1 bg-secondary/50 rounded-full border border-border">
              <Users className="w-3 h-3 text-green-500 animate-pulse" />
              <span className="text-xs font-medium text-foreground/70">
                {viewerCount} online
              </span>
            </div>

            <button
              onClick={handleDownloadCV}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 hover:scale-105 hover:shadow-lg transition-all duration-300 text-sm font-medium group"
            >
              <Download size={16} className="group-hover:animate-bounce" />
              Download CV
            </button>

            {/* Color Switcher with Dropdown - FIXED: Use div instead of button */}
            <div className="relative">
              {/* Changed from button to div */}
              <div
                onClick={() => setShowColorDropdown(!showColorDropdown)}
                className="flex items-center gap-1 p-2 hover:bg-secondary rounded-lg transition-all duration-300 group cursor-pointer"
              >
                <ColorSwitcher />
                <ChevronDown 
                  size={16} 
                  className={`transition-transform duration-300 ${
                    showColorDropdown ? "rotate-180" : ""
                  }`} 
                />
              </div>

              {/* Color Name Dropdown - No Border */}
              {showColorDropdown && (
                <div className="absolute right-0 top-12 mt-2 py-2 px-3 bg-card/95 backdrop-blur-xl rounded-lg shadow-xl animate-fade-in">
                  <div className="text-xs text-muted-foreground font-medium whitespace-nowrap">
                    Color Themes
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-secondary rounded-lg hover:scale-110 transition-all duration-300 group"
            >
              {isDark ? (
                <Sun size={20} className="text-amber-400 group-hover:rotate-180 transition-transform duration-500" />
              ) : (
                <Moon size={20} className="text-blue-600 group-hover:rotate-180 transition-transform duration-500" />
              )}
            </button>
          </div>

          {/* Mobile Controls */}
          <div className="flex md:hidden items-center gap-2">
            {/* Mobile Viewer Count */}
            <div className="flex items-center gap-1 px-2 py-1 bg-primary/10 rounded-full border border-primary/20">
              <Eye className="w-3 h-3 text-primary" />
              <span className="text-xs font-medium text-primary">
                {viewerCount}
              </span>
            </div>

            {/* Color Switcher with Dropdown for Mobile - FIXED: Use div instead of button */}
            <div className="relative">
              {/* Changed from button to div */}
              <div
                onClick={() => setShowColorDropdown(!showColorDropdown)}
                className="p-2 hover:bg-secondary rounded-lg transition-all duration-300 cursor-pointer"
              >
                <ColorSwitcher />
              </div>

              {/* Color Name Dropdown for Mobile - No Border */}
              {showColorDropdown && (
                <div className="absolute right-0 top-12 mt-2 py-2 px-3 bg-card/95 backdrop-blur-xl rounded-lg shadow-xl animate-fade-in z-50">
                  <div className="text-xs text-muted-foreground font-medium whitespace-nowrap">
                    Color Themes
                  </div>
                </div>
              )}
            </div>
            
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-secondary rounded-lg transition-all duration-300"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 hover:bg-secondary rounded-lg transition-all duration-300"
            >
              {isOpen ? (
                <X size={24} className="animate-spin-in" />
              ) : (
                <Menu size={24} className="animate-pulse" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-border mt-2 pt-4 animate-slide-down">
            {/* Mobile Online Status */}
            <div className="flex items-center justify-between px-4 py-2 mb-2 bg-secondary/50 rounded-lg">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`} />
                <span className="text-xs font-medium text-foreground/70">
                  {isOnline ? 'Live now' : 'Offline'}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-foreground/60">
                <Users className="w-3 h-3" />
                <span>{viewerCount} viewers</span>
              </div>
            </div>

            <div className="space-y-2">
              {navLinks.map((link, index) => {
                const Icon = link.icon
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-3 px-4 py-3 text-foreground hover:bg-secondary rounded-lg transition-all duration-300 text-base font-medium animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="flex-1">{link.label}</span>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</div>
                  </a>
                )
              })}
              <button
                onClick={() => {
                  handleDownloadCV()
                  setIsOpen(false)
                }}
                className="w-full flex items-center gap-3 px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 hover:scale-105 transition-all duration-300 text-base font-medium animate-fade-in"
                style={{ animationDelay: "400ms" }}
              >
                <Download size={18} />
                <span className="flex-1">Download CV</span>
                <div className="animate-bounce">⬇️</div>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spinIn {
          from { transform: rotate(-90deg); opacity: 0; }
          to { transform: rotate(0deg); opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
        .animate-slide-down {
          animation: slideDown 0.6s ease-out forwards;
        }
        .animate-spin-in {
          animation: spinIn 0.4s ease-out forwards;
        }
      `}</style>
    </nav>
  )
}