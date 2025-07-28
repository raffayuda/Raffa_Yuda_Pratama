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
    title: 'Birds of a Feather',
    artist: 'Billie Eilish',
    album: 'BIRDS OF A FEATHER',
    duration: '3:31',
    genre: 'New Wave',
    year: 2024,
    audioUrl: 'music/1.mp3',
    coverImage: 'https://i.pinimg.com/736x/e3/47/24/e34724ee2e2f6af36470b7c1cc608334.jpg',
    isFavorite: true
  },
  {
    id: '2',
    title: 'Don\'t Look Back in Anger',
    artist: 'Oasis',
    album: '(What\'s the Story) Morning Glory?',
    duration: '4:47',
    genre: 'Rock',
    year: 1996,
    audioUrl: 'music/2.mp3',
    coverImage: 'https://i.pinimg.com/1200x/b2/51/91/b2519108de0b3a76a779a3be5c111de7.jpg',
    isFavorite: true
  },
  {
    id: '3',
    title: 'ABCDEFU',
    artist: 'Gayle',
    album: 'Gayle',
    duration: '2:57',
    genre: 'Pop',
    year: 2021,
    audioUrl: 'music/6.mp3',
    coverImage: 'lagu6.png',
    isFavorite: true
  },
  {
    id: '4',
    title: 'Imagination',
    artist: 'Shania Yan',
    album: 'Shania Yan',
    duration: '3:09',
    genre: 'Pop',
    year: 2015,
    audioUrl: 'music/5.mp3',
    coverImage: 'https://i.pinimg.com/1200x/ac/f6/48/acf6482be7866d399c974ff69a0e04f1.jpg',
    isFavorite: true
  },
  {
    id: '5',
    title: 'Bertaut', 
    artist: 'Nadin Amizah',
    album: 'Pop',
    duration: '5:08',
    genre: 'Folk',
    year: 2020,
    audioUrl: 'music/3.mp3',
    coverImage: 'https://i.pinimg.com/736x/6d/41/8a/6d418a54c866d7e65755edca763c9f85.jpg',
    isFavorite: true
  },
  {
    id: '6',
    title: 'Sore Tugu Pancoran',
    artist: 'Iwan Fals',
    album: 'Iwan Fals',
    duration: '4:09',
    genre: 'Pop',
    year: 1985,
    audioUrl: 'music/4.mp3',
    coverImage: 'lagu4.png',
    isFavorite: true
  },
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
