import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { SkillsSection } from "@/components/skills-section"
import { ProjectsSection } from "@/components/projects-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-ink">
      <Header />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <Footer />
    </main>
  )
}
