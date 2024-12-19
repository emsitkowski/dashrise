<template>
  <span
    class="flex justify-center items-center p-2 sm:p-3 rounded-md sm:rounded-lg aspect-square"
    :class="{
      'text-primary-500 bg-primary-4%': variant === 'primary',
      'text-secondary-500 bg-secondary-4%': variant === 'secondary',
      'text-black bg-light-50': variant === 'tertiary',
    }"
  >
    <!-- Arrow-in icon -->
    <svg
      v-if="variant === 'primary'"
      class="stroke-primary-500"
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="7 10 12 15 17 10"></polyline>
      <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>

    <!-- Arrow-out icon -->
    <svg
      v-if="variant === 'secondary'"
      class="stroke-secondary-500"
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="17 8 12 3 7 8"></polyline>
      <line x1="12" y1="3" x2="12" y2="15"></line>
    </svg>

    <!-- Arrow-out icon -->

    <svg
      v-if="variant === 'tertiary'"
      class="stroke-black"
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <line x1="12" y1="1" x2="12" y2="23"></line>
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
    </svg>
  </span>
</template>

<script setup lang="ts">
defineProps({
  variant: {
    type: String,
    default: "primary",
  },
});
</script>

<style scoped></style>
