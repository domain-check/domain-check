<script lang="ts" setup>
import DarkModeSwitch from '@/components/DarkModeSwitch.vue';
import BurgerIcon from '@/icons/BurgerIcon.vue';
import CloseIcon from '@/icons/CloseIcon.vue';
import GithubIcon from '@/icons/GithubIcon.vue';
import router from '@/router';
import { ref } from 'vue';

const showMobileMenu = ref(false);
</script>

<template>
  <div class="flex flex-col min-h-screen items-center">
    <div class="flex w-full h-16 px-4 py-2 justify-end items-center">
      <div class="sm:hidden text-neutral-900 dark:text-neutral-100">
        <button @click="showMobileMenu = true" :class="{ 'block': !showMobileMenu, 'hidden': showMobileMenu }"
          class="text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 rounded-lg">
          <span class="sr-only">Open menu</span>
          <BurgerIcon class="w-5 h-5"></BurgerIcon>
        </button>
        <button @click="showMobileMenu = false" :class="{ 'block': showMobileMenu, 'hidden': !showMobileMenu }"
          class="text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 rounded-lg">
          <span class="sr-only">Close menu</span>
          <CloseIcon class="w-6 h-6"></CloseIcon>
        </button>
      </div>
      <div class="hidden sm:flex gap-12 justify-end items-center">
        <RouterLink :to="{ name: 'Search' }"
          :class="{ 'border-b-2 border-neutral-900 dark:border-neutral-100': router.currentRoute.value.name === 'Search' }"
          class="font-medium text-lg text-neutral-900 dark:text-neutral-100">
          Search</RouterLink>
        <RouterLink :to="{ name: 'WatchList' }"
          :class="{ 'border-b-2 border-neutral-900 dark:border-neutral-100': router.currentRoute.value.name === 'WatchList' }"
          class="font-medium text-lg text-neutral-900 dark:text-neutral-100">
          Watch list</RouterLink>
        <RouterLink :to="{ name: 'ExtensionList' }"
          :class="{ 'border-b-2 border-neutral-900 dark:border-neutral-100': router.currentRoute.value.name === 'ExtensionList' }"
          class="font-medium text-lg text-neutral-900 dark:text-neutral-100">
          Extensions</RouterLink>
        <DarkModeSwitch />
      </div>
    </div>
    <div class="flex justify-center items-center px-4 py-2 mb-8">
      <h1 class="text-3xl font-extrabold text-neutral-900 dark:text-neutral-100">
        <router-link :to="{ name: 'Search' }">Domain Check</router-link>
      </h1>
    </div>
    <main :class="{ 'block': !showMobileMenu, 'hidden': showMobileMenu }"
      class="px-4 py-2 max-w-lg w-full text-neutral-900 dark:text-neutral-100">
      <slot />
    </main>
    <div :class="{ 'block': showMobileMenu, 'hidden': !showMobileMenu }"
      class="px-4 py-2 flex-1 flex flex-col gap-12 items-center text-neutral-900 dark:text-neutral-100">
      <RouterLink :to="{ name: 'Search' }"
        :class="{ 'border-b-2 border-neutral-900 dark:border-neutral-100': router.currentRoute.value.name === 'Search' }"
        class="font-medium text-lg text-neutral-900 dark:text-neutral-100">
        Search</RouterLink>
      <RouterLink :to="{ name: 'WatchList' }"
        :class="{ 'border-b-2 border-neutral-900 dark:border-neutral-100': router.currentRoute.value.name === 'WatchList' }"
        class="font-medium text-lg text-neutral-900 dark:text-neutral-100">
        Watch list</RouterLink>
      <RouterLink :to="{ name: 'ExtensionList' }"
        :class="{ 'border-b-2 border-neutral-900 dark:border-neutral-100': router.currentRoute.value.name === 'ExtensionList' }"
        class="font-medium text-lg text-neutral-900 dark:text-neutral-100">
        Extensions</RouterLink>
      <DarkModeSwitch />
    </div>

    <footer class="flex fixed bottom-0 w-full h-8 px-4 bg-neutral-200  dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100">
      <div class="flex w-full justify-end self-center">
        <a href="https://github.com/domain-check/domain-check.github.io" target="_blank" class="flex items-center text-sm gap-1">
          <GithubIcon class="w-5 h-5"></GithubIcon>
          <div>GitHub</div>
        </a>
      </div>
    </footer>
  </div>
</template>
