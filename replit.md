# Weblify Studio - Professional Web Agency Website

## Overview

Weblify Studio is a professional multi-page showcase website for a Parisian web agency founded by Noah Delenclos in 2025. The application is built as a modern full-stack web application using React for the frontend and Express.js for the backend, with a focus on minimalist design, performance, and professional presentation.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a monorepo structure with clear separation between client-side and server-side code:

- **Frontend**: React with TypeScript, using Vite as the build tool
- **Backend**: Express.js with TypeScript for API endpoints
- **Database**: PostgreSQL with Drizzle ORM (configured for future use)
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for client-side routing
- **Analytics**: Google Analytics 4 integration with RGPD-compliant consent management
- **Legal Compliance**: Full French legal compliance with RGPD, cookies management, CGV, and privacy policy

## Key Components

### Frontend Architecture
- **Component Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom theme configuration and CSS variables
- **Typography**: Inter font family for modern, readable text
- **Responsive Design**: Mobile-first approach with responsive breakpoints
- **Theme Support**: Dark/light mode toggle with persistent preferences

### Backend Architecture
- **API Structure**: RESTful API with Express.js
- **Data Storage**: Currently using in-memory storage with interface for database abstraction
- **Error Handling**: Centralized error handling middleware
- **Logging**: Request/response logging for API endpoints

### Page Structure
The application consists of 10 main pages:
1. **Home** (`/`) - Hero section with carousel, key strengths, services, timeline, and contact form
2. **Services** (`/offres`) - Three service tiers: Site Vitrine (€800+), Site Premium (€1500+), Sur-Mesure (custom pricing)
3. **Portfolio** (`/realisations`) - Gallery of completed projects
4. **About** (`/a-propos`) - Information about Noah Delenclos and the agency
5. **FAQ** (`/faq`) - Frequently asked questions with accordion interface
6. **Contact** (`/contact`) - Contact form with progress tracking and Google Analytics events
7. **Legal** (`/mentions-legales`) - Complete legal mentions with RGPD compliance
8. **CGV** (`/cgv`) - Terms and conditions conforming to French commercial law
9. **Privacy Policy** (`/politique-confidentialite`) - RGPD-compliant privacy policy
10. **Cookies** (`/cookies`) - Interactive cookie management page with user preferences

## Data Flow

### Contact Form Processing
1. User fills out contact form with validation
2. Form data is validated using Zod schemas
3. Data is sent to `/api/contact` endpoint
4. Server validates and stores contact information
5. Success/error feedback is provided to user

### Content Management
- Static content is managed through React components
- Form validation uses react-hook-form with Zod resolvers
- Client-server communication via TanStack Query for caching and error handling

## External Dependencies

### Core Technologies
- **React 18**: Frontend framework with modern hooks
- **Express.js**: Backend web framework
- **TypeScript**: Type safety across the entire stack
- **Vite**: Fast development server and build tool

### UI/UX Libraries
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library
- **Embla Carousel**: Carousel/slider functionality

### Development Tools
- **Drizzle ORM**: Database ORM with PostgreSQL support
- **Zod**: Schema validation for forms and API
- **TanStack Query**: Server state management
- **Wouter**: Lightweight client-side routing

### Database Configuration
- PostgreSQL database with Drizzle ORM
- Connection configured via `DATABASE_URL` environment variable
- Schema defined in `shared/schema.ts` with contact form structure
- Migration support through drizzle-kit

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite builds React application to `dist/public`
2. **Backend Build**: esbuild bundles server code to `dist/index.js`
3. **Production**: Single Node.js process serves both static assets and API

### Environment Configuration
- **Development**: Vite dev server with HMR and Express backend
- **Production**: Express serves built static files and API endpoints
- **Database**: PostgreSQL connection via environment variables

### Scripts
- `npm run dev`: Development mode with hot reload
- `npm run build`: Production build for both frontend and backend
- `npm run start`: Production server
- `npm run db:push`: Database schema migration

## Recent Changes (January 2025)

### February 1, 2025 - Animations & Navigation Fixes
- ✓ **FIXED**: 404 page redirection - automatic redirect to homepage after 2 seconds
- ✓ **FIXED**: Floating elements positioning - identical layout between home and about pages
- ✓ **NEW**: Enhanced floating animations with complex trajectories (translation up to 12px, rotation up to 7°, scale variation)
- ✓ **NEW**: Independent floating elements on both home and about pages with desynchronized movements
- ✓ **NEW**: Harmonized container dimensions (w-full h-96) for consistent floating element positions

