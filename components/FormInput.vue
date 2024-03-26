<template>
  <input
    v-if="props.type === 'text'"
    @input="$emit('input', $event.target)"
    class="px-3 py-2 bg-none border border-gray-300 rounded-md placeholder:text-sm"
    type="text"
    :name="props.name"
    :id="props.id"
    :placeholder="props.placeholder"
  />
  <input
    v-if="props.type === 'password'"
    @input="$emit('input', $event.target)"
    class="px-3 py-2 bg-none border border-gray-300 rounded-md placeholder:text-sm"
    type="password"
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
