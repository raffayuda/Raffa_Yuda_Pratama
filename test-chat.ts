import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function testChat() {
  try {
    // First, get available rooms
    const rooms = await prisma.chatRoom.findMany()
    console.log('Available rooms:', rooms)

    if (rooms.length > 0) {
      const firstRoom = rooms[0]
      console.log('Using room:', firstRoom.name, 'ID:', firstRoom.id)

      // Test creating a message
      const testMessage = await prisma.chatMessage.create({
        data: {
          content: "Welcome to the live chat! This is a test message.",
          username: "System",
          roomId: firstRoom.id
        }
      })

      console.log('Test message created:', testMessage)

      // Test fetching messages
      const messages = await prisma.chatMessage.findMany({
        where: { roomId: firstRoom.id },
        orderBy: { createdAt: 'desc' },
        take: 5
      })

      console.log('Recent messages:', messages)
    }

    // Test fetching rooms with message counts
    const roomsWithCount = await prisma.chatRoom.findMany({
      include: {
        _count: {
          select: { messages: true }
        }
      }
    })

    console.log('Chat rooms with message counts:', roomsWithCount)

  } catch (error) {
    console.error('Error testing chat:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testChat()
