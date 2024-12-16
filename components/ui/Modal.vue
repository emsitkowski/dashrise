<template>
  <div
    v-if="open"
    id="modal"
    class="fixed flex justify-center items-start top-0 left-0 right-0 w-full h-full px-4 pt-10 pb-20 bg-dark-80% overflow-y-scroll z-[999]"
  >
    <!-- Modal card -->
    <Card class="w-full max-w-md mb-16" ref="modalContainer">
      <template #card-header>
        <!-- Modal header -->
        <span class="text-xl font-semibold py-2 sm:py-0">{{ headerText }}</span>

        <!-- Modal close button -->
        <div class="absolute right-4 sm:right-8">
          <Button class="ml-6" variant="ghost" size="sm" @click="$emit('close')" :icon="true" icon-type="x" />
        </div>
      </template>

      <!-- Modal body -->
      <template #card-body>
        <slot></slot>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import type { ComponentInstance } from "vue";
import type Card from "./Card.vue";
import { detectOutsideClick } from "~/utils/detectOutsideClick";

const props = defineProps(["headerText", "open"]);
const emit = defineEmits(["close"]);

const modalContainer = ref<ComponentInstance<typeof Card>>();

onMounted(() => {
  document.addEventListener("click", handleOutsideClick, { capture: true });
});

onUnmounted(() => {
  document.removeEventListener("click", handleOutsideClick);
});

onUpdated(() => {
  if (props.open === true) {
    disableScrollbar();
  } else {
    enableScrollbar();
  }
});

// Close modal on outside of container click, only if there isn't data-prevent-modal-close attribute on parent element
const handleOutsideClick = (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  const targetParent = target.parentNode as HTMLElement;

  if (!target?.getAttribute("data-prevent-modal-close") && !targetParent?.getAttribute("data-prevent-modal-close")) {
    detectOutsideClick(e, modalContainer.value?.$el, () => emit("close"));
  }
};
</script>

<style scoped></style>
