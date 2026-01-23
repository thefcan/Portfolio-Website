"use client"

import { useEffect, useRef, useState } from "react"
import { Code2, Smartphone, Shield, Globe } from "lucide-react"

const highlights = [
  {
    icon: Code2,
    title: "Full Stack Development",
    description: "Building web applications with PHP, JavaScript, Node.js and modern frameworks",
  },
  {
    icon: Smartphone,
    title: "Android Development",
    description: "Creating mobile apps with Java and modern Android architecture",
  },
  {
    icon: Shield,
    title: "Security & DevOps",
    description: "Linux security hardening, automation scripts, and system administration",
  },
  {
    icon: Globe,
    title: "Team Projects",
    description: "Contributing to collaborative projects like hotel reservation systems",
  },
]

export function AboutSection() {
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
      id="about"
      ref={sectionRef}
      className="py-24 bg-card"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            About Me
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8 rounded-full" />
          
          <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12 text-pretty">
            Computer Engineering student at KFAU in Turkiye. Interested in writing code and constantly learning new technologies. 
            My projects range from POS systems to Android apps, API development to security automation.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {highlights.map((item, index) => (
              <div
                key={item.title}
                className={`p-6 rounded-xl bg-background border border-border hover:border-primary/50 transition-all duration-300 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
