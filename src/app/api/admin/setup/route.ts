// API untuk membuat admin pertama (one-time setup)
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const { username, password, email } = await request.json()
    console.log('Setup admin request:', { username, email, hasPassword: !!password })

    if (!username || !password) {
      console.log('Missing username or password')
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      )
    }

    // Check if any admin already exists
    console.log('Checking for existing admin...')
    const existingAdmin = await prisma.admin.findFirst()
    console.log('Existing admin found:', !!existingAdmin)
    if (existingAdmin) {
      return NextResponse.json(
        { error: 'Admin sudah ada. Gunakan login admin.' },
        { status: 409 }
      )
    }

    // Hash password
    console.log('Hashing password...')
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create first admin
    console.log('Creating admin with data:', { username, email: email || `${username}@admin.local` })
    const admin = await prisma.admin.create({
      data: {
        username,
        password: hashedPassword,
        email: email || `${username}@admin.local`, // Default email if not provided
      },
    })
    console.log('Admin created successfully:', admin.id)

    return NextResponse.json({ 
      message: 'Admin pertama berhasil dibuat',
      adminId: admin.id 
    })

  } catch (error) {
    console.error('Setup admin error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat membuat admin' },
      { status: 500 }
    )
  }
}
