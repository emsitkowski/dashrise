<template>
  <div>
    <div class="divide-y divide-primary-8%">
      <div v-for="transaction in props.transactions" class="flex flex-col py-4 sm:py-5 first:pt-0">
        <div class="flex items-center gap-4">
          <!-- Transaction details -->
          <Badge :label="transaction.type" :variant="transaction.type === 'Income' ? 'primary' : 'secondary'" />
          <div class="flex flex-col gap-2">
            <div class="flex flex-col gap-1">
              <span class="text-base sm:text-base font-bold">{{ transaction.name }}</span>
              <span v-if="transaction.category" class="text-sm font-normal">{{ transaction.category }}</span>
            </div>

            <!-- Transaction date -->
            <div class="flex items-center gap-1 opacity-60">
              <img class="w-3 sm:w-4 h-3 sm:h-4" src="~assets/icons/calendar.svg" alt="" />
              <span class="text-xs sm:sm">{{ transaction.date }}</span>
            </div>
          </div>

          <!-- Transaction value -->
          <div
            class="ml-auto text-sm sm:text-base font-semibold whitespace-nowrap pl-2 shrink-0"
            :class="{ 'text-primary-500': transaction.type === 'Income' }"
          >
            <span>{{ transaction.type === "Income" ? "+" : "-" }}</span>
            <span>
              {{ convertToCurrency(transaction.value) }}
            </span>
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

    <!-- Transaction edit modal -->
    <TransactionActionsModal
      mode="edit"
      :transactionToEdit="transactionToEdit"
      :open="isEditModalOpen"
      @close="isEditModalOpen = false"
      @success="isEditModalOpen = false"
    />
  </div>
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
