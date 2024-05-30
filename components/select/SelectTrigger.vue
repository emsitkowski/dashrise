<template>
  <button
    class="flex justify-between items-center px-3 py-2 bg-white cursor-pointer border border-dark-8% text-start"
    :class="isSelectOpen === true ? 'rounded-t-md' : 'rounded-md'"
    type="button"
  >
    <slot></slot>

    <!-- Chevron arrow -->
    <div class="ml-auto pointer-events-none">
      <svg
        class="stroke-dark-32%"
        :class="{ 'rotate-180': isSelectOpen }"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </div>
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  isSelectOpen: boolean;
}>();
</script>
