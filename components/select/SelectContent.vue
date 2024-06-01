<template>
  <div
    v-show="isVisible"
    class="p-2 bg-white border border-dark-8% max-h-60 overflow-auto z-[9999] rounded-b-md shadow-2xl shadow-dark-8%"
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
