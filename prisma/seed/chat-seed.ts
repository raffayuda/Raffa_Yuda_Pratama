import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seedChatRooms() {
  try {
    // Create default chat rooms
    const rooms = [
      {
        name: 'General',
        description: 'General discussion and introductions'
      },
      {
        name: 'Portfolio Discussion',
        description: 'Discuss projects and portfolio feedback'
      },
      {
        name: 'Tech Talk',
        description: 'Technology discussions and programming help'
      },
      {
        name: 'Job Opportunities',
        description: 'Share job opportunities and career advice'
      }
    ]

    for (const room of rooms) {
      // Check if room exists
      const existingRoom = await prisma.chatRoom.findFirst({
        where: { name: room.name }
      })

      if (!existingRoom) {
        await prisma.chatRoom.create({
          data: room
        })
        console.log(`Created room: ${room.name}`)
      } else {
        console.log(`Room already exists: ${room.name}`)
      }
    }

    console.log('Chat rooms seeded successfully!')
  } catch (error) {
    console.error('Error seeding chat rooms:', error)
  }
}

async function main() {
  await seedChatRooms()
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
