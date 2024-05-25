<template>
  <Modal :open="open" header-text="Add transaction" @close="$emit('close')">
    <!-- Transaction type switch -->
    <span class="block mb-2">Choose transaction type</span>
    <Tabs class="gap-6" :items="tabs" :value="activeTab" @update:value="handleTabSwitch" :disabled="areTabsDisabled">
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
          <Select
            :options="useCategoryStore().getCategoriesNames()"
            empty-label="No categories found"
            footer-label="Create new categories on the Budget page"
            v-model="formState.category"
          ></Select>
        </FormField>

        <!-- Value -->
        <FormField label="Value">
          <FormInput
            name="Value"
            type="number"
            placeholder="Enter transaction value"
            v-model.number="formState.value"
          />
        </FormField>

        <!-- Submit button -->
        <Button label="Add transaction" class="mt-4" :loading="isSubmitting" type="submit" ref="submitBtn"></Button>
      </Form>
    </Tabs>
  </Modal>
</template>

<script setup lang="ts">
import { incomeSchema, expenseSchema } from "~/src/schemas/form";
import type { Tab, Transaction } from "~/src/types/global";

const props = defineProps<{
  open: boolean;
  mode?: "Edit" | undefined;
  transactionToEdit?: Transaction;
}>();

const emit = defineEmits(["close", "success"]);

const isSubmitting = ref(false);
const formState = ref<any>({});

const tabs = [{ label: "Income" }, { label: "Expense" }];
const activeTab = ref(0); // Set initial active tab
const areTabsDisabled = ref<boolean>(false);

const formSchema = ref(incomeSchema); // set initial form schema

async function handleSubmit() {
  // Turn on loading state
  toggleFormLoading();

  console.log(formState.value);

  // Add transaction type to form state
  formState.value.type = tabs[activeTab.value].label;

  // Save or edit transaction
  if (props.mode === "Edit") {
    // If editing, send old transaction values with id etc. + updated values
    await useTransactionStore().editTransaction({ ...props.transactionToEdit, ...formState.value } as Transaction);
  } else {
    await useTransactionStore().saveTransaction(formState.value as Transaction);
  }

  // Emit success event
  emit("success");

  // Restore form to initial state
  resetForm();

  // Turn off loading state
  toggleFormLoading();
}

function toggleFormLoading() {
  isSubmitting.value = !isSubmitting.value;
}

function handleTabSwitch(tabIndex: number) {
  // Find correct tab index based on label value
  activeTab.value = tabIndex;

  // Restore form to initial state if not in editing mode
  if (props.mode !== "Edit") {
    resetForm();
  }

  // Update form schema
  setCorrectFormSchema();
}

onUpdated(() => {
  // Update form schema
  setCorrectFormSchema();

  if (props.mode === "Edit") {
    // Prefill form fields with transaction to edit
    const transaction = props.transactionToEdit as Transaction;

    formState.value = {
      date: transaction.date,
      name: transaction.name,
      value: transaction.value,
    };

    // Disable tabs
    disableTabsFunctionality(true);

    if (transaction?.type === "Expense") {
      formState.value.category = transaction.category;
      handleTabSwitch(1);
    } else {
      handleTabSwitch(0);
    }
  } else {
    resetForm();
  }
});

function setCorrectFormSchema() {
  if (tabs[activeTab.value].label === "Income") {
    formSchema.value = incomeSchema;
  } else if (tabs[activeTab.value].label === "Expense") {
    formSchema.value = expenseSchema;
  }
}

function resetForm() {
  clearInputs();
  formState.value = {};
}

function disableTabsFunctionality(state: boolean) {
  areTabsDisabled.value = state;
}
</script>

<style scoped></style>
