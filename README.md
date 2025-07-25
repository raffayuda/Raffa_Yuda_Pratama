# Modern Portfolio Website

A modern, responsive portfolio website built with Next.js, TypeScript, Prisma, and PostgreSQL. Features beautiful animations, dark mode support, and a complete content management system.

![Portfolio Screenshot](./public/portfolio-preview.png)

## 🚀 Features

- **Modern Design**: Clean, professional design with smooth animations
- **Fully Responsive**: Optimized for all devices and screen sizes
- **Dark Mode**: Auto-switching based on system preference
- **Database Integration**: PostgreSQL with Prisma ORM for dynamic content
- **Contact Form**: Working contact form with database storage
- **Performance Optimized**: Built with Next.js 15 for optimal performance
- **SEO Friendly**: Optimized for search engines
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **Framer Motion**: Smooth animations and page transitions

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Shadcn/ui Components
- **Animations**: Framer Motion
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Deployment**: Vercel
- **Icons**: Lucide React

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your database URL:
   ```env
   DATABASE_URL="your_postgresql_database_url"
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   npm run db:seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🗄️ Database Setup

This project uses PostgreSQL with Prisma. You can use:

1. **Local PostgreSQL**: Install PostgreSQL locally
2. **Vercel Postgres**: Use Vercel's managed PostgreSQL service
3. **Railway/Supabase**: Other PostgreSQL providers

### Database Schema

The application includes the following models:

- **Projects**: Portfolio projects with technologies, links, and descriptions
- **Skills**: Technical skills with categories and proficiency levels
- **Experience**: Work experience and career history
- **Contact**: Contact form submissions

## 🎨 Customization

### Personal Information

Update the following files to customize with your information:

1. **Components**: Edit the content in each component file
2. **Images**: Replace placeholder images in the `public` folder
3. **Colors**: Modify the color scheme in `tailwind.config.js`
4. **Content**: Update the static content throughout the components

### Adding New Sections

1. Create a new component in `src/components`
2. Add it to the main page in `src/app/page.tsx`
3. Update the navigation in `src/components/Navigation.tsx`

## 🚀 Deployment

### Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Connect your GitHub repository to Vercel
   - Set up environment variables in Vercel dashboard
   - Deploy automatically on push

### Environment Variables for Production

Set the following environment variables in your deployment platform:

```env
DATABASE_URL="your_production_database_url"
NEXTAUTH_SECRET="your_secret_key"
NEXTAUTH_URL="your_production_url"
```

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── app/                 # Next.js app directory
│   │   ├── api/            # API routes
│   │   ├── globals.css     # Global styles
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Home page
│   ├── components/         # React components
│   │   ├── ui/            # Reusable UI components
│   │   ├── About.tsx      # About section
│   │   ├── Contact.tsx    # Contact section
│   │   ├── Experience.tsx # Experience section
│   │   ├── Hero.tsx       # Hero section
│   │   ├── Navigation.tsx # Navigation bar
│   │   ├── Projects.tsx   # Projects section
│   │   └── Skills.tsx     # Skills section
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   └── generated/         # Generated Prisma client
├── prisma/
│   ├── migrations/        # Database migrations
│   ├── seed/             # Database seed files
│   └── schema.prisma     # Database schema
├── public/               # Static assets
└── ...config files
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:seed` - Seed the database with sample data

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 💬 Support

If you have any questions or need help with setup, feel free to:

- Open an issue on GitHub
- Reach out via email: your.email@example.com
- Connect on LinkedIn: [Your LinkedIn Profile](https://linkedin.com/in/yourprofile)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Prisma](https://www.prisma.io/) for the excellent database toolkit
- [Vercel](https://vercel.com/) for seamless deployment

---

Built with ❤️ by [Your Name](https://github.com/yourusername)
