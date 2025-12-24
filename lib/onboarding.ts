const ONBOARDING_KEY = 'bilim_onboarding_completed'

export function hasCompletedOnboarding(): boolean {
  if (typeof window === 'undefined') return false
  return localStorage.getItem(ONBOARDING_KEY) === 'true'
}

export function completeOnboarding(): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(ONBOARDING_KEY, 'true')
  }
}

