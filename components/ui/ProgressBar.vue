<template>
  <div class="flex flex-col items-end">
    <div class="relative w-full h-1 bg-primary-4% rounded-full overflow-hidden">
      <div
        class="absolute top-0 left-0 h-full"
        :class="[{ 'bg-primary-500': color === 'primary' }, { 'bg-secondary-500': color === 'secondary' }]"
        :style="`width: ${progress}%`"
      ></div>
    </div>
    <span
      v-if="label"
      v-html="label"
      class="mt-2 text-sm font-medium text-dark-60%"
      :class="color === 'primary' ? '' : 'text-secondary-500'"
    ></span>
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
  color: {
    type: String,
    default: "primary",
  },
});
</script>

<style scoped></style>