## Previous Changes (January 2025)

### Legal Compliance & RGPD
- ✓ Added complete privacy policy (`/politique-confidentialite`)
- ✓ Enhanced legal mentions with mediation and consumer rights
- ✓ Improved CGV with withdrawal rights and French law compliance
- ✓ Created interactive cookie management system
- ✓ Implemented RGPD-compliant consent banner with granular controls

### Google Analytics Integration
- ✓ Integrated Google Analytics 4 with consent management
- ✓ Added page view tracking for SPA routing
- ✓ Implemented event tracking for contact form submissions
- ✓ Created analytics utilities with TypeScript support
- ✓ Conditional GA loading based on cookie preferences

### User Experience Improvements (Latest - January 28, 2025)
- ✓ Added automatic scroll-to-top on all navigation
- ✓ Enhanced cookie banner with detailed explanations
- ✓ Improved contact form with analytics tracking
- ✓ Added comprehensive footer links to all legal pages
- ✓ Fixed CSS import order for proper font loading
- ✓ **NEW**: Implemented desynchronized floating square animations on homepage and about page
- ✓ **NEW**: Added animated counters (0 to target value) triggered by scroll intersection
- ✓ **NEW**: Enhanced carousel with navigation arrows and improved pagination dots
- ✓ **NEW**: Slowed carousel autoplay from 5s to 7s for better user experience
- ✓ **NEW**: Added scroll-to-top functionality to ALL internal navigation links
- ✓ **NEW**: Implemented email sending functionality in contact form with nodemailer

### Performance Optimizations (Latest - February 1, 2025)
- ✓ **MAJOR**: Implemented comprehensive lazy loading across entire site (blog, portfolio, all images)
- ✓ **NEW**: Created Service Worker with intelligent caching strategies (cache-first for assets, network-first for pages)
- ✓ **NEW**: Added performance optimization utilities with Web Vitals measurement and automatic optimization
- ✓ **NEW**: Implemented LazyImage component with loading placeholders and error handling
- ✓ **NEW**: Enhanced HTML with preconnect and DNS-prefetch for external resources (Unsplash)
- ✓ **NEW**: Added critical CSS optimizations with will-change properties for animations
- ✓ **NEW**: Created performance monitoring with LCP, FID, and CLS measurement
- ✓ **NEW**: Optimized images with defined dimensions to prevent Cumulative Layout Shift (CLS)
- ✓ **NEW**: Added font preloading and display:swap for optimal font loading
- ✓ **NEW**: Service Worker auto-registration for offline capability and asset caching

### Technical Architecture
- ✓ Created modular analytics system with consent integration
- ✓ Implemented event-driven cookie preference management
- ✓ Added TypeScript environment variable definitions
- ✓ Enhanced error handling and user feedback systems
- ✓ **NEW**: Added custom CSS animations (float1, float2, float3, float4) with different trajectories
- ✓ **NEW**: Implemented IntersectionObserver for counter animations
- ✓ **NEW**: Enhanced carousel with arrow navigation and clickable pagination
- ✓ **NEW**: Replaced nodemailer with professional SendGrid email system
- ✓ **NEW**: Beautiful HTML email templates for contact form notifications  
- ✓ **NEW**: Fallback system - form works even if email fails temporarily
- ✓ **NEW**: Environment variables for easy configuration (SENDGRID_API_KEY, CONTACT_EMAIL)

### Animation & Interaction Improvements
- ✓ **Floating Squares**: Desynchronized animations with unique trajectories, rotations, and scaling
- ✓ **Statistics Counters**: Smooth counting animation from 0 to target values when section becomes visible
- ✓ **Carousel Enhancement**: Left/right arrow navigation with improved visual feedback
- ✓ **Navigation Flow**: Universal scroll-to-top on all internal links for consistent UX
- ✓ **Email Integration**: Contact form now sends formatted emails with all form data

The application is now fully compliant with French law and RGPD, featuring comprehensive legal documentation, consent management, professional analytics tracking, enhanced animations, and a fully functional contact system with email notifications.