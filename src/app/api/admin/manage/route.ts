import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

// Verify admin token
async function verifyAdmin(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }

  const token = authHeader.substring(7)
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any
    const admin = await prisma.admin.findUnique({
      where: { id: decoded.adminId }
    })
    return admin?.isActive ? admin : null
  } catch (error) {
    return null
  }
}

export async function POST(request: NextRequest) {
  try {
    const admin = await verifyAdmin(request)
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { action, data } = await request.json()

    switch (action) {
      case 'deleteMessage':
        const { messageId } = data
        
        await prisma.chatMessage.delete({
          where: { id: messageId }
        })

        return NextResponse.json({ success: true })

      case 'createRoom':
        const { name, description } = data
        
        const newRoom = await prisma.chatRoom.create({
          data: { name, description }
        })

        return NextResponse.json(newRoom)

      case 'updateRoom':
        const { roomId, name: newName, description: newDescription } = data
        
        const updatedRoom = await prisma.chatRoom.update({
          where: { id: roomId },
          data: { 
            name: newName, 
            description: newDescription 
          }
        })

        return NextResponse.json(updatedRoom)

      case 'deleteRoom':
        const { roomId: deleteRoomId } = data
        
        // Delete room and all its messages (cascade)
        await prisma.chatRoom.delete({
          where: { id: deleteRoomId }
        })

        return NextResponse.json({ success: true })

      case 'getAllMessages':
        const { roomId: getRoomId, limit = 100 } = data
        
        const messages = await prisma.chatMessage.findMany({
          where: getRoomId ? { roomId: getRoomId } : {},
          orderBy: { createdAt: 'desc' },
          take: limit
        })

        return NextResponse.json(messages.reverse())

      case 'sendAdminMessage':
        const { content, roomId: adminRoomId } = data
        
        const adminMessage = await prisma.chatMessage.create({
          data: {
            content,
            username: admin.username,
            userEmail: admin.email,
            isAdmin: true,
            roomId: adminRoomId
          }
        })

        return NextResponse.json(adminMessage)

      case 'getRoomStats':
        const rooms = await prisma.chatRoom.findMany({
          include: {
            _count: {
              select: { messages: true }
            }
          }
        })

        const totalMessages = await prisma.chatMessage.count()
        const todayMessages = await prisma.chatMessage.count({
          where: {
            createdAt: {
              gte: new Date(new Date().setHours(0, 0, 0, 0))
            }
          }
        })

        return NextResponse.json({
          rooms,
          totalMessages,
          todayMessages
        })

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }
  } catch (error) {
    console.error('Admin management error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
