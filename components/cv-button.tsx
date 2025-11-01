"use client"

import { Download } from "lucide-react"

export default function CVButton() {
  const handleDownloadCV = () => {
    const link = document.createElement("a")
    link.href = "/cv/resume.pdf"
    link.download = "Resume_Your_Name.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <button
      onClick={handleDownloadCV}
      className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-200 font-semibold hover:shadow-lg hover:shadow-primary/20"
      aria-label="Download CV"
    >
      <Download size={20} />
      Download My CV
    </button>
  )
}
