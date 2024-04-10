<template>
  <div class="relative flex flex-col select-none" @click="handleClick">
    <div
      class="select flex justify-between items-center px-3 py-2 bg-none border-gray-300 cursor-pointer"
      :class="isOpen ? 'border-t border-l border-r border-b border-b-transparent rounded-t-md' : 'border rounded-md'"
    >
      <div class="selected pointer-events-none h-full">
        <span ref="select">{{ selected ? selected : "&nbsp;" }}</span>
      </div>
      <div class="icon pointer-events-none">
        <img :class="{ 'rotate-180': isOpen }" src="~assets/icons/chevron-down.svg" alt="" />
      </div>
    </div>
    <ul
      class="absolute top-0 translate-y-10 w-full px-2 py-2 bg-white border-gray-300 max-h-52 overflow-auto z-50"
      :class="isOpen ? 'border-b border-l border-r rounded-b-md border-t' : 'border rounded-md hidden'"
    >
      <li v-if="options.length > 0" v-for="option in options" class="hover:bg-dark-4% px-3 py-2 rounded cursor-pointer">
        {{ option }}
      </li>
      <li v-else class="px-3 py-2 rounded cursor-default pointer-events-none">No categories found...</li>
      <li class="pointer-events-none px-3 py-2 mt-2 border-t border-primary-8% text-dark-32% cursor-default">
        Create new categories on the budget page
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["update:modelValue"]);
const props = defineProps(["options"]);

const select = ref();
const selected = ref(props.options.length > 0 ? props.options[0].label : "");
const isOpen = ref(false);

// Emit initial value
emit("update:modelValue", props.options.length > 0 ? props.options[0].label : "");

function handleClick(e: Event) {
  const target = e.target as HTMLElement;

  // Change selected value
  if (target.tagName === "LI" && target.textContent) {
    selected.value = target.textContent;

    // Close dropdown
    isOpen.value = false;

    // Emit event with selected value
    emit("update:modelValue", target.textContent);
  } else {
    // Toggle dropdown
    isOpen.value = !isOpen.value;
  }
}
</script>

<style scoped></style>
