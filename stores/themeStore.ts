import { create } from 'zustand'
import { createJSONStorage, persist, StateStorage } from 'zustand/middleware'

export type Theme = 'light' | 'dark'

interface ThemeStore {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

// In-memory fallback for environments where localStorage fails (e.g., incognito/private mode quotas)
const memoryStorage = new Map<string, string>()

const safeStorage: StateStorage = {
  getItem: (key) => {
    if (typeof window === 'undefined') return null
    try {
      return window.localStorage.getItem(key)
    } catch (error) {
      return memoryStorage.get(key) ?? null
    }
  },
  setItem: (key, value) => {
    if (typeof window === 'undefined') return
    try {
      window.localStorage.setItem(key, value)
    } catch (error) {
      memoryStorage.set(key, value)
    }
  },
  removeItem: (key) => {
    if (typeof window === 'undefined') return
    try {
      window.localStorage.removeItem(key)
    } catch (error) {
      memoryStorage.delete(key)
    }
  },
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: 'light',

      setTheme: (theme: Theme) => {
        set({ theme })
        // Apply changes to DOM immediately
        if (typeof document !== 'undefined') {
          document.documentElement.classList.toggle('dark', theme === 'dark')
        }
      },

      toggleTheme: () => {
        const { theme } = get()
        const newTheme = theme === 'light' ? 'dark' : 'light'
        get().setTheme(newTheme) // Call setTheme to ensure DOM updates
      },
    }),
    {
      name: 'sacube.theme',
      storage: createJSONStorage(() => safeStorage),
      // This runs when the store finishes loading from local storage
      onRehydrateStorage: () => (state) => {
        if (typeof document !== 'undefined' && state) {
          document.documentElement.classList.toggle('dark', state.theme === 'dark')
        }
      },
    }
  )
)