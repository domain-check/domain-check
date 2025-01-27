<template>
  <div v-if="modelValue" role="alert"
    :class="classes"
    class="p-4 mb-4 text-sm rounded-lg">
    <span class="font-medium" v-if="slots.title"><slot name="title"></slot></span> 
    <slot v-if="slots.default"/>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const modelValue = defineModel<boolean>({ default: true })
const props = defineProps({
  type: {
    type: String,
    default: 'info'
  }
})
const slots = defineSlots<{
  title: string,
  default: string
}>()
const close = () => modelValue.value = false;

const classes = computed(()=>{
  if(props.type === 'info'){
    return 'text-blue-800 bg-blue-50 dark:bg-gray-800 dark:text-blue-400'
  }
  if(props.type === 'error'){
    return 'text-red-800 bg-red-100'
  }
})
</script>