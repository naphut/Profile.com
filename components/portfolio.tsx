const portfolioItems = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "Full-stack e-commerce solution with payment integration and inventory management",
    tags: ["React", "Node.js", "MongoDB"],
    icon: "🛍️",
  },
  {
    id: 2,
    title: "Task Management App",
    description: "Collaborative task management tool with real-time updates and team collaboration",
    tags: ["Next.js", "Firebase", "Tailwind"],
    icon: "✓",
  },
  {
    id: 3,
    title: "Digital Agency Website",
    description: "Modern agency website with dynamic content management and interactive animations",
    tags: ["Next.js", "CMS", "Animation"],
    icon: "🎯",
  },
  {
    id: 4,
    title: "Mobile App UI Kit",
    description: "Comprehensive UI kit for mobile applications with design system documentation",
    tags: ["Figma", "Design System"],
    icon: "📱",
  },
]

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-20 bg-secondary/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="animate-fade-in-up">
          <div className="mb-12">
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-4">Featured work</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground text-balance">Projects I'm Proud Of</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {portfolioItems.map((item) => (
              <div
                key={item.id}
                className="group bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg cursor-pointer hover:-translate-y-1"
              >
                <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 aspect-video flex items-center justify-center overflow-hidden relative">
                  <div className="text-6xl group-hover:scale-125 transition-transform duration-300">{item.icon}</div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 text-sm">{item.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
