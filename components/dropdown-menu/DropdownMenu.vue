<template>
  <DropdownMenuContainer ref="dropdownContainer">
    <DropdownMenuTrigger @click="toggleSelect" ref="dropdownTrigger">
      <slot></slot>
    </DropdownMenuTrigger>
    <Teleport to="body">
      <DropdownMenuContent :is-visible="isDropdownOpen" ref="dropdownContent">
        <DropdownMenuItem
          v-for="option in options"
          :key="(option as DropdownMenuOption).label"
          @select="handleSelection(option as DropdownMenuOption)"
          @click="toggleSelect"
        >
          {{ (option as DropdownMenuOption).label }}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </Teleport>
  </DropdownMenuContainer>
</template>

<script setup lang="ts">
import type { ComponentInstance } from "vue";
import type { DropdownMenuOption } from "~/src/types/global";
import type DropdownMenuContainer from "./DropdownMenuContainer.vue";
import type DropdownMenuContent from "./DropdownMenuContent.vue";
import type DropdownMenuTrigger from "./DropdownMenuTrigger.vue";
import { detectOutsideClick } from "~/utils/detectOutsideClick";

defineProps({
  options: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["select"]);
const isDropdownOpen = ref<boolean>(false);
const selected = ref<DropdownMenuOption>();
const dropdownContainer = ref<ComponentInstance<typeof DropdownMenuContainer>>();
const dropdownTrigger = ref<ComponentInstance<typeof DropdownMenuTrigger>>();
const dropdownContent = ref<ComponentInstance<typeof DropdownMenuContent>>();

function toggleSelect() {
  isDropdownOpen.value = !isDropdownOpen.value;
  updateDropdownPosition();
}

function handleSelection(option: DropdownMenuOption) {
  selected.value = option;
  emit("select", option);
}

function updateDropdownPosition() {
  const trigger = dropdownTrigger.value!.$el as HTMLElement;
  const content = dropdownContent.value?.$el as HTMLElement;
  const triggerRect = trigger.getBoundingClientRect();

  const isCloserToLeftEdge = trigger.getBoundingClientRect().left < window.innerWidth / 2 ? true : false;
  isCloserToLeftEdge
    ? (content.style.cssText = `top: ${triggerRect.top + window.scrollY}px; left: ${
        triggerRect.x
      }px;  transform: translateY(${triggerRect.height}px)`)
    : (content.style.cssText = `top: ${triggerRect.top + window.scrollY}px; left: ${
        triggerRect.x
      }px; transform: translate(${-100 + triggerRect.width}%, ${triggerRect.height}px)`);
}

const handleOutsideClick = (e: MouseEvent) => {
  if (dropdownContainer.value) {
    detectOutsideClick(e, dropdownContainer.value.$el, () => (isDropdownOpen.value = false));
  }
};

const handleResize = () => {
  isDropdownOpen.value = false;
};

onMounted(() => {
  document.addEventListener("click", handleOutsideClick);
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  document.removeEventListener("click", handleOutsideClick);
  window.removeEventListener("click", handleResize);
});
</script>

<style scoped></style>
