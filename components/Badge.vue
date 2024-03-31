<template>
  <span
    class="flex justify-center items-center px-3 py-2 text-xs sm:text-sm rounded-md"
    :class="{
      'text-primary-500 bg-primary-4%': variant === 'primary',
      'text-secondary-500 bg-secondary-4%': variant === 'secondary',
    }"
  >
    {{ label }}
  </span>
</template>

<script setup lang="ts">
defineProps({
  label: {
    type: String,
    required: true,
  },
  variant: {
    type: String,
    default: "primary",
  },
});
</script>

<style scoped></style>
