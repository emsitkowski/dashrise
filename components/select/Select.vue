<template>
  <SelectContainer ref="selectContainer">
    <!-- Select trigger -->
    <SelectTrigger @click="toggleSelect" ref="selectTrigger" :is-select-open="isSelectOpen">
      {{ selected }}
    </SelectTrigger>

    <Teleport to="body">
      <!-- Select content underlay (prevents from clicking other page elements when select menu is open) -->
      <div
        v-if="isSelectOpen"
        class="fixed top-0 left-0 right-0 w-screen h-screen z-[9998] touch-none"
        data-prevent-modal-close="true"
      ></div>

      <!-- Select content -->
      <SelectContent
        :is-visible="isSelectOpen"
        :class="$props.mode === 'modal' ? 'fixed' : 'absolute'"
        ref="selectContent"
        data-prevent-modal-close="true"
      >
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

        <!-- Select footer -->
        <SelectItem
          v-if="footerLabel"
          class="flex items-center gap-2 px-3 py-2 mt-2 text-sm border-t border-primary-8% cursor-default opacity-50 pointer-events-none"
        >
          <img class="w-5 h-5" src="~assets/icons/info.svg" alt="" />
          <span>
            {{ footerLabel }}
          </span>
        </SelectItem>
      </SelectContent>
    </Teleport>
  </SelectContainer>
</template>

<script setup lang="ts">
import { withDefaults } from "vue";
import type { ComponentInstance } from "vue";
import type SelectTrigger from "./SelectTrigger.vue";
import type SelectContainer from "./SelectContainer.vue";
import type SelectContent from "./SelectContent.vue";
import { detectOutsideClick } from "~/utils/detectOutsideClick";

const emit = defineEmits(["update:modelValue", "select"]);

const props = withDefaults(
  defineProps<{
    options: Array<string>;
    defaultValue?: string | undefined;
    emptyLabel?: string;
    footerLabel?: string;
    mode?: "modal" | "normal";
  }>(),
  {
    emptyLabel: "No items found",
    mode: "normal",
  }
);

const isSelectOpen = ref<boolean>(false);
const selected = ref(props.defaultValue ? props.defaultValue : props.options[0]);
const selectTrigger = ref<ComponentInstance<typeof SelectTrigger>>();
const selectContainer = ref<ComponentInstance<typeof SelectContainer>>();
const selectContent = ref<ComponentInstance<typeof SelectContent>>();

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

  // Set correct select content position for teleport
  updateSelectContentPos();
}

const handleOutsideClick = (e: MouseEvent) => {
  detectOutsideClick(e, selectContainer.value?.$el, () => (isSelectOpen.value = false));
};

const closeSelectMenu = () => {
  isSelectOpen.value = false;
};

onMounted(() => {
  // Set and emit initial value
  selected.value = props.defaultValue ? (props.defaultValue as string) : props.options[0];
  emit("update:modelValue", selected.value);

  document.addEventListener("click", handleOutsideClick);
  window.addEventListener("resize", closeSelectMenu);
  window.visualViewport?.addEventListener("resize", closeSelectMenu); // fixes wrong select menu positioning virtual keyboard show/hide
});

onUnmounted(() => {
  document.removeEventListener("click", handleOutsideClick);
  window.removeEventListener("click", closeSelectMenu);
  window.visualViewport?.removeEventListener("resize", updateSelectContentPos);
});

function updateSelectContentPos() {
  const container = selectContainer.value?.$el as HTMLElement;
  const content = selectContent.value?.$el as HTMLElement;

  // Check if mode is modal and set correct y position + close select menu on modal container scroll
  if (content) {
    if (props.mode === "modal") {
      content.style.top = `${container.getBoundingClientRect().top + container.clientHeight}px`;

      document.querySelector("#modal")?.addEventListener("scroll", closeSelectMenu);
    } else {
      content.style.top = `${
        container.getBoundingClientRect().y + window.scrollY + container.getBoundingClientRect().height
      }px`;
    }

    // Set correct content x position and width using CSS
    content.style.cssText += `left: ${container.getBoundingClientRect().left}px; width: ${
      container.getBoundingClientRect().width
    }px`;
  }
}
</script>

<style scoped></style>
