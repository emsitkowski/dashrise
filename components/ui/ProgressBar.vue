<template>
  <div class="flex flex-col items-end">
    <div class="relative w-full h-1 bg-primary-4% rounded-full overflow-hidden">
      <div class="absolute top-0 left-0 h-full" :class="getColor('bar')" :style="`width: ${progress}%`"></div>
    </div>
    <span
      v-if="label"
      v-html="label"
      class="mt-2 bg- text-sm font-medium text-dark-60%"
      :class="getColor('label')"
    ></span>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    label?: string;
    progress: number;
    color: "primary" | "secondary" | "success" | "error" | "unstyled";
  }>(),
  {
    color: "primary",
  }
);

// Computed progress bar and label color classes
const getColor = computed(() => {
  return (type: "bar" | "label") => {
    const classPrefix = type === "bar" ? "bg" : "text";

    if (props.color === "primary") {
      return `${classPrefix}-primary-500`;
    } else if (props.color === "secondary") {
      return `${classPrefix}-secondary-500`;
    } else if (props.color === "success") {
      return `${classPrefix}-success`;
    } else if (props.color === "error") {
      return `${classPrefix}-error`;
    } else if (props.color === "unstyled") {
      return "text-dark-60%";
    }
  };
});
</script>

<style scoped></style>
