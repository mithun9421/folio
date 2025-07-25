# Full-Stack Developer Portfolio

A modern, interactive portfolio website built with Next.js, Three.js, and cutting-edge web technologies. Features 3D visualizations, smooth animations, and a privacy-first design approach.

## ✨ Features

- **3D Skills Visualization**: Interactive Three.js component showcasing technical expertise
- **Modern UI/UX**: Built with Shadcn/ui and Aceternity components
- **Smooth Animations**: Framer Motion powered transitions and micro-interactions
- **Loading Experience**: Custom loading screens with progress tracking
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Performance Optimized**: Lazy loading, code splitting, and optimized assets
- **SEO Ready**: Meta tags, structured data, and sitemap generation
- **Accessibility First**: WCAG compliant with proper focus management
- **Privacy-Focused**: No tracking, minimal data collection

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations and transitions
- **Three.js + React Three Fiber** - 3D graphics and visualizations
- **Shadcn/ui** - Modern component library
- **Lucide React** - Beautiful icons

### Development
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **Turbopack** - Fast bundler for development

### Deployment
- **Vercel** - Hosting and deployment platform
- **Edge Functions** - Serverless API endpoints

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Type check
npm run type-check
```

## 🎨 Customization

### Personal Information
Update the following files with your information:
- `src/components/sections/HeroSection.tsx` - Professional summary and contact links
- `src/components/sections/ProjectsSection.tsx` - Your projects and achievements
- `src/components/sections/ContactSection.tsx` - Contact information
- `src/components/3d/SkillsVisualization.tsx` - Technical skills

### Styling
- Modify `src/app/globals.css` for global styles
- Update Tailwind config in `tailwind.config.ts`
- Customize component styles in respective component files

### 3D Visualization
The skills visualization in `src/components/3d/SkillsVisualization.tsx` can be customized:
- Add/remove skills from the `skillsData` array
- Modify colors, positions, and animations
- Adjust camera settings and lighting

## 📱 Sections Overview

### Hero Section
- Animated background with spotlight effects
- Professional summary with text generation effect
- Call-to-action buttons and social links
- Scroll indicator with smooth transitions

### Skills Section  
- Interactive 3D skills visualization
- Toggle between grid and 3D views
- Categorized technical expertise
- Performance statistics

### Projects Section
- Detailed project cards with filtering
- Modal views with comprehensive information
- Impact metrics and technology stacks
- GitHub and live demo links

### Contact Section
- Interactive contact form
- Multiple contact methods
- Inquiry type categorization
- Response time indicators

## 🔧 Performance Optimizations

- **Code Splitting**: Automatic route-based splitting
- **Lazy Loading**: Components loaded on demand
- **Image Optimization**: Next.js Image component
- **Bundle Analysis**: Webpack bundle analyzer
- **Caching**: Vercel Edge Network caching
- **Compression**: Gzip and Brotli compression

## 🌐 Deployment

### Vercel (Recommended)

1. **Connect to Vercel**
   - Push your code to GitHub
   - Import project in Vercel dashboard
   - Configure build settings (auto-detected)

2. **Environment Variables** (if needed)
   ```bash
   NEXT_PUBLIC_SITE_URL=https://your-domain.com
   ```

3. **Deploy**
   - Automatic deployment on git push
   - Preview deployments for pull requests
   - Production deployment from main branch

### Manual Deployment

```bash
# Build the project
npm run build

# Export static files (if using static export)
npm run export

# Deploy the .next or out folder to your hosting provider
```

## 📊 Analytics & Monitoring

The portfolio is designed with privacy in mind:
- No third-party tracking scripts
- Minimal data collection
- GDPR/CCPA compliant
- Optional analytics can be added

## 🤝 Contributing

While this is a personal portfolio, suggestions and improvements are welcome:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Create a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Shadcn/ui** - For the beautiful component library
- **Aceternity UI** - For inspiration and components
- **Three.js community** - For 3D graphics resources
- **Vercel** - For hosting and deployment platform
- **Next.js team** - For the amazing React framework

## 📞 Support

If you have any questions or need help customizing the portfolio:

- Create an issue in the repository
- Check the documentation
- Review the component files for examples

---

**Built with ❤️ using modern web technologies**

Privacy-first design • Enterprise-ready • Open source friendly
