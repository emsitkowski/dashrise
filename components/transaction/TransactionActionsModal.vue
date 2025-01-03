<template>
  <Modal
    :open="open"
    :header-text="$props.mode === 'edit' ? 'Edit transaction' : 'Add transaction'"
    @close="$emit('close')"
  >
    <!-- Transaction type switch -->
    <Tabs class="gap-6" :items="tabs" :value="activeTab" @update:value="handleTabSwitch" :disabled="areTabsDisabled">
      <!-- Transaction form -->
      <Form @submit="handleSubmit" :loading="isSubmitting" :state="formState" :schema="formSchema">
        <!-- Date -->
        <FormField label="Date">
          <FormInput name="Date" type="date" placeholder="Pick transaction date" v-model="formState.date" ref="date" />
        </FormField>

        <!-- Value -->
        <FormField label="Value">
          <FormInput
            name="Value"
            type="text"
            placeholder="Enter transaction value"
            v-model="formState.value"
            inputmode="decimal"
          />
        </FormField>

        <!-- Category -->
        <FormField v-if="tabs[activeTab].label === 'Expense'" label="Category">
          <Select
            :options="useCategoryStore().getCategoriesNames()"
            mode="modal"
            empty-label="No categories found"
            footer-label="Create new categories on the Budget page"
            :default-value="mode === 'edit' ? $props.transactionToEdit?.category : undefined"
            v-model="formState.category"
          ></Select>
        </FormField>

        <!-- Name -->
        <FormField label="Name">
          <FormInput name="Name" type="text" placeholder="Enter transaction name" v-model="formState.name" />
        </FormField>

        <!-- Submit button -->
        <Button
          :label="$props.mode === 'edit' ? 'Save transaction' : 'Add transaction'"
          class="mt-4"
          :loading="isSubmitting"
          type="submit"
          ref="submitBtn"
        ></Button>
      </Form>
    </Tabs>
  </Modal>
</template>

<script setup lang="ts">
import { incomeSchema, expenseSchema } from "~/src/schemas/form";
import type { Tab, Transaction } from "~/src/types/global";

const props = defineProps<{
  open: boolean;
  mode?: "edit" | undefined;
  transactionToEdit?: Transaction;
}>();

const emit = defineEmits(["close", "success"]);

const isSubmitting = ref(false);
const formState = ref<any>({});

const tabs = [{ label: "Expense" }, { label: "Income" }];
const activeTab = ref(0); // Set initial active tab
const areTabsDisabled = ref<boolean>(false);
const date = ref<HTMLInputElement>();

const formSchema = ref(incomeSchema); // set initial form schema

async function handleSubmit() {
  // Turn on loading state
  toggleFormLoading();

  // Add transaction type to form state
  formState.value.type = tabs[activeTab.value].label;

  // Transform value to number
  if (typeof formState.value.value === "string") {
    formState.value.value = Number(parseFloat((formState.value.value as string).replaceAll(",", ".")));
  }

  // Save or edit transaction
  if (props.mode === "edit") {
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
  if (props.mode !== "edit") {
    resetForm();
  }

  // Update form schema
  setCorrectFormSchema();
}

onUpdated(() => {
  // Update form schema
  setCorrectFormSchema();

  if (props.mode === "edit") {
    // Prefill form fields with transaction to edit
    const transaction = props.transactionToEdit as Transaction;

    formState.value = {
      date: transaction.date,
      name: transaction.name,
      value: transaction.value,
    };
    transaction.type === "Expense" ? (formState.value.category = transaction.category) : null;

    // Disable tabs
    disableTabsFunctionality(true);

    // Switch to correct tab index based on label value
    handleTabSwitch(tabs.findIndex((el) => el.label === transaction.type));
  } else {
    // Reset form
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
  clearAllTextAndNumberInputs();

  // Set initial date and category values
  formState.value = {
    date: new Date().toJSON().slice(0, 10),
  };

  if (tabs[activeTab.value].label === "Expense") {
    formState.value.category = useCategoryStore().getCategoriesNames()
      ? useCategoryStore().getCategoriesNames()[0]
      : undefined;
  }
}

function disableTabsFunctionality(state: boolean) {
  areTabsDisabled.value = state;
}
</script>

<style scoped></style>
