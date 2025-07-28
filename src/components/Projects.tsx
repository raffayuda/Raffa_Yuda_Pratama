"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, Eye } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "@/contexts/LanguageContext"

const Projects = () => {
  const { t } = useLanguage()
  const projects = [
    {
      id: 1,
      title: "Vocabulary-English",
      description: "A web application for learning English vocabulary through interactive quizzes and flashcards.",
      image: "projek1.png",
      technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS"],
      githubUrl: "https://github.com/raffayuda/vocabulary-english",
      liveUrl: "https://vocabulary-english.vercel.app/",
      featured: true
    },
    {
      id: 2,
      title: "Attendance App",
      description: "A web application for managing attendance with features like QR code scanning, real-time updates, and detailed reports.",
      image: "projek2.png",
      technologies: ["Laravel", "PHP", "Mysql", "Tailwind CSS", "Livewire"],
      githubUrl: "https://github.com/johndoe/taskmanager",
      liveUrl: null, // No live demo available
      featured: true
    },
    {
      id: 3,
      title: "Faskes",
      description: "A web application for managing health facilities with features like appointment scheduling, patient management, and billing.",
      image: "projek3.png",
      technologies: ["Laravel", "Livewire", "Tailwind CSS", "Mysql", "Filament"],
      githubUrl: "https://github.com/raffayuda/faskes-laravel",
      liveUrl: null,
      featured: false
    },
    {
      id: 4,
      title: "Portfolio Website",
      description: "A modern, responsive portfolio website with dynamic content management, contact forms, and blog functionality.",
      image: "/api/placeholder/400/250",
      technologies: ["Next.js", "Framer Motion", "Tailwind CSS", "Prisma", "PostgreSQL"],
      githubUrl: "https://github.com/johndoe/portfolio",
      liveUrl: null, // In development
      featured: false
    },
    {
      id: 5,
      title: "Quiz App",
      description: "A web application for creating and taking quizzes with features like real-time results, and analytics.",
      image: "/api/placeholder/400/250",
      technologies: ["React", "Typescript", "Node.js", "Tailwind CSS"],
      githubUrl: "https://github.com/raffayuda/quizz-app",
      liveUrl: null,
      featured: false
    },
    {
      id: 6,
      title: "Rent Car App",
      description: "A web application for managing car rentals with features like booking, payment processing, and user management.",
      image: "projek3.png",
      technologies: ["Laravel", "Alpine.js", "Tailwind CSS", "Mysql", "Filament"],
      githubUrl: "https://github.com/raffayuda/projek-uas",
      liveUrl: null, // Private project
      featured: true
    }
  ]

  const featuredProjects = projects.filter(project => project.featured)
  const otherProjects = projects.filter(project => !project.featured)

  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-muted/20 to-background dark:from-muted/10 dark:to-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('projects.title').split(' ')[0]} <span className="gradient-text">{t('projects.title').split(' ')[1]}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('projects.subtitle')}
          </p>
        </motion.div>

        {/* Featured Projects */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 group overflow-hidden">
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    width={400}
                    height={250}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex gap-4">
                      {project.liveUrl && (
                        <Button size="sm" variant="secondary" asChild>
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <Eye className="h-4 w-4 mr-2" />
                            {t('projects.viewProject')}
                          </a>
                        </Button>
                      )}
                      <Button size="sm" variant="outline" asChild>
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4 mr-2" />
                          {t('projects.viewCode')}
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {project.title}
                    {project.featured && (
                      <Badge variant="default" className="ml-2">Featured</Badge>
                    )}
                  </CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="flex gap-2">
                  {project.liveUrl ? (
                    <Button size="sm" asChild className="flex-1">
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        {t('projects.viewProject')}
                      </a>
                    </Button>
                  ) : (
                    ''
                  )}
                  <Button size="sm" variant="outline" asChild className="flex-1">
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      {t('projects.viewCode')}
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Other Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold text-center mb-8">{t('projects.otherProjects')}</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 relative min-h-[300px]">
                  <CardHeader>
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                    <CardDescription className="text-sm">
                      {project.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.technologies.length - 4}
                        </Badge>
                      )}
                    </div>
                  </CardContent>

                  <CardFooter className="flex gap-2 absolute bottom-0">
                    {project.liveUrl ? (
                      <Button size="sm" variant="outline" asChild className="flex-1">
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Demo
                        </a>
                      </Button>
                    ) : (
                      ''
                    )}
                    <Button size="sm" variant="outline" asChild className="flex-1 ">
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="h-3 w-3 mr-1" />
                        Code
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
