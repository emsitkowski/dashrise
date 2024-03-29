<template>
  <input
    @input="$emit('input', $event.target)"
    class="px-3 py-2 bg-none border border-gray-300 rounded-md"
    :type="props.type"
    :name="props.name"
    :id="props.id"
    :placeholder="props.placeholder"
  />
</template>

<script setup lang="ts">
const emits = defineEmits(["input"]);
const props = defineProps({
  id: {
    required: true,
    type: String,
  },
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
});
</script>

<style scoped></style>
