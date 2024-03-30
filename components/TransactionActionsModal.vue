<template>
  <Modal :open="open" header-text="Add transaction" @close="$emit('close')">
    <!-- Transaction type switch -->
    <Tabs :items="tabs" @tab-switch="handleTabSwitch">
      <!-- Transaction form -->
      <Form class="mt-6" @submit="handleSubmit" :loading="isSubmitting" :state="formState" :schema="formSchema">
        <!-- Date -->
        <FormField label="Date">
          <FormInput name="Date" type="date" placeholder="Pick transaction date" v-model="formState.date" />
        </FormField>

        <!-- Name -->
        <FormField label="Name">
          <FormInput name="Name" type="text" placeholder="Enter transaction name" v-model="formState.name" />
        </FormField>

        <!-- Category -->
        <FormField v-show="activeTab.label === 'Expense'" label="Category">
          <SelectMenu :options="categories" v-model="formState.category" />
        </FormField>

        <!-- Value -->
        <FormField label="Value">
          <FormInput name="Value" type="text" placeholder="Enter transaction value" v-model="formState.value" />
        </FormField>

        <!-- Submit button -->
        <Button class="mt-4" ref="submitBtn" :loading="isSubmitting">Add transaction</Button>
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
const activeTab = ref(tabs[0]); // Set initial active tab

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
  formState.value.type = activeTab.value.label;

  // Save transaction
  const success = await useTransactionStore().saveTransaction(formState.value as Transaction);

  if (success) {
    // Emit success event
    emit("success");

    // Restore form to initial state
    clearInputs();
    formState.value = {};
    activeTab.value = tabs[0];
  } else {
    throw Error("Failed to save transaction");
  }

  // Turn off loading state
  toggleFormLoading();
}

function toggleFormLoading() {
  isSubmitting.value = !isSubmitting.value;
}

function handleTabSwitch(tab: Tab) {
  activeTab.value = tab;

  // Set correct form schema
  if (activeTab.value.label === "Income") {
    formSchema.value = incomeSchema;
  } else if (activeTab.value.label === "Expense") {
    formSchema.value = expenseSchema;
  }
}
</script>

<style scoped></style>
