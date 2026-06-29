# TurfZone - Full-Stack Sports Facility Booking Platform 🏟️

TurfZone is a feature-rich, full-stack sports facility booking web application. Inspired by modern booking interfaces like BookMyShow, TurfZone enables users to discover, search, and reserve time slots for various sports courts and turfs. It features a sleek, neon-themed dark user interface with secure authentication and robust validation.

## 🌟 Key Features
- **User Authentication**: Secure signup and login using JWT tokens and bcrypt password hashing.
- **Turf Catalog**: Browse turfs filtered by sport category (Cricket, Football, Badminton, Pickleball, Snooker).
- **Interactive Booking**: Reserve time slots with validation to prevent double-bookings.
- **Neon Dark UI**: Sleek dark-mode interface designed with Radix UI and Tailwind CSS.
- **Cricket Animations**: Integrated Three.js 3D animations for visual appeal.

## 🛠️ Architecture & Tech Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight client-side router)
- **State Management**: TanStack React Query (server-state caching)
- **Form Handling**: React Hook Form with Zod validation
- **Styling**: Tailwind CSS, PostCSS, Radix UI Primitives, shadcn/ui

### Backend & Database
- **Runtime**: Node.js with Express.js (TypeScript)
- **Database ORM**: Drizzle ORM
- **Database**: Neon Serverless PostgreSQL
- **Security**: JWT & bcryptjs

## 📁 File Structure
```
├── client/          # Frontend React files
│   ├── index.html
│   └── src/         # App, components (NeonCard, buttons), hooks, pages
├── server/          # Express backend files
│   ├── index.ts     # Express server entry point
│   ├── routes.ts    # REST API endpoints (auth, turfs, bookings)
│   └── storage.ts   # Database transaction/query interface
├── shared/          # Shared typescript types & database schemas
│   └── schema.ts    # Drizzle schema definitions (users, turfs, bookings)
```

## ⚙️ Setup & Deployment

1. **Clone the repository**:
   ```bash
   git clone https://github.com/bharathkumar7733/turfzone-booking-platform.git
   cd turfzone-booking-platform
   ```

2. **Install node packages**:
   ```bash
   npm install
   ```

3. **Configure Environment variables**:
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Initialize database schema**:
   ```bash
   npm run db:push
   ```

5. **Start development server**:
   ```bash
   npm run dev
   ```
   *The client will be running on Vite's development port.*

---
Developed by [bharathkumar7733](https://github.com/bharathkumar7733)
