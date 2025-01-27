<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import { getTlds } from '@/services/rdapService';
import TldItem from '@/components/TldItem.vue';
import SpinnerIcon from '@/icons/SpinnerIcon.vue';

const isLoading = ref(true);
const tlds = ref<string[]>();

onMounted(async () => {
  await fetchTlds();
})

const fetchTlds = async () => {
  isLoading.value = true;
  tlds.value = await getTlds();
  isLoading.value = false;
}
</script>

<template>
  <DefaultLayout>
    <div v-if="isLoading" class="flex items-center justify-center">
      <SpinnerIcon class="w-12 h-12 fill-neutral-800 text-neutral-500"></SpinnerIcon>
    </div>
    <div>
      <template v-for="tld, index in tlds" :key="index">
        <TldItem :tld></TldItem>
        <hr class="w-full h-px bg-gray-200 border-0 dark:bg-gray-700">
      </template>
    </div>
  </DefaultLayout>
</template>
