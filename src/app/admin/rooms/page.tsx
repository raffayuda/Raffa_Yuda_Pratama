'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Plus, Edit, Trash2, ArrowLeft, Users, MessageSquare } from 'lucide-react'
import { toast } from 'react-hot-toast'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

interface ChatRoom {
  id: string
  name: string
  description: string | null
  isActive: boolean
  createdAt: string
  _count: {
    messages: number
  }
}

export default function AdminRoomsPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [rooms, setRooms] = useState<ChatRoom[]>([])
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [editingRoom, setEditingRoom] = useState<ChatRoom | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  })

  useEffect(() => {
    const token = Cookies.get('admin-token')
    if (!token) {
      router.push('/admin')
      return
    }
    
    verifyTokenAndLoadRooms(token)
  }, [])

  const verifyTokenAndLoadRooms = async (token: string) => {
    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'verify', token }),
      })

      if (response.ok) {
        setIsAuthenticated(true)
        await loadRooms()
      } else {
        Cookies.remove('admin-token')
        router.push('/admin')
      }
    } catch (error) {
      console.error('Token verification failed:', error)
      router.push('/admin')
    }
    setIsLoading(false)
  }

  const loadRooms = async () => {
    try {
      const response = await fetch('/api/chat/rooms')
      if (response.ok) {
        const data = await response.json()
        setRooms(data.rooms)
      }
    } catch (error) {
      console.error('Failed to load rooms:', error)
      toast.error('Gagal memuat data ruangan')
    }
  }

  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name.trim()) {
      toast.error('Nama ruangan harus diisi')
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
          action: 'createRoom',
          token,
          name: formData.name.trim(),
          description: formData.description.trim() || null,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success('Ruangan berhasil dibuat!')
        setShowCreateDialog(false)
        setFormData({ name: '', description: '' })
        await loadRooms()
      } else {
        toast.error(data.error || 'Gagal membuat ruangan')
      }
    } catch (error) {
      console.error('Create room error:', error)
      toast.error('Terjadi kesalahan saat membuat ruangan')
    }
  }

  const handleEditRoom = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name.trim() || !editingRoom) {
      toast.error('Nama ruangan harus diisi')
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
          action: 'updateRoom',
          token,
          roomId: editingRoom.id,
          name: formData.name.trim(),
          description: formData.description.trim() || null,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success('Ruangan berhasil diperbarui!')
        setShowEditDialog(false)
        setEditingRoom(null)
        setFormData({ name: '', description: '' })
        await loadRooms()
      } else {
        toast.error(data.error || 'Gagal memperbarui ruangan')
      }
    } catch (error) {
      console.error('Update room error:', error)
      toast.error('Terjadi kesalahan saat memperbarui ruangan')
    }
  }

  const handleDeleteRoom = async (room: ChatRoom) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus ruangan "${room.name}"? Semua pesan di ruangan ini akan terhapus.`)) {
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
          action: 'deleteRoom',
          token,
          roomId: room.id,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success('Ruangan berhasil dihapus!')
        await loadRooms()
      } else {
        toast.error(data.error || 'Gagal menghapus ruangan')
      }
    } catch (error) {
      console.error('Delete room error:', error)
      toast.error('Terjadi kesalahan saat menghapus ruangan')
    }
  }

  const openEditDialog = (room: ChatRoom) => {
    setEditingRoom(room)
    setFormData({
      name: room.name,
      description: room.description || ''
    })
    setShowEditDialog(true)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="text-gray-600 dark:text-gray-400">Memuat...</span>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-4"
          >
            <Button
              variant="outline"
              onClick={() => router.push('/admin')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali</span>
            </Button>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Kelola Ruangan
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Tambah, edit, atau hapus ruangan chat
              </p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Ruangan
                </Button>
              </DialogTrigger>
              <DialogContent>
                <form onSubmit={handleCreateRoom}>
                  <DialogHeader>
                    <DialogTitle>Tambah Ruangan Baru</DialogTitle>
                    <DialogDescription>
                      Buat ruangan chat baru untuk pengguna
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nama Ruangan</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Masukkan nama ruangan"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Deskripsi (opsional)</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Masukkan deskripsi ruangan"
                        rows={3}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setShowCreateDialog(false)}>
                      Batal
                    </Button>
                    <Button type="submit">Tambah Ruangan</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </motion.div>
        </div>

        {/* Rooms Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {rooms.map((room, index) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-0 shadow-lg hover:shadow-xl transition-all">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{room.name}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditDialog(room)}
                        className="p-2"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteRoom(room)}
                        className="p-2 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  {room.description && (
                    <CardDescription>{room.description}</CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <MessageSquare className="w-4 h-4" />
                      <span>{room._count.messages} pesan</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className={`w-2 h-2 rounded-full ${room.isActive ? 'bg-green-500' : 'bg-red-500'}`} />
                      <span>{room.isActive ? 'Aktif' : 'Nonaktif'}</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => window.open(`/chat?room=${room.id}`, '_blank')}
                    >
                      Buka Ruangan
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {rooms.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12"
          >
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
              Belum Ada Ruangan
            </h3>
            <p className="text-gray-500 dark:text-gray-500 mb-6">
              Tambahkan ruangan pertama untuk memulai sistem chat
            </p>
            <Button 
              onClick={() => setShowCreateDialog(true)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Tambah Ruangan Pertama
            </Button>
          </motion.div>
        )}

        {/* Edit Dialog */}
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent>
            <form onSubmit={handleEditRoom}>
              <DialogHeader>
                <DialogTitle>Edit Ruangan</DialogTitle>
                <DialogDescription>
                  Perbarui informasi ruangan chat
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Nama Ruangan</Label>
                  <Input
                    id="edit-name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Masukkan nama ruangan"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-description">Deskripsi (opsional)</Label>
                  <Textarea
                    id="edit-description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Masukkan deskripsi ruangan"
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setShowEditDialog(false)
                    setEditingRoom(null)
                    setFormData({ name: '', description: '' })
                  }}
                >
                  Batal
                </Button>
                <Button type="submit">Simpan Perubahan</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
