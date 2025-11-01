"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Mail, Send, CheckCircle, AlertCircle, MapPin, Linkedin, Github, Twitter, Clock, Phone } from "lucide-react"

// Types for our dynamic data
interface SocialLink {
  name: string
  url: string
  icon: React.ReactNode
}

interface ContactInfo {
  email: string
  phone: string
  socialLinks: SocialLink[]
  workingHours: string
  timezone: string
}

interface FormData {
  name: string
  email: string
  message: string
  location: string
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
    location: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isLocating, setIsLocating] = useState(false)
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [currentTime, setCurrentTime] = useState<string>("")
  const [isOnline, setIsOnline] = useState<boolean>(true)

  // Dynamic contact data - can be fetched from CMS/API
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    email: "phutret@gmail.com",
    phone: "+855 97 202 1149",
    socialLinks: [
      {
        name: "LinkedIn",
        url: "https://linkedin.com/in/yourprofile",
        icon: <Linkedin size={18} />
      },
      {
        name: "GitHub",
        url: "https://github.com/yourusername",
        icon: <Github size={18} />
      },
      {
        name: "Twitter",
        url: "https://twitter.com/yourhandle",
        icon: <Twitter size={18} />
      }
    ],
    workingHours: "9:00 AM - 6:00 PM",
    timezone: "GMT+7"
  })

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', {
        hour12: true,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'Asia/Bangkok'
      }))
    }, 1000)

    // Check online status
    setIsOnline(navigator.onLine)
    window.addEventListener('online', () => setIsOnline(true))
    window.addEventListener('offline', () => setIsOnline(false))

    return () => {
      clearInterval(timer)
      window.removeEventListener('online', () => setIsOnline(true))
      window.removeEventListener('offline', () => setIsOnline(false))
    }
  }, [])

  // Load contact info from environment or API
  useEffect(() => {
    // In a real app, you might fetch this from an API
    const loadContactInfo = async () => {
      try {
        // Example of dynamic data loading
        const dynamicEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "phutret@gmail.com"
        const dynamicPhone = process.env.NEXT_PUBLIC_CONTACT_PHONE || "+855 97 202 1149"
        
        setContactInfo(prev => ({
          ...prev,
          email: dynamicEmail,
          phone: dynamicPhone,
          // You can add API calls here to fetch social links, etc.
        }))
      } catch (error) {
        console.error("Failed to load contact info:", error)
      }
    }

    loadContactInfo()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setStatusMessage({
        type: "error",
        text: "Geolocation is not supported by your browser.",
      })
      return
    }

    setIsLocating(true)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        
        // Get more location details using reverse geocoding
        fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
          .then(response => response.json())
          .then(locationData => {
            const locationString = `📍 ${locationData.city || 'Unknown City'}, ${locationData.countryName || 'Unknown Country'}`
            const coordinates = `Lat: ${latitude.toFixed(6)}, Long: ${longitude.toFixed(6)}`
            const googleMapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`
            
            setFormData({
              ...formData,
              location: `${locationString}\n${coordinates}\n🗺️ ${googleMapsLink}`,
            })
            setStatusMessage({
              type: "success",
              text: "Location captured successfully!",
            })
          })
          .catch(() => {
            // Fallback if reverse geocoding fails
            const locationString = `📍 Latitude: ${latitude.toFixed(6)}, Longitude: ${longitude.toFixed(6)}`
            const googleMapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`
            
            setFormData({
              ...formData,
              location: `${locationString}\n🗺️ ${googleMapsLink}`,
            })
          })
          .finally(() => {
            setTimeout(() => setStatusMessage(null), 3000)
            setIsLocating(false)
          })
      },
      (error) => {
        let errorMessage = "Unable to get location. Please check permissions."
        if (error.code === error.TIMEOUT) {
          errorMessage = "Location request timed out. Please try again."
        } else if (error.code === error.PERMISSION_DENIED) {
          errorMessage = "Location access denied. Please enable location permissions."
        }
        
        setStatusMessage({
          type: "error",
          text: errorMessage,
        })
        setIsLocating(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    )
  }

  const sendToTelegram = async (message: string) => {
    // Use environment variables for security
    const botToken = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN || "8543840030:AAHy6mYSev9i71WAk6mIjZsam-JHEDKsH3o"
    const chatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID || "1370528680"

    if (!botToken || !chatId) {
      console.error("Telegram bot token or chat ID missing")
      return false
    }

    try {
      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "HTML",
        }),
      })

      const data = await response.json()
      return data.ok
    } catch (error) {
      console.error("Error sending to Telegram:", error)
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isOnline) {
      setStatusMessage({
        type: "error",
        text: "You are offline. Please check your internet connection and try again.",
      })
      return
    }

    setIsLoading(true)
    setStatusMessage(null)

    try {
      // Get user's IP address and additional info
      let ipInfo = "Unknown"
      try {
        const ipResponse = await fetch('https://api.ipify.org?format=json')
        const ipData = await ipResponse.json()
        ipInfo = ipData.ip
      } catch (ipError) {
        console.log("Could not fetch IP address")
      }

      // Format the message for Telegram
      const telegramMessage = `
📧 <b>New Contact Form Submission</b>

👤 <b>Name:</b> ${formData.name}
📧 <b>Email:</b> ${formData.email}
💬 <b>Message:</b>
${formData.message}
${formData.location ? `\n📍 <b>Location:</b>\n${formData.location}` : ''}

🌐 <b>IP Address:</b> ${ipInfo}
🕒 <b>Submitted at:</b> ${new Date().toLocaleString()}
⏰ <b>Local time:</b> ${currentTime}
      `.trim()

      // Send to Telegram
      const telegramSuccess = await sendToTelegram(telegramMessage)

      if (telegramSuccess) {
        setStatusMessage({
          type: "success",
          text: "Message sent successfully to Telegram! I'll get back to you soon.",
        })
        setFormData({ name: "", email: "", message: "", location: "" })
        setTimeout(() => setStatusMessage(null), 5000)
      } else {
        setStatusMessage({
          type: "error",
          text: "Failed to send message to Telegram. Please try again or email me directly.",
        })
      }
    } catch (error) {
      setStatusMessage({
        type: "error",
        text: "Error sending message. Please check your connection and try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-accent/5 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="animate-fade-in-up text-center mb-12">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-4">Get in touch</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 text-balance">Let's Work Together</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind? I'd love to hear about it. Send me a message and I'll get back to you as soon as
            possible.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            {/* Email */}
            <div className="flex gap-4 group">
              <div className="bg-primary/10 rounded-lg p-4 h-fit group-hover:bg-primary/20 transition-colors duration-300">
                <Mail className="text-primary" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Email</h3>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {contactInfo.email}
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex gap-4 group">
              <div className="bg-primary/10 rounded-lg p-4 h-fit group-hover:bg-primary/20 transition-colors duration-300">
                <Phone className="text-primary" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Phone</h3>
                <a
                  href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {contactInfo.phone}
                </a>
              </div>
            </div>

            {/* Availability Status */}
            <div className="flex gap-4 group">
              <div className="bg-primary/10 rounded-lg p-4 h-fit group-hover:bg-primary/20 transition-colors duration-300">
                <Clock className="text-primary" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Availability</h3>
                <p className="text-muted-foreground">
                  {contactInfo.workingHours} ({contactInfo.timezone})
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Current time: {currentTime}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`} />
                  <span className="text-xs text-muted-foreground">
                    {isOnline ? 'Online' : 'Offline'}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl p-8 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-md">
              <h3 className="text-xl font-semibold text-foreground mb-4">Connect With Me</h3>
              <div className="space-y-3">
                {contactInfo.socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                    {link.icon}
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder:text-muted-foreground transition-all duration-200"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder:text-muted-foreground transition-all duration-200"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder:text-muted-foreground resize-none transition-all duration-200"
                placeholder="Tell me about your project..."
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-foreground">Location (Optional)</label>
                <button
                  type="button"
                  onClick={handleGetLocation}
                  disabled={isLocating}
                  className="text-sm px-3 py-1.5 bg-secondary hover:bg-secondary/80 text-foreground rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
                >
                  <MapPin size={16} />
                  {isLocating ? "Getting Location..." : "Send Location"}
                </button>
              </div>
              {formData.location && (
                <div className="p-3 bg-primary/10 rounded-lg text-sm text-foreground border border-primary/20 whitespace-pre-line">
                  {formData.location}
                </div>
              )}
              <p className="text-xs text-muted-foreground">
                Your location helps me provide better service and understand your timezone.
              </p>
            </div>

            {statusMessage && (
              <div
                className={`p-4 rounded-lg flex items-start gap-3 animate-fade-in ${
                  statusMessage.type === "success"
                    ? "bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900"
                    : "bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900"
                }`}
              >
                {statusMessage.type === "success" ? (
                  <CheckCircle className="text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" size={20} />
                ) : (
                  <AlertCircle className="text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" size={20} />
                )}
                <p
                  className={
                    statusMessage.type === "success"
                      ? "text-green-800 dark:text-green-300"
                      : "text-red-800 dark:text-red-300"
                  }
                >
                  {statusMessage.text}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || !isOnline}
              className="w-full px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-200 font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-primary/20 group"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Sending to Telegram...
                </>
              ) : !isOnline ? (
                "Offline - Check Connection"
              ) : (
                <>
                  Send Message 
                  <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            <p className="text-xs text-muted-foreground text-center">
              Messages are securely sent via Telegram. I typically respond within 24 hours.
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}