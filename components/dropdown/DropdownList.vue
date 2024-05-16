<template>
  <ul class="px-2 py-2 bg-white border-gray-300 max-h-52 overflow-auto z-50 border rounded-md" ref="list">
    <li
      v-if="options.length > 0"
      v-for="option in options"
      class="hover:bg-dark-4% px-3 py-2 rounded cursor-pointer [&>div]:pointer-events-none"
      @click="handleSelection(option)"
    >
      <div v-if="typeof options[0] === 'string'">
        {{ option }}
      </div>

      <div v-else>
        {{ (option as DropdownListAction).action }}
        {{ (option as DropdownListAction).icon }}
      </div>
    </li>

    <li v-if="emptyState" class="px-3 py-2 rounded cursor-default pointer-events-none">{{ emptyStateLabel }}</li>
    <li
      v-if="footerInfo"
      class="pointer-events-none px-3 py-2 mt-2 border-t border-primary-8% text-dark-32% cursor-default"
    >
      {{ footerInfoLabel }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { DropdownListAction } from "~/src/types/global";
const emit = defineEmits(["select"]);

const props = defineProps(["options", "footerInfo", "footerInfoLabel", "emptyState", "emptyStateLabel"]);

const list = ref<HTMLElement>();

defineExpose({
  list,
});

function handleSelection(selection: any) {
  emit("select", selection);
}
</script>

<style scoped></style>
