<template>
  <div class="flex flex-col gap-2" ref="formField">
    <label class="text-sm font-medium" :for="randomFormFieldID">{{ label }}</label>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { nanoid } from "nanoid";
defineProps(["label", "id"]);

const formField = ref();
const randomFormFieldID = ref(nanoid());

onMounted(() => {
  const elements = formField.value.children;

  // Set id for every input to match label's "for" attribute
  for (let index = 0; index < elements.length; index++) {
    if (elements[index].tagName === "INPUT") elements[index].setAttribute("id", randomFormFieldID.value);
  }
});
</script>

<style scoped></style>
