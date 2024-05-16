<template>
  <VDropdown theme="select" :distance="10" v-model:shown="isOpen">
    <!-- This will be the popover reference (for the events and position) -->
    <slot></slot>

    <!-- This will be the content of the popover -->
    <template #popper>
      <DropdownList :options="options" @select="handleSelection" ref="content" />
    </template>
  </VDropdown>
</template>

<script setup lang="ts">
import type { DropdownListAction } from "~/src/types/global";
const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["select"]);

const isOpen = ref<Boolean>(false);

function handleSelection(e: DropdownListAction) {
  // Close popover
  isOpen.value = false;

  // Emit select event
  emit("select", e.action);
}
</script>

<style scoped></style>
