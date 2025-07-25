"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Building } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

const Experience = () => {
  const { t } = useLanguage()
  const experiences = [
    {
      id: 1,
      company: "TechCorp Solutions",
      position: "Senior Full Stack Developer",
      location: "Jakarta, Indonesia",
      startDate: "Jan 2022",
      endDate: "Present",
      current: true,
      description: "Leading development of enterprise web applications using React, Next.js, and Node.js. Mentoring junior developers and implementing best practices for code quality and performance optimization.",
      achievements: [
        "Improved application performance by 40% through code optimization",
        "Led a team of 5 developers on multiple projects",
        "Implemented CI/CD pipelines reducing deployment time by 60%",
        "Architected microservices infrastructure serving 100k+ users"
      ],
      technologies: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "AWS", "Docker"]
    },
    {
      id: 2,
      company: "Digital Innovations Inc",
      position: "Full Stack Developer",
      location: "Bandung, Indonesia",
      startDate: "Mar 2020",
      endDate: "Dec 2021",
      current: false,
      description: "Developed and maintained multiple client projects including e-commerce platforms, content management systems, and mobile applications using modern web technologies.",
      achievements: [
        "Built 15+ successful web applications for various clients",
        "Reduced bug reports by 50% through implementation of testing",
        "Collaborated with design team to improve UX across projects",
        "Mentored 3 junior developers and conducted code reviews"
      ],
      technologies: ["React", "Vue.js", "Express.js", "MongoDB", "Firebase", "Tailwind CSS"]
    },
    {
      id: 3,
      company: "StartupHub",
      position: "Frontend Developer",
      location: "Yogyakarta, Indonesia",
      startDate: "Jun 2019",
      endDate: "Feb 2020",
      current: false,
      description: "Focused on creating responsive, user-friendly interfaces for web applications. Worked closely with UI/UX designers to implement pixel-perfect designs and improve user experience.",
      achievements: [
        "Converted 20+ Figma designs to responsive React components",
        "Improved website loading speed by 35% through optimization",
        "Implemented accessibility features following WCAG guidelines",
        "Created reusable component library used across projects"
      ],
      technologies: ["React", "JavaScript", "HTML/CSS", "SASS", "Bootstrap", "jQuery"]
    },
    {
      id: 4,
      company: "Freelance",
      position: "Web Developer",
      location: "Remote",
      startDate: "Jan 2019",
      endDate: "May 2019",
      current: false,
      description: "Provided web development services to small businesses and startups. Created custom websites, landing pages, and simple web applications tailored to client needs.",
      achievements: [
        "Completed 10+ freelance projects with 5-star ratings",
        "Delivered all projects on time and within budget",
        "Established long-term relationships with 3 recurring clients",
        "Learned project management and client communication skills"
      ],
      technologies: ["HTML", "CSS", "JavaScript", "WordPress", "PHP", "MySQL"]
    }
  ]

  return (
    <section id="experience" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('experience.title').split(' ')[0]} <span className="gradient-text">{t('experience.title').split(' ')[1]}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('experience.subtitle')}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Timeline line */}
              {index !== experiences.length - 1 && (
                <div className="absolute left-8 top-24 w-0.5 h-full bg-border -z-10" />
              )}
              
              {/* Timeline dot */}
              <div className="absolute left-6 top-8 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-md" />

              <Card className="ml-16 mb-8 hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <CardTitle className="text-xl">{experience.position}</CardTitle>
                      <div className="flex items-center gap-2 text-primary font-semibold">
                        <Building className="h-4 w-4" />
                        {experience.company}
                      </div>
                    </div>
                    {experience.current && (
                      <Badge variant="default" className="w-fit">
                        {t('experience.present')}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {experience.startDate} - {experience.endDate}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {experience.location}
                    </div>
                  </div>
                  
                  <CardDescription className="text-base">
                    {experience.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Achievements */}
                  <div>
                    <h4 className="font-semibold mb-2">{t('experience.achievements')}:</h4>
                    <ul className="space-y-1">
                      {experience.achievements.map((achievement, achievementIndex) => (
                        <li key={achievementIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-primary mt-1.5">•</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h4 className="font-semibold mb-2">Technologies Used:</h4>
                    <div className="flex flex-wrap gap-2">
                      {experience.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-4">
            Want to know more about my professional journey?
          </p>
          <a 
            href="/resume.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
          >
            Download Full Resume
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default Experience
