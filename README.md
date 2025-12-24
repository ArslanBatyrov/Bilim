# Bilim Core

An offline-first Progressive Web App (PWA) for learning, built with Next.js, TypeScript, and Supabase.

## Features

- 📱 **Offline-First**: Works completely offline with IndexedDB storage
- 🔄 **Background Sync**: Automatically syncs progress when online
- 📚 **Content Hierarchy**: Subjects → Topics → Lessons
- ✅ **Progress Tracking**: Track learning progress with events and state
- 🎯 **Quiz Engine**: Support for MCQ and numeric input questions
- 🎨 **Modern UI**: Clean, responsive design with Tailwind CSS
- 👤 **Anonymous Users**: Local UUID-based user identification

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **PWA**: next-pwa
- **Local Storage**: Dexie (IndexedDB wrapper)
- **Backend**: Supabase (PostgreSQL + Auth)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account (for backend sync)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd Bilim
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
ADMIN_PASSWORD=your_admin_password_here
```

4. Set up Supabase database:
   - Go to your Supabase project
   - Open SQL Editor
   - Run the SQL from `supabase/schema.sql`

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

### Seeding Demo Content

1. Navigate to `/admin` in your browser
2. Enter the admin password (from `.env.local`)
3. Click "Seed Demo Content"

This will create:
- 1 subject (Mathematics Fundamentals)
- 2 topics (Algebra Basics, Geometry Fundamentals)
- 5 lessons
- 2 quizzes

## Project Structure

```
Bilim/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page
│   ├── subjects/          # Subjects listing
│   ├── topic/[id]/        # Topic detail
│   ├── lesson/[id]/       # Lesson viewer
│   └── admin/             # Admin panel
├── components/            # React components
│   └── Quiz.tsx          # Quiz component
├── lib/                   # Core libraries
│   ├── db.ts             # Dexie database
│   ├── types.ts          # TypeScript types
│   ├── supabase.ts       # Supabase client
│   ├── sync.ts           # Sync module
│   ├── progress.ts       # Progress utilities
│   └── seed.ts           # Seed script
├── supabase/             # Database schema
│   └── schema.sql        # Supabase SQL schema
└── public/               # Static assets
    └── manifest.json     # PWA manifest
```

## Database Schema

### Local (IndexedDB via Dexie)
- `subjects`: Subject data
- `topics`: Topic data
- `lessons`: Lesson content (markdown)
- `quizzes`: Quiz definitions
- `pendingEvents`: Events waiting to sync
- `progressState`: Aggregated progress state

### Supabase (PostgreSQL)
- `progress_events`: Append-only event log
- `progress_state`: Aggregated progress state

## Features in Detail

### Offline-First Architecture
- All content is stored locally in IndexedDB
- Progress events are queued locally when offline
- Automatic background sync when connection is restored

### Progress Tracking
- Events are recorded for: lesson_started, lesson_completed, quiz_completed, quiz_attempted
- Progress state tracks completion percentage and last accessed time
- Streak calculation based on daily completions

### Quiz Engine
- Multiple Choice Questions (MCQ)
- Numeric input questions
- Score calculation and results display

## Development

### Building for Production

```bash
npm run build
npm start
```

### PWA Features

The app is configured as a PWA with:
- Service worker for offline support
- App manifest for installability
- Caching strategies for app shell and content

## License

MIT

