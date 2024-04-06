<template>
  <Modal :open="open" header-text="Add category" @close="$emit('close')">
    <!-- Category form -->
    <Form @submit="handleSubmit" :loading="isSubmitting" :state="formState" :schema="formSchema">
      <!-- Name -->
      <FormField label="Name">
        <FormInput name="Name" type="text" placeholder="Enter transaction name" v-model="formState.name" />
      </FormField>

      <!-- Limit -->
      <FormField label="Limit">
        <FormInput name="Limit" type="text" placeholder="Enter category limit" v-model="formState.limitValue" />
      </FormField>

      <!-- Submit button -->
      <Button label="Add category" class="mt-4" ref="submitBtn" :loading="isSubmitting" />
    </Form>
  </Modal>
</template>

<script setup lang="ts">
import { categorySchema } from "~/src/schemas/form";
import type { Category } from "~/src/types/global";

const props = defineProps(["open"]);
const emit = defineEmits(["close", "success"]);

const isSubmitting = ref(false);
const formState = ref<any>({});

const formSchema = ref(categorySchema); // set initial form schema

async function handleSubmit() {
  // Turn on loading state
  toggleFormLoading();

  // Save transaction
  await useCategoryStore().saveCategory(formState.value as Category);

  // Emit success event
  emit("success");

  // Restore form to initial state
  clearInputs();
  formState.value = {};

  // Turn off loading state
  toggleFormLoading();
}

function toggleFormLoading() {
  isSubmitting.value = !isSubmitting.value;
}
</script>

<style scoped></style>
