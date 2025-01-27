<script lang="ts" setup>
import StarIcon from '@/icons/StarIcon.vue';
import { getDb } from '@/services/dbService';
import { onMounted, ref } from 'vue';

const props = defineProps({
  tld: {
    type: String,
    required: true
  }
});

const isBookmarked = ref(false);

onMounted(async () => {
  isBookmarked.value = await isAlreadyBookmarked();
})

const isAlreadyBookmarked = async (): Promise<boolean> => {
  const db = await getDb();
  return await db.get('tlds', props.tld) ? true : false;
}

const bookmark = async () => {
  const db = await getDb();
  if (isBookmarked.value) {
    await db.delete('tlds', props.tld);
    emit('bookmark');
    isBookmarked.value = !isBookmarked.value;
    return;
  }
  await db.add('tlds', { tld: props.tld });
  emit('bookmark');
  isBookmarked.value = !isBookmarked.value;
}

const emit = defineEmits(['bookmark']);
</script>
<template>
  <div class="flex p-2 gap-2">
    <button @click="bookmark()" type="button"
      class="text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg"
      :class="{ '!text-yellow-500 !dark:text-yellow-500': isBookmarked }">
      <StarIcon class="w-5 h-5"></StarIcon>
    </button>
    <div>.{{ tld }}</div>
  </div>
</template>