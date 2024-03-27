<template>
  <button
    class="relative inline-flex justify-center items-center gap-1 rounded-md overflow-hidden"
    :class="[
      variant === 'soft' ? 'bg-primary-8% text-primary-500' : 'bg-primary-500 text-white',
      size === 'sm' ? 'px-3 py-2 text-sm' : 'px-3 py-3',
    ]"
  >
    <div class="-ml-1" v-if="icon && iconType === 'plus'">
      <img class="w-5 h-full" src="~assets/icons/plus.svg" alt="" />
    </div>
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
  icon: {
    type: Boolean,
  },
  iconType: {
    type: String,
  },
});
</script>

<style scoped></style>
