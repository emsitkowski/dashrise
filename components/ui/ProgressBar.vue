<template>
  <div class="flex flex-col items-end">
    <div class="relative w-full h-1 bg-primary-4% rounded-full overflow-hidden">
      <div class="absolute top-0 left-0 h-full" :class="$props.color" :style="`width: ${progress}%`"></div>
    </div>
    <span v-if="label" v-html="label" class="mt-2 text-sm text-dark-60%" :class="$props.labelColor"></span>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    label?: string;
    progress: number;
    color: string;
    labelColor?: string;
  }>(),
  {
    color: "primary",
    labelColor: "text-dark-60%",
  }
);
</script>

<style scoped></style>
