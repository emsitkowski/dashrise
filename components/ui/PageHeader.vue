<template>
  <header class="flex flex-col sm:flex-row gap-4 justify-between items-start mb-11">
    <div>
      <h1 class="text-3xl sm:text-4xl font-bold mb-3">{{ headerText }}</h1>
      <p v-if="subheaderText">{{ subheaderText }}</p>
    </div>
    <Button
      v-if="button"
      :label="buttonText"
      :icon="buttonIcon"
      :icon-type="buttonIconType"
      :icon-leading="buttonIconLeading"
      @button-click="$emit('button-click')"
    ></Button>
  </header>
</template>

<script setup lang="ts">
const props = defineProps([
  "headerText",
  "subheaderText",
  "button",
  "buttonText",
  "buttonIcon",
  "buttonIconType",
  "buttonIconLeading",
]);

defineEmits(["button-click"]);
</script>

<style scoped></style>
