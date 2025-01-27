<template>
  <button @click="toggleDark()" type="button"
    class="text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 rounded-lg">
    <MoonIcon v-if="isDark" class="w-5 h-5"></MoonIcon>
    <SunIcon v-else class="w-5 h-5"></SunIcon>
  </button>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useDark, useToggle } from '@vueuse/core'
import MoonIcon from '@/icons/MoonIcon.vue'
import SunIcon from '@/icons/SunIcon.vue'

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>