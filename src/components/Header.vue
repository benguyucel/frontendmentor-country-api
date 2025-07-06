<template>
  <header class="bg-elements shadow-sm flex px-4 xl:px-0">
    <div class="w-7xl font-extrabold  mx-auto py-6 flex items-center justify-between">
      <h1 class="text-3xl text-text">Where in the world?</h1>
      <div class="flex items-center gap-2 cursor-pointer">
        <div class="flex items-center gap-2" v-if="theme === 'dark'" @click="handleThemeMode('light')">
          <LightModeIcon class="w-6 h-6" /> <span class="text-text">Light Mode</span>
        </div>
        <div class="flex items-center gap-2" v-if="theme === 'light'" @click="handleThemeMode('dark')">
          <DarkModeIcon class="w-6 h-6" /> <span class="text-text">Dark Mode</span>
        </div>
      </div>


    </div>
  </header>
</template>
<script setup>
import LightModeIcon from "./icons/LightModeIcon.vue";
import DarkModeIcon from "./icons/DarkModeIcon.vue";
import {ref} from "vue";
const theme = ref('dark')
const handleThemeMode = (val) => {
  const htmlElement = document.getElementById('theme-for-html')
  theme.value = val
  val === 'dark' ? htmlElement.classList.remove('light') : htmlElement.classList.remove('dark')
  document.getElementById('theme-for-html').classList.add(theme.value)
}
</script>