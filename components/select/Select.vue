<template>
  <SelectContainer>
    <SelectTrigger @click="toggleSelect"> {{ selected }} </SelectTrigger>
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

onMounted(() => {
  // Set and emit initial value
  selected.value = props.defaultValue ? (props.defaultValue as string) : props.options[0];
  emit("update:modelValue", selected.value);
});
</script>

<style scoped></style>
