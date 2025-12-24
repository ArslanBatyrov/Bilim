# Setup Guide

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   Create `.env.local` file:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ADMIN_PASSWORD=your_admin_password_here
   ```

3. **Set up Supabase:**
   - Go to your Supabase project SQL Editor
   - Copy and run the SQL from `supabase/schema.sql`

4. **Run development server:**
   ```bash
   npm run dev
   ```

5. **Seed demo content:**
   - Navigate to http://localhost:3000/admin
   - Enter your admin password
   - Click "Seed Demo Content"

## PWA Icons

The app includes a basic SVG icon. For production, replace `/public/icon.svg` with proper PNG icons:
- `icon-192x192.png` (192x192 pixels)
- `icon-512x512.png` (512x512 pixels)

Update `public/manifest.json` to reference these PNG files.

## Project Structure

- **app/**: Next.js App Router pages (all client components for IndexedDB access)
- **lib/**: Core libraries (database, sync, types, seed)
- **components/**: Reusable React components
- **supabase/**: Database schema SQL
- **public/**: Static assets and PWA manifest

## Key Features

✅ Offline-first with IndexedDB (Dexie)  
✅ Background sync to Supabase  
✅ Progress tracking with events  
✅ Quiz engine (MCQ + numeric)  
✅ PWA support with service worker  
✅ Anonymous user support (local UUID)  

## Notes

- All database operations happen client-side (IndexedDB)
- Server components are used only for routing shell
- Data fetching happens in client components via useEffect
- Sync happens automatically when online
- Events queue locally when offline

