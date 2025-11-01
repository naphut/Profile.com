"use client"

export default function About() {
  const skills = [
    {
      icon: "🎨",
      title: "ការរចនា",
      description: "UI/UX, ការគូររូបគំរូ, ការបង្កើតគំរូ, ការរចនាយីហោ",
      gradient: "from-purple-500/20 to-pink-500/20",
      hoverGradient: "from-purple-500/30 to-pink-500/30",
      glow: "hover:shadow-purple-500/20"
    },
    {
      icon: "💻",
      title: "ការអភិវឌ្ឍ",
      description: "React, Next.js, TypeScript, Tailwind CSS",
      gradient: "from-blue-500/20 to-cyan-500/20",
      hoverGradient: "from-blue-500/30 to-cyan-500/30",
      glow: "hover:shadow-blue-500/20"
    },
    {
      icon: "🛠️",
      title: "ឧបករណ៍",
      description: "Figma, VS Code, Git, Vercel",
      gradient: "from-green-500/20 to-emerald-500/20",
      hoverGradient: "from-green-500/30 to-emerald-500/30",
      glow: "hover:shadow-green-500/20"
    }
  ]

  return (
    <section id="about" className="py-20 bg-secondary/30 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="animate-fade-in-up">
          <div className="mb-12 text-center">
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-4">អំពីខ្ញុំ</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground text-balance">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent bg-[length:200%_200%] bg-left animate-gradient">
                About Me
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Left Column - Description */}
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                ខ្ញុំជាអ្នករចនា និងអ្នកអភិវឌ្ឍដែលមានចំណង់ចំណូលចិត្តខ្ពស់ក្នុងការបង្កើតបទពិសោធន៍ឌីជីថលដ៏ស្រស់ស្អាត និងមានមុខងារពេញលេញ។ 
                ជាមួយនឹងបទពិសោធន៍ជាង ៥ ឆ្នាំ ខ្ញុំបានធ្វើការជាមួយក្រុមហ៊ុនដែលទើបតែចាប់ផ្តើម រហូតដល់ក្រុមហ៊ុនធំៗ 
                ដើម្បីធ្វើឱ្យចក្ខុវិស័យរបស់ពួកគេក្លាយជាការពិត។
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                វិធីសាស្ត្ររបស់ខ្ញុំផ្សំរវាងការគិតរចនាដែលផ្តោតលើអ្នកប្រើប្រាស់ ជាមួយនឹងការអនុវត្តបច្ចេកទេសដ៏រឹងមាំ 
                ដែលធានាថាគម្រោងគ្រប់យ៉ាងមិនត្រឹមតែមើលទៅល្អបំផុតប៉ុណ្ណោះ ថែមទាំងដំណើរការបានល្អឥតខ្ចោះ 
                លើវេទិកាទាំងអស់ផងដែរ។
              </p>
            </div>

            {/* Right Column - Skills */}
            <div className="space-y-4">
              {skills.map((skill, index) => (
                <div 
                  key={index}
                  className={`
                    bg-card rounded-lg p-6 border border-border 
                    transition-all duration-500 cursor-default group
                    relative overflow-hidden
                    hover:scale-105 hover:shadow-2xl ${skill.glow}
                    transform-gpu
                  `}
                >
                  {/* Animated Gradient Background */}
                  <div className={`
                    absolute inset-0 bg-gradient-to-r ${skill.gradient} 
                    opacity-0 group-hover:opacity-100 
                    transition-all duration-500 ease-out
                  `} />
                  
                  {/* Glow Effect */}
                  <div className={`
                    absolute inset-0 rounded-lg 
                    group-hover:shadow-[0_0_50px_10px] ${skill.glow}
                    opacity-0 group-hover:opacity-100
                    transition-all duration-500
                  `} />

                  {/* Content */}
                  <div className="relative z-10 flex items-start gap-4">
                    <div className="text-2xl transform group-hover:scale-125 group-hover:rotate-12 transition-transform duration-500">
                      {skill.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-white transition-colors duration-300">
                        {skill.title}
                      </h3>
                      <p className="text-muted-foreground text-sm group-hover:text-white/90 transition-colors duration-300">
                        {skill.description}
                      </p>
                    </div>
                  </div>

                  {/* Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add gradient animation to global CSS or use inline styles */}
      <style jsx global>{`
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
          background-size: 200% 200%;
        }
      `}</style>
    </section>
  )
}