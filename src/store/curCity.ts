import type { ICurCity } from '@/types/curCity'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCurCityStore = defineStore('curCity', () => {
  const city = ref<ICurCity | null>()
  const setCity = (params: ICurCity) => {
    city.value = params
  }
  return {
    city,
    setCity,
  }
})
