"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, Heart, ArrowUp } from "lucide-react"

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const currentYear = new Date().getFullYear()

  const footerLinks = {
    navigation: [
      { name: "Home", href: "#home" },
      { name: "About", href: "#about" },
      { name: "Skills", href: "#skills" },
      { name: "Projects", href: "#projects" },
      { name: "Experience", href: "#experience" },
      { name: "Contact", href: "#contact" },
    ],
    social: [
      { name: "GitHub", href: "https://github.com/johndoe", icon: Github },
      { name: "LinkedIn", href: "https://linkedin.com/in/johndoe", icon: Linkedin },
      { name: "Email", href: "mailto:john.developer@example.com", icon: Mail },
    ]
  }

  return (
    <footer className="bg-muted/50 dark:bg-muted/20 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="text-2xl font-bold gradient-text">
              Portfolio
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              A passionate full-stack developer creating beautiful, functional web applications 
              with modern technologies.
            </p>
            <div className="flex gap-3">
              {footerLinks.social.map((social) => (
                <Button key={social.name} variant="ghost" size="icon" asChild>
                  <Link 
                    href={social.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:scale-110 transition-transform"
                  >
                    <social.icon className="h-5 w-5" />
                    <span className="sr-only">{social.name}</span>
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              {footerLinks.navigation.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-semibold">Services</h3>
            <nav className="flex flex-col space-y-2">
              <span className="text-muted-foreground text-sm">Web Development</span>
              <span className="text-muted-foreground text-sm">Frontend Development</span>
              <span className="text-muted-foreground text-sm">Backend Development</span>
              <span className="text-muted-foreground text-sm">UI/UX Design</span>
              <span className="text-muted-foreground text-sm">Consulting</span>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold">Get In Touch</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Jakarta, Indonesia</p>
              <p>john.developer@example.com</p>
              <p>+62 812-3456-7890</p>
            </div>
            <Button size="sm" asChild>
              <Link href="#contact">
                Let&apos;s Work Together
              </Link>
            </Button>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>© {currentYear} John Developer. Made with</span>
            <Heart className="h-4 w-4 text-red-500 fill-current" />
            <span>using Next.js & Tailwind CSS</span>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={scrollToTop}
            className="hover:scale-110 transition-transform"
          >
            <ArrowUp className="h-4 w-4 mr-2" />
            Back to Top
          </Button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
