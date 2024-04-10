<template>
  <div class="flex flex-col items-end">
    <div class="relative w-full h-1 bg-primary-4% rounded-full overflow-hidden">
      <div
        class="absolute top-0 left-0 h-full"
        :class="color === 'primary' ? 'bg-primary-500' : 'bg-secondary-500'"
        :style="`width: ${progress}%`"
      ></div>
    </div>
    <span v-if="label" class="mt-2 text-sm font-semibold" :class="color === 'primary' ? '' : 'text-secondary-500'">{{
      label
    }}</span>
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
