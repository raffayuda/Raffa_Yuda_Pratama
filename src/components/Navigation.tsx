"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Menu, X, Github, Linkedin, Mail, MessageCircle, Music } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import { LanguageToggle } from "@/components/language-toggle"

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => setIsOpen(!isOpen)

  // const navItems = [
  //   { name: t('nav.home'), href: "#home" },
  //   { name: t('nav.about'), href: "#about" },
  //   { name: t('nav.skills'), href: "#skills" },
  //   { name: t('nav.projects'), href: "#projects" },
  //   { name: t('nav.experience'), href: "#experience" },
  //   { name: t('nav.contact'), href: "#contact" },
  // ]

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? "bg-background/80 backdrop-blur-md border-b border-border shadow-sm" 
        : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold gradient-text">
            <img src="logo.png" alt="" width={50}/>
          </Link>

          {/* Desktop Navigation */}
  

          {/* Social Links & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            {/* Live Chat Button */}
            <Button variant="outline" size="sm" asChild className="hidden md:flex">
              <Link href="/chat">
                <MessageCircle className="h-4 w-4 mr-2" />
                {t('nav.liveChat')}
              </Link>
            </Button>

            {/* Music Button */}
            <Button variant="outline" size="sm" asChild className="hidden md:flex">
              <Link href="/music">
                <Music className="h-4 w-4 mr-2" />
                {t('nav.music')}
              </Link>
            </Button>

            {/* Admin Button */}
            <Button variant="ghost" size="sm" asChild className="hidden md:flex">
              <Link href="/admin">
                {t('nav.admin')}
              </Link>
            </Button>
            
            {/* Language Toggle */}
            <LanguageToggle />
            
            {/* Theme Toggle */}
            <ThemeToggle />
            
            {/* Social Links - Hidden on mobile */}
            <div className="hidden md:flex items-center space-x-3">
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://github.com/raffayuda" target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://www.linkedin.com/in/raffa-yuda-pratama/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="mailto:raffayudapratama20@gmail.com">
                  <Mail className="h-5 w-5" />
                </Link>
              </Button>
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMenu}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background/95 backdrop-blur-md rounded-lg mt-2 border border-border">
              
              {/* Mobile Live Chat Link */}
              <Link
                href="/chat"
                className="flex items-center px-3 py-2 text-foreground hover:text-primary transition-colors duration-200 font-medium"
                onClick={() => setIsOpen(false)}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                {t('nav.liveChat')}
              </Link>

              {/* Mobile Music Link */}
              <Link
                href="/music"
                className="flex items-center px-3 py-2 text-foreground hover:text-primary transition-colors duration-200 font-medium"
                onClick={() => setIsOpen(false)}
              >
                <Music className="h-4 w-4 mr-2" />
                {t('nav.music')}
              </Link>

              {/* Mobile Admin Link */}
              <Link
                href="/admin"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors duration-200 font-medium"
                onClick={() => setIsOpen(false)}
              >
                {t('nav.admin')}
              </Link>
              
              {/* Mobile Social Links */}
              <div className="flex items-center justify-center space-x-4 pt-4 border-t border-border">
                <Button variant="ghost" size="icon" asChild>
                  <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                    <Github className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <Link href="mailto:your.email@example.com">
                    <Mail className="h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation
