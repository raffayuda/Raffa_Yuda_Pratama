import { PrismaClient } from '../../src/generated/prisma/index'

const prisma = new PrismaClient()

async function main() {
  // Seed Projects
  const projects = await Promise.all([
    prisma.project.create({
      data: {
        title: "E-Commerce Platform",
        description: "A full-stack e-commerce platform with modern UI, payment integration, and admin dashboard. Built with Next.js, Prisma, and PostgreSQL.",
        imageUrl: "/api/placeholder/400/250",
        projectUrl: "https://ecommerce-demo.vercel.app",
        githubUrl: "https://github.com/johndoe/ecommerce",
        technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Stripe", "Tailwind CSS"],
        featured: true
      }
    }),
    prisma.project.create({
      data: {
        title: "Task Management App",
        description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
        imageUrl: "/api/placeholder/400/250",
        projectUrl: "https://taskmanager-demo.vercel.app",
        githubUrl: "https://github.com/johndoe/taskmanager",
        technologies: ["React", "Node.js", "Socket.io", "MongoDB", "Express.js"],
        featured: true
      }
    }),
    prisma.project.create({
      data: {
        title: "Learning Management System",
        description: "A comprehensive LMS with course creation, progress tracking, video streaming, and assessment tools for online education.",
        imageUrl: "/api/placeholder/400/250",
        projectUrl: "https://lms-demo.vercel.app",
        githubUrl: "https://github.com/johndoe/lms",
        technologies: ["Next.js", "Prisma", "PostgreSQL", "AWS S3", "Stripe", "TypeScript"],
        featured: true
      }
    })
  ])

  // Seed Skills
  const skills = await Promise.all([
    prisma.skill.create({
      data: {
        name: "React",
        category: "Frontend",
        level: 95,
        icon: "⚛️"
      }
    }),
    prisma.skill.create({
      data: {
        name: "Next.js",
        category: "Frontend",
        level: 90,
        icon: "🔺"
      }
    }),
    prisma.skill.create({
      data: {
        name: "TypeScript",
        category: "Frontend",
        level: 88,
        icon: "📘"
      }
    }),
    prisma.skill.create({
      data: {
        name: "Node.js",
        category: "Backend",
        level: 85,
        icon: "🟢"
      }
    }),
    prisma.skill.create({
      data: {
        name: "PostgreSQL",
        category: "Backend",
        level: 85,
        icon: "🐘"
      }
    }),
    prisma.skill.create({
      data: {
        name: "Prisma",
        category: "Backend",
        level: 88,
        icon: "🔻"
      }
    })
  ])

  // Seed Experiences
  const experiences = await Promise.all([
    prisma.experience.create({
      data: {
        company: "TechCorp Solutions",
        position: "Senior Full Stack Developer",
        description: "Leading development of enterprise web applications using React, Next.js, and Node.js. Mentoring junior developers and implementing best practices for code quality and performance optimization.",
        startDate: new Date("2022-01-01"),
        endDate: null,
        current: true,
        location: "Jakarta, Indonesia"
      }
    }),
    prisma.experience.create({
      data: {
        company: "Digital Innovations Inc",
        position: "Full Stack Developer",
        description: "Developed and maintained multiple client projects including e-commerce platforms, content management systems, and mobile applications using modern web technologies.",
        startDate: new Date("2020-03-01"),
        endDate: new Date("2021-12-31"),
        current: false,
        location: "Bandung, Indonesia"
      }
    }),
    prisma.experience.create({
      data: {
        company: "StartupHub",
        position: "Frontend Developer",
        description: "Focused on creating responsive, user-friendly interfaces for web applications. Worked closely with UI/UX designers to implement pixel-perfect designs and improve user experience.",
        startDate: new Date("2019-06-01"),
        endDate: new Date("2020-02-29"),
        current: false,
        location: "Yogyakarta, Indonesia"
      }
    })
  ])

  console.log('Database has been seeded successfully!')
  console.log('Projects created:', projects.length)
  console.log('Skills created:', skills.length)
  console.log('Experiences created:', experiences.length)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
