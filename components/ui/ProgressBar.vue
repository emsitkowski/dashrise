<template>
  <div class="flex flex-col items-end">
    <div class="relative w-full h-1 bg-primary-4% rounded-full overflow-hidden">
      <div class="absolute top-0 left-0 h-full bg-primary-500" :style="`width: ${progress}%`"></div>
    </div>
    <span v-if="label" class="text-primary-500 mt-2 text-sm">{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps({
  label: {
    type: String,
    required: false,
  },
  progress: {
    type: Number,
    required: true,
  },
});
</script>

<style scoped></style>
