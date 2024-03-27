<template>
  <header>
    <h1 class="text-3xl font-bold mb-3">{{ headerText }}</h1>
    <p v-if="subheaderText">{{ subheaderText }}</p>
  </header>
</template>

<script setup lang="ts">
const props = defineProps(["headerText", "subheaderText"]);
</script>

<style scoped></style>
