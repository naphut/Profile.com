import Navigation from "@/components/navigation"
import Hero from "@/components/hero"
import About from "@/components/about"
import Services from "@/components/services"
import Portfolio from "@/components/portfolio"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <>
      <Navigation />
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Contact />
      <Footer />
    </>
  )
}
