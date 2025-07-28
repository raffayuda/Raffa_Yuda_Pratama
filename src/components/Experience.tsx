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
      company: "IO Work",
      position: "Junior Web Developer",
      location: "Bogor, Indonesia",
      startDate: "Mei 2023",
      endDate: "August 2023",
      current: false,
      description: "Creating a simple company profile project using the CodeIgniter framework with team collaboration.",
      achievements: [
        "work together with the team to create a company profile project",
        "Successfully delivered the project on time",
        "Improved team collaboration and communication skills",
        "Learned to use the CodeIgniter framework effectively"
      ],
      technologies: ["React", "PHP", "CodeIgniter", "Bootstrap", "JavaScript"]
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
              <div className="absolute left-6 top-10 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-md" />

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

        
      </div>
    </section>
  )
}

export default Experience
