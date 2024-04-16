<template>
  <button
    class="relative group inline-flex justify-center items-center shrink-0 gap-1 rounded-md leading-none overflow-hidden duration-300"
    :class="[
      variant === 'soft' ? 'bg-primary-8% text-primary-500' : '',
      variant === 'ghost' ? ' text-dark-32% hover:text-primary-500 hover:bg-primary-2%' : '',
      variant === undefined ? ' bg-primary-500 text-white hover:bg-primary-600' : '',
      size === 'sm' ? 'px-3 py-2 text-sm' : 'px-4 py-4',
    ]"
    @click="$emit('button-click')"
  >
    <div class="-ml-1" v-if="icon">
      <img v-if="iconType === 'plus'" class="w-5 h-full" src="~assets/icons/plus.svg" alt="" />
    </div>
    <SpinnerLoader :loading="loading" bg-color-class="bg-primary-500" stroke-color-class="stroke-white" />
    <div class="text-dark-32% stroke-dark-32% hover:text-primary-500 group-hover:stroke-primary-500 duration-300">
      <slot></slot>
    </div>

    {{ label }}
  </button>
</template>

<script setup lang="ts">
defineProps({
  loading: {
    type: Boolean,
  },
  label: {
    type: String,
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
