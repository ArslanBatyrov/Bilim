import { syncToSupabase } from './supabase'

export { syncToSupabase }

// Background sync when online
if (typeof window !== 'undefined') {
  // Sync on page load if online
  if (navigator.onLine) {
    import('./db').then(({ syncEvents }) => syncEvents())
  }

  // Sync when coming back online
  window.addEventListener('online', () => {
    import('./db').then(({ syncEvents }) => syncEvents())
  })

  // Periodic sync (every 5 minutes)
  setInterval(() => {
    if (navigator.onLine) {
      import('./db').then(({ syncEvents }) => syncEvents())
    }
  }, 5 * 60 * 1000)
}

