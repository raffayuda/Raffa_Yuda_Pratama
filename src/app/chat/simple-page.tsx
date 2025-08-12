"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Send, Users, MessageCircle, ArrowLeft, RefreshCw, LogOut, Shield, Trash2 } from "lucide-react"
import Link from "next/link"
import toast, { Toaster } from 'react-hot-toast'
import Cookies from 'js-cookie'

interface Message {
  id: string
  content: string
  username: string
  userEmail?: string
  createdAt: string
  isAdmin?: boolean
}

interface ChatRoom {
  id: string
  name: string
  description?: string
  isActive: boolean
  messageCount?: number
}

export default function SimpleChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [username, setUsername] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [isJoined, setIsJoined] = useState(false)
  const [activeRoom, setActiveRoom] = useState<string>("")
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())
  const [isAdmin, setIsAdmin] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const pollingRef = useRef<NodeJS.Timeout | null>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Load user data from localStorage on component mount
  useEffect(() => {
    const savedUsername = localStorage.getItem('chat-username')
    const savedUserEmail = localStorage.getItem('chat-user-email')
    const savedIsJoined = localStorage.getItem('chat-is-joined')
    const savedActiveRoom = localStorage.getItem('chat-active-room')

    if (savedUsername) {
      setUsername(savedUsername)
    }
    if (savedUserEmail) {
      setUserEmail(savedUserEmail)
    }
    if (savedActiveRoom) {
      setActiveRoom(savedActiveRoom)
    }
    if (savedIsJoined === 'true' && savedUsername) {
      setIsJoined(true)
      // Check admin status if logged in
      checkAdminStatus()
    }
  }, [])

  // Check if user is admin
  const checkAdminStatus = async () => {
    const token = Cookies.get('admin-token')
    if (token) {
      try {
        const response = await fetch('/api/admin/auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ action: 'verify', token }),
        })

        if (response.ok) {
          setIsAdmin(true)
          toast.success('Masuk sebagai admin!')
        }
      } catch (error) {
        console.error('Admin verification failed:', error)
      }
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    fetchChatRooms()
  }, [])

  useEffect(() => {
    if (isJoined && activeRoom) {
      startPolling()
      return () => {
        if (pollingRef.current) {
          clearInterval(pollingRef.current)
        }
      }
    }
  }, [isJoined, activeRoom])

  const fetchChatRooms = async () => {
    try {
      const response = await fetch('/api/chat/rooms')
      if (response.ok) {
        const rooms = await response.json()
        setChatRooms(rooms)
        // Set first room as default only if no room is selected and no saved room
        const savedRoom = localStorage.getItem('chat-active-room')
        if (rooms.length > 0 && !activeRoom && !savedRoom) {
          setActiveRoom(rooms[0].id)
          localStorage.setItem('chat-active-room', rooms[0].id)
        } else if (savedRoom && rooms.some((room: ChatRoom) => room.id === savedRoom)) {
          // Verify saved room still exists
          setActiveRoom(savedRoom)
        } else if (rooms.length > 0 && savedRoom && !rooms.some((room: ChatRoom) => room.id === savedRoom)) {
          // Saved room doesn't exist anymore, use first room
          setActiveRoom(rooms[0].id)
          localStorage.setItem('chat-active-room', rooms[0].id)
        }
      }
    } catch (error) {
      console.error('Error fetching chat rooms:', error)
    }
  }

  const startPolling = () => {
    // Initial load
    fetchMessages()
    
    // Poll every 2 seconds
    pollingRef.current = setInterval(() => {
      fetchMessages()
    }, 2000)
  }

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'getMessages',
          data: { roomId: activeRoom }
        })
      })

      if (response.ok) {
        const newMessages = await response.json()
        setMessages(newMessages)
        setLastUpdate(new Date())
      }
    } catch (error) {
      console.error('Error fetching messages:', error)
    }
  }

  const joinChat = () => {
    if (username.trim()) {
      // Save user data to localStorage
      localStorage.setItem('chat-username', username)
      localStorage.setItem('chat-user-email', userEmail)
      localStorage.setItem('chat-is-joined', 'true')
      
      setIsJoined(true)
      
      // Check admin status after joining
      checkAdminStatus()
      
      toast.success(`Welcome ${username}! You've joined the chat.`)
    }
  }

  const leaveChat = () => {
    // Clear polling
    if (pollingRef.current) {
      clearInterval(pollingRef.current)
    }
    
    // Clear localStorage
    localStorage.removeItem('chat-username')
    localStorage.removeItem('chat-user-email')
    localStorage.removeItem('chat-is-joined')
    localStorage.removeItem('chat-active-room')
    
    // Reset state
    setIsJoined(false)
    setIsAdmin(false)
    setMessages([])
    setNewMessage("")
    setActiveRoom("")
    
    toast.success('You have left the chat. See you next time!')
  }

  const sendMessage = async () => {
    if (newMessage.trim() && isJoined) {
      setIsLoading(true)
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'sendMessage',
            data: {
              content: newMessage,
              username,
              userEmail,
              roomId: activeRoom,
              isAdmin: isAdmin
            }
          })
        })

        if (response.ok) {
          setNewMessage("")
          // Immediately refresh messages
          fetchMessages()
        }
      } catch (error) {
        console.error('Error sending message:', error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const switchRoom = (roomId: string) => {
    const roomName = chatRooms.find(room => room.id === roomId)?.name
    setActiveRoom(roomId)
    setMessages([])
    // Save selected room to localStorage
    localStorage.setItem('chat-active-room', roomId)
    toast.success(`Switched to ${roomName} room`)
    // Polling will automatically start fetching new room messages
  }

  const deleteMessage = async (messageId: string) => {
    if (!isAdmin) {
      toast.error('Hanya admin yang dapat menghapus pesan')
      return
    }

    try {
      const token = Cookies.get('admin-token')
      const response = await fetch('/api/admin/manage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'deleteMessage',
          token,
          messageId,
        }),
      })

      if (response.ok) {
        toast.success('Pesan berhasil dihapus')
        fetchMessages() // Refresh messages
      } else {
        const data = await response.json()
        toast.error(data.error || 'Gagal menghapus pesan')
      }
    } catch (error) {
      console.error('Delete message error:', error)
      toast.error('Terjadi kesalahan saat menghapus pesan')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (!isJoined) {
        joinChat()
      } else {
        sendMessage()
      }
    }
  }

  if (!isJoined) {
    const isReturningUser = typeof window !== 'undefined' ? localStorage.getItem('chat-username') : null
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4 transition-colors duration-300">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {isReturningUser ? 'Welcome Back!' : 'Join Live Chat'}
              </CardTitle>
              <p className="text-gray-600 dark:text-gray-300">
                {isReturningUser 
                  ? 'Good to see you again! Ready to continue chatting?' 
                  : 'Long Teks bareng Bang Boday'
                }
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                   Nama Tampilan*
                </label>
                <Input
                  placeholder="Masukkan nama Anda"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="border-gray-200 dark:border-gray-600"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email (Opsional)
                </label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="border-gray-200 dark:border-gray-600"
                />
              </div>

              <Button 
                onClick={joinChat} 
                disabled={!username.trim()}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                {isReturningUser ? 'Continue Chatting' : 'Join Chat'}
              </Button>

              <div className="text-center">
                <Link href="/" className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 inline-flex items-center gap-1">
                  <ArrowLeft className="w-3 h-3" />
                  Back to Portfolio
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <Toaster 
          position="top-right"
          toastOptions={{
            className: 'dark:bg-gray-800 dark:text-white',
            duration: 3000,
          }}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="container mx-auto h-[100%] flex flex-col lg:flex-row gap-4 p-4">
        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full lg:w-80 space-y-4"
        >
          {/* Header */}
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-blue-500" />
                  Live Chat
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={leaveChat} title="Leave Chat">
                    <LogOut className="w-4 h-4" />
                  </Button>
                  <Link href="/">
                    <Button variant="ghost" size="sm" title="Back to Portfolio">
                      <ArrowLeft className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex items-center gap-1">
                  <RefreshCw className="w-4 h-4" />
                  Last update: {lastUpdate.toLocaleTimeString()}
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* User Info */}
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${username}`} />
                  <AvatarFallback>{username.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-gray-900 dark:text-white">{username}</p>
                    {isAdmin && (
                      <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs">
                        <Shield className="w-3 h-3 mr-1" />
                        Admin
                      </Badge>
                    )}
                  </div>
                  {userEmail && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">{userEmail}</p>
                  )}
                  <div className="flex items-center gap-1 mt-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-green-600 dark:text-green-400">Online</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Chat Rooms */}
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Chat Rooms</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[200px] lg:h-[300px]">
                <div className="space-y-1 p-4 pt-0">
                  {chatRooms.map((room) => (
                    <Button
                      key={room.id}
                      variant={activeRoom === room.id ? "default" : "ghost"}
                      className="w-full justify-start text-left h-auto p-3"
                      onClick={() => switchRoom(room.id)}
                    >
                      <div>
                        <div className="font-medium">{room.name}</div>
                        {room.description && (
                          <div className="text-xs opacity-70">{room.description}</div>
                        )}
                      </div>
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </motion.div>

        {/* Chat Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 flex flex-col"
        >
          <Card className="flex-1 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center justify-between">
                <span>{chatRooms.find(room => room.id === activeRoom)?.name || 'General Chat'}</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={fetchMessages}
                  disabled={isLoading}
                >
                  <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                </Button>
              </CardTitle>
              <Separator />
            </CardHeader>
            
            {/* Messages */}
            <CardContent className="flex-1 p-0">
              <ScrollArea className="h-[400px] lg:h-[500px] p-4">
                <AnimatePresence initial={false}>
                  {messages.map((message, index) => (
                    <motion.div
                      key={`${message.id}-${index}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`mb-4 flex gap-3 ${message.username === username ? 'flex-row-reverse' : ''}`}
                    >
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${message.username}`} />
                        <AvatarFallback className="text-xs">
                          {message.username.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`flex-1 ${message.username === username ? 'text-right' : ''}`}>
                        <div className={`flex items-center gap-2 mb-1 ${message.username === username ? 'justify-end' : ''}`}>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {message.username}
                          </span>
                          {message.isAdmin && (
                            <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs">
                              <Shield className="w-3 h-3 mr-1" />
                              Admin
                            </Badge>
                          )}
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(message.createdAt).toLocaleTimeString()}
                          </span>
                          {isAdmin && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteMessage(message.id)}
                              className="p-1 h-6 w-6 text-red-500 hover:text-red-700 hover:bg-red-50"
                              title="Hapus pesan"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          )}
                        </div>
                        <div className={`inline-block p-3 rounded-lg max-w-xs lg:max-w-md ${
                          message.username === username 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                        }`}>
                          {message.content}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                <div ref={messagesEndRef} />
              </ScrollArea>
            </CardContent>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-600">
              <div className="flex gap-2">
                <Input
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button onClick={sendMessage} disabled={!newMessage.trim() || isLoading}>
                  {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
      <Toaster 
        position="top-right"
        toastOptions={{
          className: 'dark:bg-gray-800 dark:text-white',
          duration: 3000,
        }}
      />
    </div>
  )
}
