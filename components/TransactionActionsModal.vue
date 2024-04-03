<template>
  <Modal :open="open" header-text="Add transaction" @close="$emit('close')">
    <!-- Transaction type switch -->
    <span class="block mb-2">Choose transaction type</span>
    <Tabs class="gap-6" :items="tabs" :value="activeTab" @update:value="handleTabSwitch">
      <!-- Transaction form -->
      <Form @submit="handleSubmit" :loading="isSubmitting" :state="formState" :schema="formSchema">
        <!-- Date -->
        <FormField label="Date">
          <FormInput name="Date" type="date" placeholder="Pick transaction date" v-model="formState.date" />
        </FormField>

        <!-- Name -->
        <FormField label="Name">
          <FormInput name="Name" type="text" placeholder="Enter transaction name" v-model="formState.name" />
        </FormField>

        <!-- Category -->
        <FormField v-if="tabs[activeTab].label === 'Expense'" label="Category">
          <SelectMenu :options="categories" v-model="formState.category" />
        </FormField>

        <!-- Value -->
        <FormField label="Value">
          <FormInput name="Value" type="text" placeholder="Enter transaction value" v-model="formState.value" />
        </FormField>

        <!-- Submit button -->
        <Button label="Add transaction" class="mt-4" ref="submitBtn" :loading="isSubmitting" />
      </Form>
    </Tabs>
  </Modal>
</template>

<script setup lang="ts">
import { incomeSchema, expenseSchema } from "~/src/schemas/form";
import type { Tab, Transaction } from "~/src/types/global";

const props = defineProps(["open"]);
const emit = defineEmits(["close", "success"]);

const isSubmitting = ref(false);
const formState = ref<any>({});

const tabs = [{ label: "Income" }, { label: "Expense" }];
const activeTab = ref(0); // Set initial active tab

const formSchema = ref(incomeSchema); // set initial form schema

const categories = [
  {
    label: "Food",
    value: "value",
  },
  {
    label: "Cat",
    value: "value",
  },
  {
    label: "Car",
    value: "value",
  },
  {
    label: "House",
    value: "value",
  },
];

async function handleSubmit() {
  // Turn on loading state
  toggleFormLoading();

  // Add transaction type to form state
  formState.value.type = tabs[activeTab.value].label;

  // Save transaction
  await useTransactionStore().saveTransaction(formState.value as Transaction);

  // Emit success event
  emit("success");

  // Restore form to initial state
  clearInputs();
  activeTab.value = 0;
  formState.value = {};

  // Turn off loading state
  toggleFormLoading();
}

function toggleFormLoading() {
  isSubmitting.value = !isSubmitting.value;
}

function handleTabSwitch(tabIndex: number) {
  // Find correct tab index based on label value
  activeTab.value = tabIndex;

  // Update form schema
  setCorrectFormSchema();
}

onUpdated(() => {
  // Update form schema
  setCorrectFormSchema();
});

function setCorrectFormSchema() {
  if (tabs[activeTab.value].label === "Income") {
    formSchema.value = incomeSchema;
  } else if (tabs[activeTab.value].label === "Expense") {
    formSchema.value = expenseSchema;
  }
}
</script>

<style scoped></style>
