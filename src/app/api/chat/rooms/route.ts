import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    console.log('API: Fetching chat rooms...')
    const rooms = await prisma.chatRoom.findMany({
      where: { isActive: true },
      include: {
        _count: {
          select: { messages: true }
        }
      },
      orderBy: { createdAt: 'asc' }
    })

    console.log('API: Found rooms:', rooms.length)
    console.log('API: Rooms data:', rooms.map(r => ({ id: r.id, name: r.name, isActive: r.isActive })))

    const roomsWithCount = rooms.map(room => ({
      id: room.id,
      name: room.name,
      description: room.description,
      isActive: room.isActive,
      messageCount: room._count.messages
    }))

    console.log('API: Returning rooms:', roomsWithCount)
    return NextResponse.json(roomsWithCount)
  } catch (error) {
    console.error('Error fetching chat rooms:', error)
    return NextResponse.json({ error: 'Failed to fetch chat rooms' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, description } = await request.json()

    const room = await prisma.chatRoom.create({
      data: {
        name,
        description
      }
    })

    return NextResponse.json(room)
  } catch (error) {
    console.error('Error creating chat room:', error)
    return NextResponse.json({ error: 'Failed to create chat room' }, { status: 500 })
  }
}
