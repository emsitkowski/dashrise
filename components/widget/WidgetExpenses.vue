<template>
  <Card class="relative min-h-[420px] overflow-x-hidden overflow-y-visible">
    <template #card-body>
      <div v-if="expenses.length > 0" class="flex flex-col justify-between h-full">
        <div class="divide-y divide-primary-8%">
          <div
            v-for="expense in expenses"
            class="flex flex-col sm:flex-row sm:items-center gap-4 py-4 sm:py-5 first:pt-0"
          >
            <!-- Category name -->
            <div class="sm:basis-2/5">
              <span class="text-base font-bold">{{ expense.category }}</span>
            </div>

            <div class="w-full flex flex-col sm:basis-3/5 gap-3">
              <!-- Category total value -->
              <div class="flex flex-col basis-1/4">
                <span
                  class="text-sm sm:text-base leading-none"
                  :class="{ 'text-secondary-500': expense.totalValue > expense.limitValue && expense.limitValue > 0 }"
                  >{{ convertToCurrency(expense.totalValue) }}</span
                >
              </div>

              <!-- Category progress bar -->
              <div v-if="mode !== 'history'" class="w-full flex flex-col basis-3/4 justify-center">
                <ProgressBar
                  v-if="expense.limitValue"
                  :progress="(expense.totalValue / expense.limitValue) * 100"
                  :color="expense.limitValue - expense.totalValue >= 0 ? 'primary' : 'secondary'"
                />
                <span v-else class="inline-block text-sm leading-1 text-dark-32%">This category has no limit set</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Expenses summary -->
        <div
          class="sticky top-0 flex justify-between items-center gap-4 bg-primary-4% px-4 sm:px-6 py-3 sm:py-4 mt-6 rounded-xl text-primary-600 z-20"
        >
          <span v-if="$props.mode !== 'history'">
            <strong>Planned –</strong>
            {{ convertToCurrency(useCategoryStore().getTotalValuesForCurrentMonth()) }}
          </span>
          <span>
            <strong>Spent –</strong>
            {{
              convertToCurrency(
                useTransactionStore().totalValues("Expense", {
                  year: $props.mode === "history" ? useSelectedDate().selectedDate.year : getCurrentDate().year,
                  month: $props.mode === "history" ? useSelectedDate().selectedDate.month : getCurrentDate().month,
                })
              )
            }}
          </span>
        </div>
      </div>

      <!-- Empty state -->
      <div
        v-else
        class="absolute top-0 bottom-0 left-0 right-0 flex flex-col justify-center items-center gap-1 sm:gap-2 w-full h-full text-dark-32%"
      >
        <img class="w-5 sm:w-6" src="~assets/icons/info.svg" alt="" />
        <span>No expenses found</span>
      </div>

      <!-- Loading spinner -->
      <SpinnerLoader
        label="Loading expenses..."
        bg-color-class="bg-white"
        stroke-color-class="stroke-dark-500"
        :loading="useTransactionStore().loading"
      />
    </template>
  </Card>
</template>

<script setup lang="ts">
import type { CategoryExpense } from "~/src/types/global";

const props = defineProps<{
  expenses: CategoryExpense[];
  mode?: "history";
}>();
</script>

<style scoped></style>
