<template>
  <div
    v-show="isVisible"
    class="absolute top-full w-full p-2 bg-white border-dark-8% max-h-52 overflow-auto z-50 border rounded-b-md shadow-2xl shadow-dark-8%"
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
