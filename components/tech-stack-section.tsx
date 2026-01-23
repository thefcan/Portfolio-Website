"use client"

import { useEffect, useRef, useState } from "react"

const techCategories = [
  {
    title: "Languages",
    items: ["JavaScript", "TypeScript", "Java", "PHP", "Shell"],
  },
  {
    title: "Frontend",
    items: ["Next.js", "React", "Android", "Material Design", "Tailwind CSS"],
  },
  {
    title: "Backend",
    items: ["Node.js", "Express", "Prisma", "REST API", "Socket.IO"],
  },
  {
    title: "Tools & Systems",
    items: ["Git", "Linux", "PostgreSQL", "Security Tools"],
  },
]

export function TechStackSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-24"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            Technologies
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-12 rounded-full" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {techCategories.map((category, categoryIndex) => (
              <div
                key={category.title}
                className={`transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${categoryIndex * 150}ms` }}
              >
                <h3 className="text-sm font-medium text-primary uppercase tracking-wider mb-4">
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((item, index) => (
                    <span
                      key={item}
                      className={`px-4 py-2 rounded-lg bg-card border border-border text-sm font-medium text-foreground hover:border-primary/50 hover:bg-primary/5 transition-all cursor-default ${
                        isVisible
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-95"
                      }`}
                      style={{
                        transitionDelay: `${categoryIndex * 150 + index * 50}ms`,
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
