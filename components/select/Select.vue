<template>
  <SelectContainer ref="selectContainer">
    <SelectTrigger @click="toggleSelect" ref="selectTrigger" :is-select-open="isSelectOpen">
      {{ selected }}
    </SelectTrigger>
    <SelectContent :is-visible="isSelectOpen">
      <SelectItem
        v-if="options.length > 0"
        v-for="option in options"
        @select="handleSelection(option as string)"
        @click="toggleSelect"
      >
        {{ option }}
      </SelectItem>
      <SelectItem v-else class="pointer-events-none">
        {{ emptyLabel }}
      </SelectItem>
      <SelectItem
        v-if="footerLabel"
        class="flex items-center gap-2 px-3 py-2 mt-2 text-sm border-t border-primary-8% cursor-default opacity-50 pointer-events-none"
      >
        <img class="w-5 h-5" src="~assets/icons/info.svg" alt="" />
        {{ footerLabel }}
      </SelectItem>
    </SelectContent>
  </SelectContainer>
</template>

<script setup lang="ts">
import type { ComponentInstance } from "vue";
import type SelectTrigger from "./SelectTrigger.vue";
import type SelectContainer from "./SelectContainer.vue";
import { detectOutsideClick } from "~/utils/detectOutsideClick";

const emit = defineEmits(["update:modelValue", "select"]);

const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
  defaultValue: {
    type: String,
  },
  emptyLabel: {
    type: String,
    default: "No items found",
  },
  footerLabel: {
    type: String,
  },
});

const isSelectOpen = ref<boolean>(false);
const selected = ref(props.defaultValue ? props.defaultValue : props.options[0]);
const selectTrigger = ref<ComponentInstance<typeof SelectTrigger>>();
const selectContainer = ref<ComponentInstance<typeof SelectContainer>>();

function handleSelection(option: string) {
  // Emit events with selected value
  emit("update:modelValue", option);
  emit("select");

  // Update selected value
  selected.value = option;
}

// Function to toggle select content visibility
function toggleSelect() {
  isSelectOpen.value = !isSelectOpen.value;
}

const handleOutsideClick = (e: MouseEvent) => {
  if (selectContainer.value) {
    detectOutsideClick(e, selectContainer.value.$el, () => (isSelectOpen.value = false));
  }
};

const handleResize = () => {
  isSelectOpen.value = false;
};

onMounted(() => {
  // Set and emit initial value
  selected.value = props.defaultValue ? (props.defaultValue as string) : props.options[0];
  emit("update:modelValue", selected.value);

  document.addEventListener("click", handleOutsideClick);
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  document.removeEventListener("click", handleOutsideClick);
  window.removeEventListener("click", handleResize);
});
</script>

<style scoped></style>
