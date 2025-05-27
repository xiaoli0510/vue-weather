import { useColorMode, useStorage } from '@vueuse/core'
import { watchEffect } from 'vue'

export function useTheme() {
  const mode = useColorMode()
  const isDark = useStorage('theme-dark', window.matchMedia('(prefers-color-scheme: dark)').matches)
  watchEffect(() => {
    document.documentElement.classList.toggle('dark', isDark.value)
  })

  const toggleTheme = () => {
    isDark.value = !isDark.value
    mode.value = mode.value === 'light' ? 'dark' : 'light'
  }

  return {
    isDark,
    toggleTheme,
  }
}
