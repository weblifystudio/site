# Weblify Studio - Professional Web Agency Website

## Overview
Weblify Studio is a professional multi-page showcase website for a web agency, built as a modern full-stack application. Its purpose is to present the agency's services, portfolio, and vision with a focus on minimalist design, performance, and professional presentation. Key capabilities include service showcasing, project portfolio, contact management, and comprehensive legal compliance. The project aims to establish a strong online presence for the agency and facilitate client interaction.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture
The application follows a monorepo structure, separating client and server code.

### Frontend
- **Framework**: React with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query for server state
- **Routing**: Wouter
- **Component Library**: shadcn/ui built on Radix UI primitives
- **Typography**: Inter font family
- **Design Principles**: Mobile-first responsive design, dark/light mode toggle with persistent preferences.
- **UI/UX Decisions**: Incorporates interactive elements like carousels, animated counters, floating background elements, and accessible components.

### Backend
- **Framework**: Express.js with TypeScript
- **API Structure**: RESTful API
- **Data Storage**: In-memory storage with an interface for future database integration.
- **Error Handling**: Centralized middleware.
- **Logging**: Request/response logging.

### Database
- **ORM**: Drizzle ORM (configured for future use)
- **Type**: PostgreSQL

### Core Features & Design Patterns
- **Page Structure**: Includes Home, Services, Portfolio, About, FAQ, Contact, Legal Mentions, CGV, Privacy Policy, and Cookies pages.
- **Legal Compliance**: Full French legal compliance with RGPD, cookies management, CGV, and privacy policy.
- **Data Flow**: Contact form processing with Zod validation, server-side storage (currently in-memory), and user feedback.
- **Content Management**: Static content managed via React components; form validation with react-hook-form and Zod.
- **Deployment**: Single Node.js process serving both static assets (built by Vite) and API (bundled by esbuild).

## External Dependencies

### Core Technologies
- **Frontend**: React 18
- **Backend**: Express.js
- **Language**: TypeScript
- **Build Tool**: Vite

### UI/UX Libraries
- **Component Primitives**: Radix UI
- **CSS Framework**: Tailwind CSS
- **Icons**: Lucide React
- **Carousel**: Embla Carousel

### Development Tools & Utilities
- **ORM**: Drizzle ORM
- **Schema Validation**: Zod
- **Server State Management**: TanStack Query
- **Routing**: Wouter

### Analytics & Integration
- **Web Analytics**: Google Analytics 4 (with RGPD-compliant consent management)
- **Newsletter System**: Mailchimp integration for professional newsletter management
- **Contact System**: SMTP webmail integration for contact form submissions

### Security & SSL
- **SSL/TLS Configuration**: Comprehensive security headers and HTTPS setup
- **Security Headers**: HSTS, CSP, X-Frame-Options, and more for maximum protection
- **Auto-HTTPS Redirect**: Automatic redirection to HTTPS in production
- **Development SSL**: Optional self-signed certificates for local HTTPS testing