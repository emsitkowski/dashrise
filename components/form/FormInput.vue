<template>
  <input
    :value="modelValue"
    @input="handleInput"
    class="px-3 py-2 bg-none border border-gray-300 rounded-md"
    :class="$props.disabled ? 'bg-dark-2% text-dark-60% cursor-not-allowed' : ''"
    :type="props.type"
    :name="props.name"
    :placeholder="props.placeholder"
    autocapitalize="none"
    :disabled="props.disabled"
  />
</template>

<script setup lang="ts">
const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
  type: {
    required: true,
    type: String,
  },
  placeholder: {
    type: String,
  },
  name: {
    type: String,
  },
  disabled: {
    type: Boolean,
  },
  modelValue: {},
});

function handleInput(e: Event) {
  const target = e.target as HTMLInputElement;
  emit("update:modelValue", target.value);
}
</script>

<style scoped></style>
