<template>
  <VDropdown theme="select" v-model:shown="isOpen">
    <!-- This will be the popover reference (for the events and position) -->
    <div
      class="select flex justify-between items-center px-3 py-2 bg-white-60% border-gray-300 cursor-pointer border rounded-md"
      ref="wrapper"
    >
      <div class="selected pointer-events-none h-full w-full">
        <span ref="select">{{ selected ? selected : "&nbsp;" }}</span>
      </div>
      <div class="icon pointer-events-none">
        <img :class="{ 'rotate-180': isOpen }" src="~assets/icons/chevron-down.svg" alt="" />
      </div>
    </div>

    <!-- This will be the content of the popover -->
    <template #popper>
      <DropdownList v-bind="$props" @select="handleSelection" ref="content" />
    </template>
  </VDropdown>
</template>

<script setup lang="ts">
const emit = defineEmits(["update:modelValue", "select"]);
const props = defineProps({
  defaultSelection: {
    type: String,
  },
  options: {
    type: Array,
    required: true,
  },
  footerInfo: {
    type: Boolean,
    default: false,
  },
  footerInfoLabel: {
    type: String,
  },
  emptyState: {
    type: Boolean,
  },
  emptyStateLabel: {
    type: String,
  },
});

const wrapper = ref<HTMLElement>();
const content = ref<any>();
const select = ref<HTMLElement>();
const selected = ref(props.options.length > 0 ? props.options[0] : "");
const isOpen = ref<Boolean>(false);

// Emit initial value
emit("update:modelValue", props.defaultSelection ? props.defaultSelection : props.options[0]);

function handleSelection(value: string) {
  // Update selected value
  selected.value = value;

  // Close dropdown
  isOpen.value = false;

  // Emit event with selected value
  emit("update:modelValue", value);

  // Emit value change event
  emit("select", value);
}

function updatePopoverSize() {
  content.value.list.style.width = `${wrapper.value?.getBoundingClientRect().width}px`;
}

// Set correct popover content size every time dropdown opens
watch(isOpen, (newVal) => {
  if (newVal) {
    nextTick(() => {
      setTimeout(() => {
        updatePopoverSize();
      }, 0);
    });
  }
});

onMounted(() => {
  // Set initial value
  selected.value = props.defaultSelection ? (props.defaultSelection as string) : props.options[0];

  // Set correct popover content size every time browser resizes
  window.addEventListener("resize", updatePopoverSize);
});
</script>

<style scoped>
.v-popper--theme-select .v-popper__arrow-outer {
  visibility: hidden !important;
}

.v-popper--theme-select .v-popper__arrow-inner {
  visibility: hidden !important;
}
</style>
