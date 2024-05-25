<template>
  <Card class="relative h-full min-h-[240px]">
    <template #card-body>
      <div v-if="props.transactions.length > 0" class="divide-y divide-primary-8%">
        <div v-for="transaction in props.transactions" class="flex flex-col py-4 sm:py-5 first:pt-0">
          <div class="flex items-center gap-4">
            <!-- Transaction details -->
            <Badge :label="transaction.type" :variant="transaction.type === 'Income' ? 'primary' : 'secondary'" />
            <div class="flex flex-col gap-3">
              <div class="flex flex-col gap-1">
                <span class="text-base sm:text-lg font-bold">{{ transaction.name }}</span>
                <span v-if="transaction.category" class="text-sm font-normal">{{ transaction.category }}</span>
              </div>

              <!-- Transaction date -->
              <div class="flex items-center gap-1 opacity-60">
                <img class="w-3 sm:w-4 h-3 sm:h-4" src="~assets/icons/calendar.svg" alt="" />
                <span class="text-xs sm:sm">{{ transaction.date }}</span>
              </div>
            </div>

            <!-- Transaction value -->
            <div class="ml-auto text-sm sm:text-base font-semibold whitespace-nowrap pl-2 shrink-0">
              <span v-if="transaction.type === 'Income'" class="text-primary-500 font-semibold">
                + {{ convertToCurrency(transaction.value) }}</span
              >
              <span v-if="transaction.type === 'Expense'" class="text-dark-60%">
                - {{ convertToCurrency(transaction.value) }}</span
              >
            </div>

            <!-- Transaction actions dropdown -->
            <DropdownMenu
              :options="[{ label: 'Delete' }, { label: 'Edit' }]"
              @select="handleActionSelect($event, transaction)"
            >
              <Button variant="ghost" :icon="true" icon-type="actions" size="sm"></Button>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div
        v-else
        class="absolute top-0 bottom-0 left-0 right-0 flex flex-col justify-center items-center gap-1 sm:gap-2 w-full h-full text-dark-32%"
      >
        <img class="w-5 sm:w-6" src="~assets/icons/info.svg" alt="" />
        <span>No transactions found</span>
      </div>

      <!-- Transaction edit modal -->
      <TransactionActionsModal
        mode="Edit"
        :transactionToEdit="transactionToEdit"
        :open="isEditModalOpen"
        @close="isEditModalOpen = false"
        @success="isEditModalOpen = false"
      />

      <!-- Loading spinner -->
      <SpinnerLoader
        label="Loading transactions..."
        bg-color-class="bg-white"
        stroke-color-class="stroke-dark-500"
        :loading="useTransactionStore().loading"
      />
    </template>
  </Card>
</template>

<script setup lang="ts">
import type { Transaction, DropdownMenuOption } from "~/src/types/global";

const props = defineProps(["transactions"]);
const isEditModalOpen = ref<boolean>(false);
const transactionToEdit = ref();

// Handle action selection
function handleActionSelect(option: DropdownMenuOption, transaction: Transaction) {
  // Delete transaction
  if (option.label === "Delete") {
    useTransactionStore().deleteTransaction(transaction);
  } else if (option.label === "Edit") {
    isEditModalOpen.value = true;
    transactionToEdit.value = transaction;
  }
}
</script>

<style scoped></style>
