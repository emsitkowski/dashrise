<template>
  <form
    class="relative flex flex-col gap-4"
    :class="{
      'after:content-[\'\'] after:absolute after:bg-white-60% after:w-full after:h-full after:top-0 ': loading,
    }"
    @submit.prevent="$emit('submit')"
    novalidate
    autocomplete="off"
  >
    <slot></slot>
  </form>
</template>

<script setup lang="ts">
defineProps(["loading"]);
defineEmits(["submit"]);
</script>

<style scoped></style>
