import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Simple polling-based chat for development
export async function POST(request: NextRequest) {
  try {
    const { action, data } = await request.json()

    switch (action) {
      case 'sendMessage':
        const { content, username, userEmail, roomId, isAdmin = false } = data
        
        // Get default room if not specified
        let targetRoomId = roomId
        if (!targetRoomId) {
          const defaultRoom = await prisma.chatRoom.findFirst({
            where: { name: 'General' }
          })
          targetRoomId = defaultRoom?.id || 'unknown'
        }
        
        const message = await prisma.chatMessage.create({
          data: {
            content,
            username,
            userEmail,
            isAdmin,
            roomId: targetRoomId
          }
        })

        return NextResponse.json(message)

      case 'getMessages':
        const { roomId: getRoomId, lastMessageId } = data
        
        // Get default room if not specified
        let queryRoomId = getRoomId
        if (!queryRoomId) {
          const defaultRoom = await prisma.chatRoom.findFirst({
            where: { name: 'General' }
          })
          queryRoomId = defaultRoom?.id || 'unknown'
        }
        
        const messages = await prisma.chatMessage.findMany({
          where: { 
            roomId: queryRoomId,
            ...(lastMessageId && { 
              createdAt: { 
                gt: new Date(lastMessageId) 
              } 
            })
          },
          orderBy: { createdAt: 'asc' },
          take: 50
        })

        return NextResponse.json(messages)

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
