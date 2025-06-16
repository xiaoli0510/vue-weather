import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFollowStore = defineStore('follow', () => {
  const cityList = ref<string[]>(['Shenzhen', 'Wuhan', 'Dunhuang', 'Shanghai'])

  const add = (city: string) => {
    cityList.value.push(city)
  }

  return {
    add,
    cityList,
  }
})
