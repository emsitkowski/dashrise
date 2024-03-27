<template>
  <button
    class="relative inline-flex justify-center items-center shrink-0 gap-2 rounded-md overflow-hidden duration-300"
    :class="[
      variant === 'soft' ? 'bg-primary-8% text-primary-500' : '',
      variant === 'ghost' ? ' text-dark-32% hover:text-primary-500 hover:bg-primary-2%' : '',
      variant === undefined ? ' bg-primary-500 text-white' : '',
      size === 'sm' ? 'px-3 py-2 text-sm' : 'px-3 py-3',
    ]"
    @click="$emit('button-click')"
  >
    <div class="-ml-1" v-if="icon">
      <img v-if="iconType === 'plus'" class="w-5 h-full" src="~assets/icons/plus.svg" alt="" />
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

defineEmits(["button-click"]);
</script>

<style scoped></style>
