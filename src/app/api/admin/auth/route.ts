import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action } = body

    switch (action) {
      case 'login':
        // Handle both data formats for backward compatibility
        const username = body.data?.username || body.username
        const password = body.data?.password || body.password
        
        if (!username || !password) {
          return NextResponse.json({ error: 'Username and password are required' }, { status: 400 })
        }
        
        // Find admin
        const admin = await prisma.admin.findUnique({
          where: { username }
        })

        if (!admin) {
          return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
        }

        // Verify password
        const isValid = await bcrypt.compare(password, admin.password)
        if (!isValid) {
          return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
        }

        // Generate JWT
        const token = jwt.sign(
          { adminId: admin.id, username: admin.username },
          JWT_SECRET,
          { expiresIn: '24h' }
        )

        return NextResponse.json({
          token,
          admin: {
            id: admin.id,
            username: admin.username,
            email: admin.email
          }
        })

      case 'verify':
        // Handle both data formats for backward compatibility
        const verifyToken = body.data?.token || body.token
        
        if (!verifyToken) {
          return NextResponse.json({ error: 'Token is required' }, { status: 400 })
        }
        
        try {
          const decoded = jwt.verify(verifyToken, JWT_SECRET) as any
          const admin = await prisma.admin.findUnique({
            where: { id: decoded.adminId }
          })

          if (!admin || !admin.isActive) {
            return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
          }

          return NextResponse.json({
            admin: {
              id: admin.id,
              username: admin.username,
              email: admin.email
            }
          })
        } catch (error) {
          return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
        }

      case 'createAdmin':
        // Handle both data formats for backward compatibility
        const newUsername = body.data?.username || body.username
        const email = body.data?.email || body.email
        const newPassword = body.data?.password || body.password
        
        if (!newUsername || !newPassword) {
          return NextResponse.json({ error: 'Username and password are required' }, { status: 400 })
        }
        
        // Hash password
        const hashedPassword = await bcrypt.hash(newPassword, 12)
        
        const newAdmin = await prisma.admin.create({
          data: {
            username: newUsername,
            email: email || `${newUsername}@admin.local`,
            password: hashedPassword
          }
        })

        return NextResponse.json({
          admin: {
            id: newAdmin.id,
            username: newAdmin.username,
            email: newAdmin.email
          }
        })

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }
  } catch (error) {
    console.error('Admin auth error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
