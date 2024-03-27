<template>
  <button
    class="relative inline-block rounded-md overflow-hidden"
    :class="[
      variant === 'soft' ? 'bg-primary-8% text-primary-500' : 'bg-primary-500 text-white',
      size === 'sm' ? 'px-3 py-2 text-sm' : 'px-3 py-3',
    ]"
  >
    <div
      class="absolute flex justify-center items-center top-0 left-0 right-0 w-full h-full bg-primary-500"
      v-if="loading"
    >
      <img class="animate-spin duration-100" src="~assets/icons/loader.svg" alt="" />
    </div>
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
defineProps({
  loading: {
    type: Boolean,
  },
  variant: {
    type: String,
  },
  size: {
    type: String,
  },
});
</script>

<style scoped></style>
