<script setup lang="ts">
import { useColorMode } from '@vueuse/core';
import { onMounted } from 'vue';
const mode = useColorMode()
onMounted(() => {
  if (mode.value === 'dark') {
    document.documentElement.classList.toggle('dark', true)
  } else {
    document.documentElement.classList.toggle('dark', false)
  }
})
</script>

<template>
  <!-- <Suspense> -->
  <RouterView />
  <!-- </Suspense> -->
</template>

