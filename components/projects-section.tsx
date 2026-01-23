"use client"

import { useEffect, useRef, useState } from "react"
import { Github, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

const projects = [
  {
    title: "MarketX POS System",
    description:
      "A modern Point of Sale system for retail businesses with dual registers, dark/light themes, inventory management, and analytics. Built with PHP and vanilla JavaScript.",
    tags: ["PHP", "JavaScript", "CSS", "Chart.js"],
    github: "https://github.com/thefcan/MarketX",
  },
  {
    title: "Rotaly Hotel Reservation",
    description:
      "Full-stack hotel reservation platform with Next.js, real-time Socket.IO chat, AI support, and multi-language support. Team collaboration project.",
    tags: ["TypeScript", "Next.js", "Prisma", "Socket.IO"],
    github: "https://github.com/yamandogus/Rotaly-XYZ",
    live: "https://rotaly-xyz-wvbz.vercel.app/en",
  },
  {
    title: "Movies App",
    description:
      "Modern Android movie application with MVVM architecture, Material Design 3, Navigation Component, and dark mode support.",
    tags: ["Java", "Android", "MVVM", "Material Design"],
    github: "https://github.com/thefcan/movies",
  },
  {
    title: "Quiz API",
    description:
      "Node.js REST API for quiz applications with question management, random selection, and answer validation. Clean modular code structure.",
    tags: ["Node.js", "JavaScript", "REST API", "Express"],
    github: "https://github.com/thefcan/quiz-api",
  },
  {
    title: "Security Bash Script",
    description:
      "Linux security automation script that installs essential tools (Nmap, Wireshark, John), hardens SSH, enables firewall, and restricts incoming traffic.",
    tags: ["Shell", "Linux", "Security", "Automation"],
    github: "https://github.com/thefcan/bash-script2",
  },
]

export function ProjectsSection() {
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
      id="projects"
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
            Featured Projects
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-12 rounded-full" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {projects.map((project, index) => (
              <div
                key={project.title}
                className={`group p-6 rounded-xl bg-background border border-border hover:border-primary/50 transition-all duration-300 flex flex-col ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 text-pretty">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs font-medium rounded-md bg-primary/10 text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-2 mt-auto">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 group-hover:border-primary/50 bg-transparent"
                    asChild
                  >
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      Code
                    </a>
                  </Button>
                  {"live" in project && project.live && (
                    <Button
                      size="sm"
                      className="flex-1"
                      asChild
                    >
                      <a href={project.live} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Demo
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
