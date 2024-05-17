<template>
  <div
    v-show="isVisible"
    class="absolute p-2 mt-1 sm:mt-2 bg-white border-gray-300 max-h-52 overflow-auto z-50 border rounded-md shadow-2xl"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineProps({
  isVisible: {
    type: Boolean,
    default: false,
    required: true,
  },
});
</script>

<style scoped></style>
