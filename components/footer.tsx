"use client"

import { Github, Linkedin, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/thefcan",
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/furkankarafil",
    icon: Linkedin,
  },
  {
    name: "Instagram",
    href: "https://instagram.com/thefcan",
    icon: Instagram,
  },
]

export function Footer() {
  return (
    <footer id="contact" className="py-12 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6">
          <h2 className="text-2xl font-bold text-foreground">Get In Touch</h2>
          <p className="text-muted-foreground text-center max-w-md text-pretty">
            {"I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision."}
          </p>
          
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <Button
                key={link.name}
                variant="outline"
                size="icon"
                className="rounded-full hover:border-primary hover:text-primary transition-colors bg-transparent"
                asChild
              >
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                >
                  <link.icon className="h-5 w-5" />
                </a>
              </Button>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t border-border w-full text-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Furkan Can Karafil. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
