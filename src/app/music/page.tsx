'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart, ArrowLeft, Music, Clock } from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

interface Song {
  id: string
  title: string
  artist: string
  album?: string
  duration: string
  genre: string
  year: number
  audioUrl: string
  coverImage: string
  isFavorite: boolean
}

// Sample data lagu favorit
const favoriteSongs: Song[] = [
  {
    id: '1',
    title: 'Bohemian Rhapsody',
    artist: 'Queen',
    album: 'A Night at the Opera',
    duration: '5:55',
    genre: 'Rock',
    year: 1975,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    isFavorite: true
  },
  {
    id: '2',
    title: 'Hotel California',
    artist: 'Eagles',
    album: 'Hotel California',
    duration: '6:30',
    genre: 'Rock',
    year: 1976,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    coverImage: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop',
    isFavorite: true
  },
  {
    id: '3',
    title: 'Imagine',
    artist: 'John Lennon',
    album: 'Imagine',
    duration: '3:03',
    genre: 'Pop',
    year: 1971,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    coverImage: 'https://images.unsplash.com/photo-1571974599782-87624638275b?w=300&h=300&fit=crop',
    isFavorite: true
  },
  {
    id: '4',
    title: 'Stairway to Heaven',
    artist: 'Led Zeppelin',
    album: 'Led Zeppelin IV',
    duration: '8:02',
    genre: 'Rock',
    year: 1971,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    isFavorite: true
  },
  {
    id: '5',
    title: 'Billie Jean',
    artist: 'Michael Jackson',
    album: 'Thriller',
    duration: '4:54',
    genre: 'Pop',
    year: 1982,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    coverImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=300&h=300&fit=crop',
    isFavorite: true
  },
  {
    id: '6',
    title: 'Sweet Child O Mine',
    artist: 'Guns N Roses',
    album: 'Appetite for Destruction',
    duration: '5:03',
    genre: 'Rock',
    year: 1987,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    coverImage: 'https://images.unsplash.com/photo-1586041008692-4dd03a89146b?w=300&h=300&fit=crop',
    isFavorite: true
  }
]

export default function MusicPage() {
  const [currentSong, setCurrentSong] = useState<Song | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const audioRef = useRef<HTMLAudioElement>(null)
  const { t } = useLanguage()

  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      const updateTime = () => setCurrentTime(audio.currentTime)
      const updateDuration = () => setDuration(audio.duration)
      
      audio.addEventListener('timeupdate', updateTime)
      audio.addEventListener('loadedmetadata', updateDuration)
      audio.addEventListener('ended', handleNext)
      
      return () => {
        audio.removeEventListener('timeupdate', updateTime)
        audio.removeEventListener('loadedmetadata', updateDuration)
        audio.removeEventListener('ended', handleNext)
      }
    }
  }, [currentSong])

  const playSong = (song: Song) => {
    setCurrentSong(song)
    setIsPlaying(true)
  }

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleNext = () => {
    if (currentSong) {
      const currentIndex = favoriteSongs.findIndex(song => song.id === currentSong.id)
      const nextIndex = (currentIndex + 1) % favoriteSongs.length
      playSong(favoriteSongs[nextIndex])
    }
  }

  const handlePrevious = () => {
    if (currentSong) {
      const currentIndex = favoriteSongs.findIndex(song => song.id === currentSong.id)
      const prevIndex = currentIndex === 0 ? favoriteSongs.length - 1 : currentIndex - 1
      playSong(favoriteSongs[prevIndex])
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0]
      setCurrentTime(value[0])
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t('music.backToPortfolio')}
              </Button>
            </Link>
          </div>
          
          <div className="text-center space-y-4">
            <div className="mx-auto w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
              <Music className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {t('music.title')}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t('music.subtitle')}
            </p>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Song List */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-500" />
                  {t('music.favoriteTracks')} ({favoriteSongs.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {favoriteSongs.map((song, index) => (
                  <motion.div
                    key={song.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-lg cursor-pointer transition-all hover:bg-gray-50 dark:hover:bg-gray-700 ${
                      currentSong?.id === song.id ? 'bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700' : ''
                    }`}
                    onClick={() => playSong(song)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img
                          src={song.coverImage}
                          alt={`${song.title} cover`}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        {currentSong?.id === song.id && isPlaying && (
                          <div className="absolute inset-0 bg-black/30 rounded-lg flex items-center justify-center">
                            <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 dark:text-white truncate">
                          {song.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                          {song.artist} • {song.album}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {song.genre}
                          </Badge>
                          <span className="text-xs text-gray-500">{song.year}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{song.duration}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Music Player */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg sticky top-8">
              <CardHeader>
                <CardTitle className="text-center">{t('music.nowPlaying')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {currentSong ? (
                  <>
                    {/* Album Cover */}
                    <div className="aspect-square rounded-lg overflow-hidden">
                      <img
                        src={currentSong.coverImage}
                        alt={`${currentSong.title} cover`}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Song Info */}
                    <div className="text-center space-y-2">
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                        {currentSong.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {currentSong.artist}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-500">
                        {currentSong.album} • {currentSong.year}
                      </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <Progress value={(currentTime / duration) * 100} className="w-full" />
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                      </div>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center justify-center gap-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handlePrevious}
                        className="rounded-full"
                      >
                        <SkipBack className="w-5 h-5" />
                      </Button>
                      
                      <Button
                        onClick={togglePlayPause}
                        className="rounded-full w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
                      >
                        {isPlaying ? (
                          <Pause className="w-6 h-6" />
                        ) : (
                          <Play className="w-6 h-6 ml-1" />
                        )}
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleNext}
                        className="rounded-full"
                      >
                        <SkipForward className="w-5 h-5" />
                      </Button>
                    </div>

                    {/* Volume Control */}
                    <div className="flex items-center gap-3">
                      <Volume2 className="w-4 h-4 text-gray-500" />
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={volume}
                        onChange={(e) => {
                          const newVolume = parseFloat(e.target.value)
                          setVolume(newVolume)
                          if (audioRef.current) {
                            audioRef.current.volume = newVolume
                          }
                        }}
                        className="flex-1"
                      />
                    </div>

                    {/* Audio Element */}
                    <audio
                      ref={audioRef}
                      src={currentSong.audioUrl}
                      autoPlay={isPlaying}
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                      onLoadedData={() => {
                        if (audioRef.current) {
                          audioRef.current.volume = volume
                        }
                      }}
                    />
                  </>
                ) : (
                  <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                    <Music className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>{t('music.selectSong')}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
