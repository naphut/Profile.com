import { Code, Palette, Smartphone } from "lucide-react"

const services = [
  {
    icon: Palette,
    title: "UI/UX Design",
    description:
      "Creating beautiful and intuitive interfaces that users love to interact with. I focus on usability and aesthetic excellence.",
  },
  {
    icon: Code,
    title: "Web Development",
    description:
      "Building responsive, fast, and scalable web applications with modern technologies and best practices.",
  },
  {
    icon: Smartphone,
    title: "Responsive Design",
    description: "Ensuring your website looks perfect and functions flawlessly on all devices and screen sizes.",
  },
]

export default function Services() {
  return (
    <section id="services" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-accent/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="animate-fade-in-up">
          <div className="mb-12">
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-4">What I do</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground text-balance">Services I Offer</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <div
                  key={index}
                  className="group bg-card rounded-xl p-8 border border-border hover:border-primary/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="bg-primary/10 rounded-lg p-4 w-fit mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                    <Icon className="text-primary group-hover:scale-110 transition-transform duration-300" size={32} />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
