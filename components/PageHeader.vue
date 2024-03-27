<template>
  <header class="flex flex-col sm:flex-row gap-4 justify-between items-start">
    <div>
      <h1 class="text-3xl font-bold mb-3">{{ headerText }}</h1>
      <p v-if="subheaderText">{{ subheaderText }}</p>
    </div>
    <Button v-if="button" :icon="buttonIcon" :icon-type="buttonIconType">{{ buttonText }}</Button>
  </header>
</template>

<script setup lang="ts">
const props = defineProps(["headerText", "subheaderText", "button", "buttonText", "buttonIcon", "buttonIconType"]);
</script>

<style scoped></style>
