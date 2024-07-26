<template>
  <div>
    <form
      class="relative flex flex-col gap-6"
      :class="{
        'after:content-[\'\'] after:absolute after:bg-white-60% after:w-full after:h-full after:top-0 ': loading,
      }"
      @submit.prevent="handleSubmit"
      novalidate
      autocomplete="off"
      ref="form"
    >
      <slot></slot>
    </form>

    <!-- Validation error -->
    <p v-if="validationError" class="text-sm text-red-500 text-center mt-3">
      {{ validationError }}
    </p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps(["state", "schema", "loading"]);
const emit = defineEmits(["submit"]);
const validationError = ref<string>("");
const form = ref<HTMLFormElement>();

function handleSubmit() {
  // Clear any previous validation errors
  validationError.value = "";

  // Unfocus inputs
  unfocusInputs();

  // Validate form
  const { error } = useFormValidation(props.schema, props.state);

  if (error) {
    validationError.value = error.message;
  } else {
    emit("submit");
  }
}
</script>
