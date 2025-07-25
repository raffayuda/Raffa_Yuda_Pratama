import { NextApiRequest } from 'next'
import { NextApiResponseServerIO } from '@/types/socket'
import { Server as ServerIO } from 'socket.io'
import { Server as NetServer } from 'http'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function ioHandler(
  req: NextApiRequest,
  res: NextApiResponseServerIO,
) {
  if (!res.socket.server.io) {
    const path = '/api/socket'
    const httpServer = res.socket.server as unknown as NetServer
    const io = new ServerIO(httpServer, {
      path: path,
      addTrailingSlash: false,
      cors: {
        origin: process.env.NODE_ENV === 'production' ? false : ['http://localhost:3000'],
        methods: ['GET', 'POST']
      }
    })

    // Store connected users
    const connectedUsers = new Map()

    io.on('connection', (socket) => {
      console.log('New client connected:', socket.id)

      // Send current user count
      io.emit('userCount', connectedUsers.size + 1)

      socket.on('join', async ({ username, userEmail, room }) => {
        // Store user info
        connectedUsers.set(socket.id, { username, userEmail, room })
        
        // Join room
        socket.join(room)
        
        // Send welcome message
        socket.emit('message', {
          id: `system-${Date.now()}`,
          content: `Welcome to the chat, ${username}!`,
          username: 'System',
          createdAt: new Date().toISOString()
        })

        // Notify others
        socket.to(room).emit('message', {
          id: `system-${Date.now()}`,
          content: `${username} joined the chat`,
          username: 'System',
          createdAt: new Date().toISOString()
        })

        // Update user count
        io.emit('userCount', connectedUsers.size)
      })

      socket.on('sendMessage', async ({ content, username, userEmail, room }) => {
        try {
          // Save message to database
          const savedMessage = await prisma.chatMessage.create({
            data: {
              content,
              username,
              userEmail: userEmail || null,
              roomId: room
            }
          })

          // Broadcast message to room
          io.to(room).emit('message', {
            id: savedMessage.id,
            content: savedMessage.content,
            username: savedMessage.username,
            userEmail: savedMessage.userEmail,
            createdAt: savedMessage.createdAt.toISOString()
          })
        } catch (error) {
          console.error('Error saving message:', error)
          socket.emit('error', 'Failed to send message')
        }
      })

      socket.on('getRoomMessages', async (roomId) => {
        try {
          const messages = await prisma.chatMessage.findMany({
            where: { roomId },
            orderBy: { createdAt: 'asc' },
            take: 50 // Limit to last 50 messages
          })

          socket.emit('roomMessages', messages.map(msg => ({
            id: msg.id,
            content: msg.content,
            username: msg.username,
            userEmail: msg.userEmail,
            createdAt: msg.createdAt.toISOString()
          })))
        } catch (error) {
          console.error('Error fetching messages:', error)
          socket.emit('error', 'Failed to load messages')
        }
      })

      socket.on('joinRoom', (roomId) => {
        socket.join(roomId)
      })

      socket.on('leaveRoom', (roomId) => {
        socket.leave(roomId)
      })

      socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id)
        
        const user = connectedUsers.get(socket.id)
        if (user) {
          // Notify others about user leaving
          socket.to(user.room).emit('message', {
            id: `system-${Date.now()}`,
            content: `${user.username} left the chat`,
            username: 'System',
            createdAt: new Date().toISOString()
          })
          
          connectedUsers.delete(socket.id)
        }

        // Update user count
        io.emit('userCount', connectedUsers.size)
      })
    })

    res.socket.server.io = io
  }
  res.end()
}
