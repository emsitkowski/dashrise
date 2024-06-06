<template>
  <Modal :open="open" :header-text="mode === 'edit' ? 'Review category' : 'Add category'" @close="$emit('close')">
    <!-- Category form -->
    <Form @submit="handleSubmit" :loading="isSubmitting" :state="formState" :schema="formSchema">
      <!-- Name -->
      <FormField label="Name">
        <FormInput
          name="Name"
          type="text"
          placeholder="Enter transaction name"
          v-model="formState.name"
          :disabled="props.mode === 'edit'"
        />
      </FormField>

      <!-- Limit -->
      <FormField label="Limit">
        <FormInput name="Limit" type="number" placeholder="Enter category limit" v-model="formState.limitValue" />
      </FormField>

      <!-- Optional note -->
      <FormField label="Note">
        <FormInput
          name="Note"
          type="textarea"
          maxlength="100"
          placeholder="Enter optional note"
          v-model="formState.note"
        />
      </FormField>

      <!-- Submit button -->
      <div class="flex flex-row-reverse w-full gap-4">
        <Button
          class="mt-4 grow"
          :label="mode === 'edit' ? 'Save changes' : 'Add category'"
          ref="submitBtn"
          :loading="isSubmitting"
        ></Button>
        <Button
          v-if="mode === 'edit'"
          class="mt-4"
          ref="submitBtn"
          :icon="true"
          icon-type="trash"
          variant="secondary-ghost"
          @click.prevent="handleDelete"
        ></Button>
      </div>
    </Form>
  </Modal>
</template>

<script setup lang="ts">
import { categorySchema } from "~/src/schemas/form";
import type { Category } from "~/src/types/global";

const props = defineProps(["open", "mode", "categoryToEdit"]);
const emit = defineEmits(["close", "success"]);

const isSubmitting = ref(false);
const formState = ref<any>(
  props.mode === "edit"
    ? {
        name: props.categoryToEdit.name as string,
        limitValue: props.categoryToEdit.limitValue as number,
        note: props.categoryToEdit.note as number,
      }
    : {}
);

const formSchema = ref(categorySchema); // set initial form schema

onUpdated(() => {
  if (props.mode === "edit") {
    // Prefill form fields with transaction to edit
    const category = props.categoryToEdit as Category;

    formState.value = {
      name: category.name,
      limitValue: category.limitValue,
    };
    category.note ? (formState.value.note = category.note) : null;
  } else {
    resetForm();
  }
});

async function handleSubmit() {
  // Turn on loading state
  toggleFormLoading();

  // Save or edit transaction
  if (props.mode === "edit") {
    await useCategoryStore().editCategory(formState.value as Category);
  } else {
    await useCategoryStore().saveCategory(formState.value as Category);
  }

  // Emit success event
  emit("success");

  // Turn off loading state
  toggleFormLoading();
}

// Handle category delete
async function handleDelete() {
  // Turn on loading state
  toggleFormLoading();

  // Delete transaction
  await useCategoryStore().deleteCategory(formState.value as Category);

  // Emit success event
  emit("success");

  // Turn off loading state
  toggleFormLoading();
}

function toggleFormLoading() {
  isSubmitting.value = !isSubmitting.value;
}

function resetForm() {
  clearAllTextAndNumberInputs();
  formState.value = {};
}
</script>

<style scoped></style>
