"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Palette, Zap, Heart } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

const About = () => {
  const { t } = useLanguage()
  const stats = [
    { icon: Code, label: t('about.stats.projectsCompleted'), value: "50+", color: "text-blue-500" },
    { icon: Palette, label: t('about.stats.happyClients'), value: "30+", color: "text-purple-500" },
    { icon: Zap, label: t('about.stats.yearsExperience'), value: "5+", color: "text-green-500" },
    { icon: Heart, label: t('about.stats.cupsOfCoffee'), value: "∞", color: "text-red-500" },
  ]

  const values = [
    {
      title: t('about.values.cleanCode.title'),
      description: t('about.values.cleanCode.description')
    },
    {
      title: t('about.values.userCentered.title'),
      description: t('about.values.userCentered.description')
    },
    {
      title: t('about.values.continuousLearning.title'),
      description: t('about.values.continuousLearning.description')
    },
    {
      title: t('about.values.collaboration.title'),
      description: t('about.values.collaboration.description')
    }
  ]

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-background to-muted/20 dark:from-background dark:to-muted/10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('about.title').split(' ')[0]} <span className="gradient-text">{t('about.title').split(' ')[1]}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('about.subtitle')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Left side - Story */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold mb-6">{t('about.myStory')}</h3>
            <div className="space-y-4 text-muted-foreground">
              <p>
                {t('about.story1')}
              </p>
              <p>
                {t('about.story2')}
              </p>
              <p>
                {t('about.story3')}
              </p>
            </div>

            <div className="mt-6 space-y-2">
              <h4 className="font-semibold text-lg">{t('about.currentlyFocused')}</h4>
              <div className="flex flex-wrap gap-2">
                {["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS", "Framer Motion"].map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right side - Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                viewport={{ once: true }}
              >
                <Card className="text-center p-6 hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-0">
                    <stat.icon className={`h-8 w-8 mx-auto mb-3 ${stat.color}`} />
                    <div className="text-2xl font-bold mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Values section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold text-center mb-8">{t('about.whatIValue')}</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <h4 className="font-semibold mb-3">{value.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
