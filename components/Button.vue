<template>
  <button
    class="relative inline-block px-3 py-3 bg-primary-500 text-white rounded-md overflow-hidden"
    :class="{ 'bg-green-600': loading }"
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
defineProps(["loading"]);
</script>

<style scoped></style>
