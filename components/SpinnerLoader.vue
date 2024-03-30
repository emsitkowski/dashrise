<template>
  <div
    class="absolute flex justify-center items-center top-0 left-0 right-0 w-full h-full"
    :class="bgColorClass"
    v-if="loading"
  >
    <img class="animate-spin duration-100" src="~assets/icons/loader.svg" alt="" />
  </div>
</template>

<script setup lang="ts">
defineProps(["loading", "bgColorClass"]);
</script>

<style scoped></style>
