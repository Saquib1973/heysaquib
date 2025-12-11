import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Theme = 'light' | 'dark'

interface ThemeStore {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
  initTheme: () => void
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: 'light',

      setTheme: (theme: Theme) => {
        set({ theme })
        // Update DOM
        if (typeof document !== 'undefined') {
          document.documentElement.classList.toggle('dark', theme === 'dark')
        }
      },

      toggleTheme: () => {
        const currentTheme = get().theme
        const newTheme = currentTheme === 'light' ? 'dark' : 'light'
        get().setTheme(newTheme)
      },

      initTheme: () => {
        if (typeof document !== 'undefined') {
          const storedTheme = localStorage.getItem('sacube.theme') as Theme | null
          const theme = storedTheme ?? 'light'
          set({ theme })
          document.documentElement.classList.toggle('dark', theme === 'dark')
        }
      },
    }),
    {
      name: 'sacube.theme',
      storage: {
        getItem: (key) => {
          if (typeof window === 'undefined') return null
          const value = localStorage.getItem(key)
          return value
            ? JSON.parse(value)
            : null
        },
        setItem: (key, value) => {
          if (typeof window !== 'undefined') {
            localStorage.setItem(key, JSON.stringify(value))
          }
        },
        removeItem: (key) => {
          if (typeof window !== 'undefined') {
            localStorage.removeItem(key)
          }
        },
      },
    }
  )
)
