"use client"

import { useEffect, useState } from "react"
import { ArrowRight } from "lucide-react"
import CVButton from "@/components/cv-button"
import Image from "next/image"

// Default data in Khmer
const defaultRoles = ["អ្នករចនា", "អ្នកអភិវឌ្ឍ", "អ្នកបង្កើត", "អ្នកដោះស្រាយបញ្ហា"]

interface HeroProps {
  name?: string
  welcomeText?: string
  description?: string
  imageSrc?: string
  imageAlt?: string
  roles?: string[]
  ctaText?: string
  email?: string
  socialLinks?: {
    linkedin?: string
    github?: string
    twitter?: string
  }
}

export default function Hero({ 
  name = "Ret Naphut",
  welcomeText = "សូមស្វាគមន៍មកកាន់ portfolio របស់ខ្ញុំ",
  description = "ខ្ញុំបង្កើតបទពិសោធន៍ឌីជីថលដ៏ស្រស់ស្អាត និង responsive ដែលដោះស្រាយបញ្ហាជាក់ស្តែង។ ជាមួយនឹងជំនាញក្នុងការរចនា និងការអភិវឌ្ឍ ខ្ញុំផ្តល់ជីវិតឱ្យគំរូដោយភាពជាក់លាក់ និងភាពច្នៃប្រឌិត។",
  imageSrc = "/naphut.jpg",
  imageAlt = "រូបភាពប្រវត្តិរូប",
  roles = defaultRoles,
  ctaText = "ទាក់ទងមកខ្ញុំ",
  email = "retnaphut@email.com",
  socialLinks = {
    linkedin: "#",
    github: "#",
    twitter: "#"
  }
}: HeroProps) {
  const [roleIndex, setRoleIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setIsVisible(true)
  }, [])

  useEffect(() => {
    if (roles.length > 0) {
      const interval = setInterval(() => {
        setRoleIndex((prev) => (prev + 1) % roles.length)
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [roles.length])

  const handleImageError = () => {
    setImageError(true)
  }

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <section id="home" className="relative min-h-screen flex items-center pt-16 md:pt-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-4 md:space-y-6">
              <div className="h-16 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-24 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-32 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="flex justify-center">
              <div className="w-full max-w-sm md:max-w-md aspect-square bg-gray-200 rounded-2xl animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-16 md:pt-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="absolute top-10 -right-20 md:top-20 md:-right-40 w-60 h-60 md:w-80 md:h-80 bg-primary/10 rounded-full blur-2xl md:blur-3xl animate-pulse" />
        <div
          className="absolute bottom-10 -left-20 md:bottom-20 md:-left-40 w-60 h-60 md:w-80 md:h-80 bg-accent/10 rounded-full blur-2xl md:blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Column */}
          <div className="animate-fade-in-up space-y-4 md:space-y-6 order-2 lg:order-1">
            <div className="space-y-2">
              <p className="text-primary text-xs sm:text-sm font-semibold uppercase tracking-widest text-center lg:text-left">
                {welcomeText}
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight text-balance text-center lg:text-left">
                សួស្តី, I'M
                <span className="block text-primary bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mt-2">
                  {name}
                </span>
              </h1>
            </div>

            <div className="h-16 md:h-20 flex items-center justify-center lg:justify-start">
              <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground text-center lg:text-left">
                I'm a passionate <span className="text-primary font-semibold animate-fade-in">{roles[roleIndex]}</span>
              </p>
            </div>

            {/* Introduction Section */}
            <div className="space-y-4 max-w-xl">
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed text-pretty text-center lg:text-left">
                Hi, I'm Naphut. I'm a passionate and curious learner with a strong interest in technology, programming, and web development. 
                Currently, I am a second-year student at BELTEI University, where I'm sharpening my skills and exploring new ways to build impactful projects.
              </p>
              
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed text-pretty text-center lg:text-left">
                I enjoy creating applications and websites, solving problems with code, and experimenting with innovative ideas. 
                I'm particularly interested in full-stack development, where I can combine both frontend and backend skills to deliver complete, functional solutions.
              </p>

              <div className="bg-card rounded-lg p-6 border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-3">Skills & Interests:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-medium text-primary mb-2">Programming:</h4>
                    <p className="text-muted-foreground">PHP, Laravel, JavaScript, Node.js, C#</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-primary mb-2">Frontend:</h4>
                    <p className="text-muted-foreground">React, Tailwind, HTML, CSS</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-primary mb-2">Databases:</h4>
                    <p className="text-muted-foreground">MySQL, SQL Server</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-primary mb-2">Tools & Technologies:</h4>
                    <p className="text-muted-foreground">Docker, API Integration, Automation, Puppeteer</p>
                  </div>
                  <div className="sm:col-span-2">
                    <h4 className="font-medium text-primary mb-2">Languages:</h4>
                    <p className="text-muted-foreground">English, Khmer, Chinese</p>
                  </div>
                </div>
              </div>

              <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed text-pretty text-center lg:text-left">
                I'm always excited to learn, create, and contribute to projects that challenge me and make a difference.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2 md:pt-4 justify-center lg:justify-start">
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-6 py-3 md:px-8 md:py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-200 font-semibold hover:shadow-lg hover:shadow-primary/20 text-sm md:text-base group"
              >
                {ctaText} <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
              </a>
              <CVButton />
            </div>

            {/* Social Links */}
            <div className="flex justify-center lg:justify-start gap-4 pt-4">
              <a
                href={socialLinks.linkedin}
                className="text-muted-foreground hover:text-primary transition-colors duration-200 hover:scale-110 transform"
                aria-label="LinkedIn"
              >
                <span className="text-sm">LinkedIn</span>
              </a>
              <a
                href={socialLinks.github}
                className="text-muted-foreground hover:text-primary transition-colors duration-200 hover:scale-110 transform"
                aria-label="GitHub"
              >
                <span className="text-sm">GitHub</span>
              </a>
              <a
                href={socialLinks.twitter}
                className="text-muted-foreground hover:text-primary transition-colors duration-200 hover:scale-110 transform"
                aria-label="Twitter"
              >
                <span className="text-sm">Twitter</span>
              </a>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="flex animate-slide-in-left justify-center order-1 lg:order-2 mb-8 lg:mb-0">
            <div className="relative group w-full max-w-sm md:max-w-md">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 rounded-2xl blur-2xl group-hover:blur-3xl group-hover:scale-105 transition-all duration-500" />
              
              {/* Floating Animation */}
              <div className="relative bg-card rounded-2xl p-6 sm:p-8 md:p-12 border border-border overflow-hidden group-hover:shadow-2xl group-hover:shadow-primary/20 transition-all duration-500 animate-float">
                <div className="bg-gradient-to-br from-primary/20 via-accent/10 to-primary/20 rounded-lg aspect-square flex items-center justify-center border border-border/50 overflow-hidden group-hover:from-primary/30 group-hover:to-accent/30 transition-all duration-500">
                  {!imageError ? (
                    <div className="relative w-full h-full group">
                      <Image
                        src={imageSrc}
                        alt={imageAlt}
                        fill
                        className="object-cover rounded-lg group-hover:scale-110 transition-transform duration-700"
                        onError={handleImageError}
                        priority
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      {/* Shine Effect on Hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    </div>
                  ) : (
                    <div className="text-center space-y-3 md:space-y-4 p-4">
                      <div className="text-6xl sm:text-7xl md:text-8xl">👨‍💻</div>
                      <p className="text-muted-foreground font-medium text-sm md:text-base">រូបភាពរបស់អ្នកនៅទីនេះ</p>
                    </div>
                  )}
                </div>
                
                {/* Border Glow */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/30 group-hover:shadow-[0_0_20px_5px_rgba(59,130,246,0.3)] transition-all duration-500" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }
      `}</style>
    </section>
  )
}