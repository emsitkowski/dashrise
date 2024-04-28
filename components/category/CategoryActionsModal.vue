<template>
  <Modal :open="open" :header-text="mode === 'edit' ? 'Edit category' : 'Add category'" @close="$emit('close')">
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
      <div class="flex w-full gap-4">
        <Button
          v-if="mode === 'edit'"
          class="mt-4"
          ref="submitBtn"
          :loading="isSubmitting"
          :icon="true"
          icon-type="trash"
          variant="secondary-ghost"
        ></Button>
        <Button
          class="mt-4 grow"
          :label="mode === 'edit' ? 'Save changes' : 'Add category'"
          ref="submitBtn"
          :loading="isSubmitting"
        ></Button>
      </div>
    </Form>
  </Modal>
</template>

<script setup lang="ts">
import { categorySchema } from "~/src/schemas/form";
import type { Category } from "~/src/types/global";

const props = defineProps(["open", "mode", "category"]);
const emit = defineEmits(["close", "success"]);

const isSubmitting = ref(false);
const formState = ref<any>(
  props.mode === "edit" ? { name: props.category.name, limitValue: props.category.limitValue } : {}
);

const formSchema = ref(categorySchema); // set initial form schema

async function handleSubmit() {
  // Turn on loading state
  toggleFormLoading();

  // Save or edit transaction
  if (props.mode === "edit") {
    console.log("EDIT !");
  } else {
    await useCategoryStore().saveCategory(formState.value as Category);
  }

  // Emit success event
  emit("success");

  // Restore form to initial state if adding new category
  if (props.mode !== "edit") {
    clearInputs();
    formState.value = {};
  }

  // Turn off loading state
  toggleFormLoading();
}

function toggleFormLoading() {
  isSubmitting.value = !isSubmitting.value;
}
</script>

<style scoped></style>
