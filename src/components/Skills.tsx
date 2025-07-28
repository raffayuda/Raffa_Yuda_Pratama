"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/contexts/LanguageContext"

const Skills = () => {
  const { t } = useLanguage()
  
  const skillCategories = [
    {
      title: t('skills.frontend'),
      icon: "🎨",
      skills: [
        { name: "React", level: 95 },
        { name: "Next.js", level: 90 },
        { name: "TypeScript", level: 88 },
        { name: "Tailwind CSS", level: 92 },
        { name: "Framer Motion", level: 85 },
        { name: "HTML/CSS", level: 95 },
      ]
    },
    {
      title: t('skills.backend'),
      icon: "⚙️",
      skills: [
        { name: "Node.js", level: 85 },
        { name: "Express.js", level: 80 },
        { name: "Prisma", level: 88 },
        { name: "PostgreSQL", level: 85 },
        { name: "MongoDB", level: 75 },
        { name: "REST APIs", level: 90 },
      ]
    },
    {
      title: t('skills.tools'),
      icon: "🔧",
      skills: [
        { name: "Git", level: 90 },
        { name: "Docker", level: 75 },
        { name: "Vercel", level: 88 },
        { name: "AWS", level: 70 },
        { name: "Figma", level: 80 },
        { name: "Jest", level: 75 },
      ]
    }
  ]

  const technologies = [
    "PHP", "Laravel", "React", "Next.js", "Node.js",
    "Prisma", "PostgreSQL", "Tailwind CSS", "Framer Motion",
    "Git","Vercel", "Figma", "Javascript", "TypeScript", "HTML", "CSS"
  ]

  return (
    <section id="skills" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('skills.title').split(' ')[0]} <span className="gradient-text">{t('skills.title').split(' ')[1]}</span>
          </h2>
          
        </motion.div>


        {/* Technologies Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          {/* <h3 className="text-xl font-semibold mb-6">Technologies I Work With</h3> */}
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.3, 
                  delay: 0.8 + index * 0.05 
                }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
              >
                <Badge 
                  variant="secondary" 
                  className="text-sm py-2 px-4 hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                >
                  {tech}
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
