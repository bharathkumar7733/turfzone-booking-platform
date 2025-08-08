# Overview

TurfZone is a full-stack sports facility booking application that allows users to discover, browse, and book sports turfs and courts. The application provides a modern, responsive interface similar to BookMyShow, enabling users to register once and book time slots for various sports including cricket, football, badminton, pickleball, and snooker. The system handles user authentication, turf management, and booking functionality with a sleek dark-themed neon design.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript for type safety and component-based development
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: Radix UI primitives with shadcn/ui components for consistent design
- **Styling**: Tailwind CSS with custom neon-themed dark design system
- **State Management**: TanStack React Query for server state management and caching
- **Form Handling**: React Hook Form with Zod validation for type-safe form management
- **Build Tool**: Vite for fast development and optimized builds

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript for full-stack type safety
- **Architecture Pattern**: REST API with express routes and middleware
- **Authentication**: JWT tokens with bcrypt for password hashing
- **Data Storage**: In-memory storage implementation with IStorage interface for easy database swapping
- **Middleware**: Custom request logging and error handling

## Database Design
- **Schema**: Drizzle ORM with PostgreSQL dialect
- **Tables**: Users, turfs, and bookings with proper foreign key relationships
- **Validation**: Zod schemas for runtime type checking and API validation
- **Migration**: Drizzle Kit for database schema management

## Authentication & Authorization
- **Strategy**: JWT-based authentication with HTTP-only considerations
- **Password Security**: bcrypt for password hashing with salt rounds
- **Token Management**: Local storage for client-side token persistence
- **Protected Routes**: Middleware-based route protection for authenticated endpoints

## Design System
- **Theme**: Dark-themed interface with neon orange accents
- **Typography**: Inter font family for modern readability
- **Color Palette**: Custom CSS variables for consistent theming
- **Components**: Reusable NeonCard component with hover effects and glassmorphism
- **Responsiveness**: Mobile-first responsive design with Tailwind breakpoints

# External Dependencies

## Frontend Dependencies
- **UI Framework**: React 18 with ReactDOM for modern React features
- **Component Library**: Radix UI primitives for accessible, unstyled components
- **Styling**: Tailwind CSS with PostCSS and Autoprefixer for cross-browser compatibility
- **State Management**: TanStack React Query for efficient data fetching and caching
- **Form Management**: React Hook Form with Hookform Resolvers for validation integration
- **Validation**: Zod for runtime type checking and schema validation
- **Routing**: Wouter for lightweight client-side routing
- **3D Graphics**: Three.js for cricket animation effects
- **Date Handling**: date-fns for date manipulation and formatting

## Backend Dependencies
- **Framework**: Express.js for HTTP server functionality
- **Database**: Neon Database (PostgreSQL) for cloud-hosted database services
- **ORM**: Drizzle ORM with Drizzle Kit for database operations and migrations
- **Authentication**: jsonwebtoken for JWT implementation and bcryptjs for password hashing
- **Session Management**: connect-pg-simple for PostgreSQL session storage
- **Development**: tsx for TypeScript execution in development

## Development Tools
- **Build System**: Vite with React plugin for fast development and building
- **TypeScript**: Full-stack TypeScript configuration with path mapping
- **Linting & Formatting**: ESBuild for production bundle optimization
- **Replit Integration**: Replit-specific plugins for development environment integration