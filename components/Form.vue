<template>
  <form
    class="relative flex flex-col gap-4"
    :class="{
      'after:content-[\'\'] after:absolute after:bg-white-60% after:w-full after:h-full after:top-0 ': loading,
    }"
    @submit.prevent="$emit('submit', formData), unfocusInputs()"
    novalidate
    autocomplete="off"
  >
    <FormField v-for="(field, index) in fields">
      <FormLabel :id="index" :label="field.label" />
      <FormInput
        :id="index.toString()"
        :type="field.type"
        :name="field.name"
        :placeholder="field.placeholder"
        @input="handleInput"
      ></FormInput>
    </FormField>

    <slot></slot>
  </form>
</template>

<script setup lang="ts">
defineProps(["fields", "loading"]);
defineEmits(["submit"]);

const formData = ref({});

function handleInput(target: HTMLInputElement) {
  const inputType = target.getAttribute("name");

  if (inputType) {
    (formData.value as any)[inputType.toLowerCase()] = target.value;
  }

  console.log(formData.value);
}
</script>

<style scoped></style>
