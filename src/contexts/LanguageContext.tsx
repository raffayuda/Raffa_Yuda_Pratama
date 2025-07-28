'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type Language = 'en' | 'id'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Translations
const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.skills': 'Skills',
    'nav.projects': 'Projects',
    'nav.experience': 'Experience',
    'nav.contact': 'Contact',
    'nav.liveChat': 'Live Chat',
    'nav.music': 'Music',
    'nav.admin': 'Admin',
    'nav.portfolio': 'BodayEmo',
    
    // Hero Section
    'hero.greeting': 'Hi, I am',
    'hero.title': 'Junior Web Developer',
    'hero.subtitle': 'I am a male who supports the Spanish football club Barcelona FC. Visca Barca Visca Catalunya',
    'hero.cta': 'Get In Touch',
    'hero.downloadCV': 'Download CV',
    
    // About Section
    'about.title': 'About Me',
    'about.subtitle': 'I\'m a passionate Junior Web Developer who loves creating digital experiences that make a difference.',
    'about.myStory': 'My Story',
    'about.story1': 'Hi! I\'m Raffa Yuda Pratama, a junior web developer based in Indonesia. My journey into tech started 5 years ago when I discovered the magic of turning ideas into interactive digital experiences.',
    'about.story2': 'During my time in vocational school, I learned the basics of programming such as PHP, JavaScript, and Java and started developing small projects. While in vocational school, I more often used PHP with the Laravel framework.',
    'about.story3': 'After graduating, I tried other things besides using PHP and Laravel, I tried to deepen JavaScript with the Next.js and React.js frameworks by watching tutorials on YouTube and reading the official documentation.',
    'about.currentlyFocused': 'Currently focused on:',
    'about.whatIValue': 'What I Value',
    
    // Stats
    'about.stats.projectsCompleted': 'Projects Completed',
    'about.stats.happyClients': 'Happy Clients',
    'about.stats.yearsExperience': 'Years Experience',
    'about.stats.cupsOfCoffee': 'Eat Rice',
    
    // Values
    'about.values.cleanCode.title': 'Clean Code',
    'about.values.cleanCode.description': 'I believe in writing maintainable, scalable, and well-documented code that stands the test of time.',
    'about.values.userCentered.title': 'User-Centered Design',
    'about.values.userCentered.description': 'Every decision I make prioritizes the end user\'s experience and accessibility.',
    'about.values.continuousLearning.title': 'Continuous Learning',
    'about.values.continuousLearning.description': 'Technology evolves rapidly, and I\'m committed to staying current with the latest trends and best practices.',
    'about.values.collaboration.title': 'Collaboration',
    'about.values.collaboration.description': 'Great products are built by great teams. I thrive in collaborative environments.',
    
    // Skills Section
    'skills.title': 'My Skills',
    'skills.subtitle': 'Technologies and tools I\'ve mastered to bring ideas to life.',
    'skills.frontend': 'Frontend Development',
    'skills.backend': 'Backend Development',
    'skills.tools': 'Tools & Others',
    'skills.technologiesTitle': 'Technologies I Work With',
    
    // Projects Section
    'projects.title': 'Latest Projects',
    'projects.subtitle': 'A showcase of my recent work and side projects that demonstrate my skills and passion for development.',
    'projects.viewProject': 'View Live Demo',
    'projects.viewCode': 'View Source Code',
    'projects.comingSoon': 'Coming Soon',
    'projects.otherProjects': 'Other Projects',
    'projects.allProjects': 'All Projects',
    
    // Experience Section
    'experience.title': 'Work Experience',
    'experience.subtitle': 'My professional journey and career milestones.',
    'experience.present': 'Present',
    'experience.achievements': 'Key Achievements',
    
    // Contact Section
    'contact.title': 'Get In Touch',
    'contact.subtitle': 'let\'s collaborate with each other',
    'contact.name': 'Your Name',
    'contact.email': 'Your Email',
    'contact.subject': 'Subject',
    'contact.message': 'Your Message',
    'contact.send': 'Send Message',
    'contact.sending': 'Sending...',
    'contact.successMessage': 'Thank you! Your message has been sent successfully.',
    'contact.errorMessage': 'Sorry, there was an error sending your message. Please try again.',
    'contact.info': 'Contact Information',
    'contact.social': 'Follow Me',
    'contact.availability': 'Available for freelance work',
    
    // Music Page
    'music.title': 'My Favorite Songs',
    'music.subtitle': 'My favorite song collection when I\'m playing together and watching Barca.',
    'music.favoriteTracks': 'Favorite Tracks',
    'music.nowPlaying': 'Now Playing',
    'music.selectSong': 'Select a song to start playing',
    'music.backToPortfolio': 'Back to Portfolio',
    
    // Chat Page
    'chat.title': 'Live Chat',
    'chat.joinChat': 'Join Live Chat',
    'chat.welcomeBack': 'Welcome Back!',
    'chat.displayName': 'Display Name',
    'chat.email': 'Email (Optional)',
    'chat.continueChatting': 'Continue Chatting',
    'chat.enterName': 'Enter your name',
    'chat.typeMessage': 'Type your message...',
    'chat.online': 'Online',
    'chat.lastUpdate': 'Last update',
    'chat.leaveChat': 'Leave Chat',
    'chat.chatRooms': 'Chat Rooms',
    
    // Footer Section
    'footer.brand': 'Portfolio',
    'footer.description': 'A passionate full-stack developer creating beautiful, functional web applications with modern technologies.',
    'footer.quickLinks': 'Quick Links',
    'footer.social': 'Social Media',
    'footer.backToTop': 'Back to Top',
    'footer.madeWith': 'Made with',
    'footer.rightsReserved': 'All rights reserved.',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.back': 'Back',
  },
  id: {
    // Navigation
    'nav.home': 'Beranda',
    'nav.about': 'Tentang',
    'nav.skills': 'Keahlian',
    'nav.projects': 'Proyek',
    'nav.experience': 'Pengalaman',
    'nav.contact': 'Kontak',
    'nav.liveChat': 'Chat Langsung',
    'nav.music': 'Musik',
    'nav.admin': 'Admin',
    'nav.portfolio': 'Portfolio',
    
    // Hero Section
    'hero.greeting': 'Halo, saya',
    'hero.title': 'Junior Web Developer',
    'hero.subtitle': 'Saya seorang manusia berkelamin laki - laki yang mendukung club sepak bola asal Spanyol yaitu Barcelona FC. Visca Barca Visca Catalunya',
    'hero.cta': 'Hubungi Saya',
    'hero.downloadCV': 'Unduh CV',
    
    // About Section
    'about.title': 'Tentang Saya',
    'about.subtitle': 'Saya adalah seorang Junior Web developer yang bersemangat dan suka menciptakan pengalaman digital yang membuat perbedaan.',
    'about.myStory': 'Cerita Saya',
    'about.story1': 'Halo!, Saya Raffa Yuda Pratama, seorang junior web developer yang berasal dari Indonesia. Saya memulai apa itu coding dan lainnya dari saya SMK dan menurut saya itu cukup menarik.',
    'about.story2': 'Selama di SMK, saya belajar dasar-dasar pemrograman seperti PHP, JavaScript, dan Java dan mulai mengembangkan proyek kecil. Selama di SMK saya lebih sering menggunakan PHP dengan framework Laravel',
    'about.story3': 'Setelah lulus, saya mencoba hal lain selain menggunakan PHP dan Laravel, saya mencoba memperdalam Javascript dengan framework Next.js dan React.js dengan menonton tutorial di YouTube dan membaca dokumentasi resmi.',
    'about.currentlyFocused': 'Saat ini fokus pada:',
    'about.whatIValue': 'Yang Saya Hargai',
    
    // Stats
    'about.stats.projectsCompleted': 'Proyek Selesai',
    'about.stats.happyClients': 'Klien Puas',
    'about.stats.yearsExperience': 'Tahun Pengalaman',
    'about.stats.cupsOfCoffee': 'Makan Nasi',
    
    // Values
    'about.values.cleanCode.title': 'Kode Bersih',
    'about.values.cleanCode.description': 'Saya percaya dalam menulis kode yang dapat dipelihara, scalable, dan terdokumentasi dengan baik yang tahan terhadap waktu.',
    'about.values.userCentered.title': 'Desain Berpusat Pengguna',
    'about.values.userCentered.description': 'Setiap keputusan yang saya buat mengutamakan pengalaman dan aksesibilitas pengguna akhir.',
    'about.values.continuousLearning.title': 'Pembelajaran Berkelanjutan',
    'about.values.continuousLearning.description': 'Teknologi berkembang pesat, dan saya berkomitmen untuk tetap mengikuti tren dan praktik terbaik terbaru.',
    'about.values.collaboration.title': 'Kolaborasi',
    'about.values.collaboration.description': 'Produk hebat dibangun oleh tim hebat. Saya berkembang dalam lingkungan kolaboratif.',
    
    // Skills Section
    'skills.title': 'Keahlian Saya',
    'skills.subtitle': 'Teknologi dan tools yang saya kuasai untuk mewujudkan ide.',
    'skills.frontend': 'Frontend Development',
    'skills.backend': 'Backend Development',
    'skills.tools': 'Tools & Lainnya',
    'skills.technologiesTitle': 'Teknologi yang Saya Gunakan',
    
    // Projects Section
    'projects.title': 'Proyek Terbaru',
    'projects.subtitle': 'Showcase karya terbaru dan proyek sampingan yang menunjukkan keahlian dan passion saya dalam pengembangan.',
    'projects.viewProject': 'Lihat Demo Live',
    'projects.viewCode': 'Lihat Source Code',
    'projects.comingSoon': 'Segera Hadir',
    'projects.otherProjects': 'Proyek Lainnya',
    'projects.allProjects': 'Semua Proyek',
    
    // Experience Section
    'experience.title': 'Pengalaman Kerja',
    'experience.subtitle': 'Perjalanan profesional dan pencapaian karir saya.',
    'experience.present': 'Sekarang',
    'experience.achievements': 'Pencapaian Utama',
    
    // Contact Section
    'contact.title': 'Hubungi Saya',
    'contact.subtitle': 'Ayo kita saling berkolaborasi',
    'contact.name': 'Nama Anda',
    'contact.email': 'Email Anda',
    'contact.subject': 'Subjek',
    'contact.message': 'Pesan Anda',
    'contact.send': 'Kirim Pesan',
    'contact.sending': 'Mengirim...',
    'contact.successMessage': 'Terima kasih! Pesan Anda telah berhasil dikirim.',
    'contact.errorMessage': 'Maaf, terjadi kesalahan saat mengirim pesan. Silakan coba lagi.',
    'contact.info': 'Informasi Kontak',
    'contact.social': 'Ikuti Saya',
    'contact.availability': 'Tersedia untuk proyek freelance',
    
    // Music Page
    'music.title': 'Lagu Favorit Saya',
    'music.subtitle': 'Koleksi lagu favorit saya ketika lagi mabar dan nonton Barca',
    'music.favoriteTracks': 'Lagu Favorit',
    'music.nowPlaying': 'Sedang Diputar',
    'music.selectSong': 'Pilih lagu untuk mulai memutar',
    'music.backToPortfolio': 'Kembali ke Portfolio',
    
    // Chat Page
    'chat.title': 'Chat Langsung',
    'chat.joinChat': 'Gabung Chat Langsung',
    'chat.welcomeBack': 'Selamat Datang Kembali!',
    'chat.displayName': 'Nama Tampilan',
    'chat.email': 'Email (Opsional)',
    'chat.continueChatting': 'Lanjut Chat',
    'chat.enterName': 'Masukkan nama Anda',
    'chat.typeMessage': 'Ketik pesan Anda...',
    'chat.online': 'Online',
    'chat.lastUpdate': 'Update terakhir',
    'chat.leaveChat': 'Keluar Chat',
    'chat.chatRooms': 'Ruang Chat',
    
    // Footer Section
    'footer.brand': 'Portfolio',
    'footer.description': 'Seorang full-stack developer yang bersemangat menciptakan aplikasi web yang indah dan fungsional dengan teknologi modern.',
    'footer.quickLinks': 'Tautan Cepat',
    'footer.social': 'Media Sosial',
    'footer.backToTop': 'Kembali ke Atas',
    'footer.madeWith': 'Dibuat dengan',
    'footer.rightsReserved': 'Semua hak dilindungi.',
    
    // Common
    'common.loading': 'Memuat...',
    'common.error': 'Error',
    'common.success': 'Berhasil',
    'common.cancel': 'Batal',
    'common.save': 'Simpan',
    'common.delete': 'Hapus',
    'common.edit': 'Edit',
    'common.back': 'Kembali',
  }
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedLanguage && ['en', 'id'].includes(savedLanguage)) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Save language to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('language', language)
  }, [language])

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
