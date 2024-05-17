<template>
  <Card class="relative py-2 sm:py-4 h-full min-h-[240px]">
    <template #card-body>
      <div v-if="props.transactions.length > 0" class="divide-y divide-primary-8%">
        <div v-for="transaction in props.transactions" class="flex flex-col py-4 gap-4">
          <div class="flex items-center gap-4">
            <!-- Transaction details -->
            <Badge :label="transaction.type" :variant="transaction.type === 'Income' ? 'primary' : 'secondary'" />
            <div class="flex flex-col gap-2">
              <div class="flex flex-col gap-1">
                <span class="text-sm sm:text-base font-semibold">{{ transaction.name }}</span>
                <span v-if="transaction.category" class="text-xs sm:text-sm">{{ transaction.category }}</span>
              </div>

              <!-- Transaction date -->
              <div class="flex items-center gap-1 opacity-40">
                <img class="w-3 h-3" src="~assets/icons/calendar.svg" alt="" />
                <span class="text-xs">{{ transaction.date }}</span>
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
            <DropdownMenu :options="[{ label: 'Delete' }]" @select="handleActionSelect($event, transaction)">
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

// Handle action selection
function handleActionSelect(option: DropdownMenuOption, transaction: Transaction) {
  // Delete transaction
  if (option.label === "Delete") {
    useTransactionStore().deleteTransaction(transaction);
  }
}
</script>

<style scoped></style>
