<template>
  <label class="font-medium" :for="inputID">{{ props.label }}</label>
</template>

<script setup lang="ts">
const props = defineProps(["label", "inputID"]);
</script>

<style scoped></style>
