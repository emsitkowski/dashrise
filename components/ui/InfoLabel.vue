<template>
  <div
    class="absolute flex items-center gap-1 sm:gap-2 text-dark-32%"
    :class="[
      { 'flex-col': position === 'vertical' },
      { 'top-0 left-0 right-0 w-full h-full justify-center': mode === 'fullscreen' },
    ]"
  >
    <img class="w-5 sm:w-6" src="~assets/icons/info.svg" alt="" />
    <span class="text-sm sm:text-base text-dark-60%">{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    label: string;
    position: "horizontal" | "vertical";
    mode?: "fullscreen" | "default";
  }>(),
  {
    position: "horizontal",
    mode: "default",
  }
);
</script>
