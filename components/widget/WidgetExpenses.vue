<template>
  <Card class="relative h-full min-h-[320px] overflow-x-hidden overflow-y-visible">
    <template #card-body>
      <div class="relative flex flex-col justify-between h-full">
        <div v-if="expenses.length > 0">
          <div class="divide-y divide-primary-8%">
            <div
              v-for="expense in expenses"
              class="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 py-4 sm:py-5 first:pt-0 last:mb-20"
              :key="expense.category"
            >
              <!-- Category name -->
              <div class="sm:basis-2/5">
                <span class="text-base font-bold">{{ expense.category }}</span>
              </div>

              <div class="w-full flex flex-col sm:basis-3/5 gap-3">
                <!-- Category total value -->
                <div class="flex flex-col basis-1/4">
                  <span
                    class="text-base font-semibold leading-none"
                    :class="{
                      'text-error':
                        $props.mode !== 'history' && expense.limitValue && expense.limitValue - expense.totalValue < 0,
                    }"
                    >{{ convertToCurrency(expense.totalValue) }}</span
                  >
                </div>

                <!-- Category progress bar -->
                <div v-if="mode !== 'history'" class="w-full flex flex-col basis-3/4 justify-center">
                  <ProgressBar
                    v-if="expense.limitValue"
                    :progress="(expense.totalValue / expense.limitValue) * 100"
                    :color="progressColor(expense)"
                  />
                  <span v-else class="inline-block text-sm leading-1 text-dark-32%"
                    >This category has no limit set</span
                  >
                </div>

                <!-- Budget achieved or overspent label -->
                <div
                  v-if="
                    $props.mode !== 'history' &&
                    expense.limitValue &&
                    (expense.limitValue - expense.totalValue === 0 || expense.limitValue - expense.totalValue < 0)
                  "
                  class="flex items-center gap-1 sm:gap-2"
                >
                  <span
                    class="inline-block text-sm leading-1"
                    :class="expense.limitValue - expense.totalValue === 0 ? 'text-success' : 'text-error'"
                  >
                    {{ expense.limitValue - expense.totalValue === 0 ? "Budget limit achieved" : "Budget overspent" }}
                  </span>
                  <svg
                    class="w-4 h-4 sm:w-5 sm:h-5"
                    :class="expense.limitValue - expense.totalValue === 0 ? 'stroke-success' : 'stroke-error'"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <g v-if="expense.limitValue - expense.totalValue === 0">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </g>
                    <g v-else>
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="15" y1="9" x2="9" y2="15"></line>
                      <line x1="9" y1="9" x2="15" y2="15"></line>
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- No items found label -->
        <InfoLabel v-else position="vertical" mode="fullscreen" label="No categories found" />

        <!-- Expenses summary pill -->
        <div
          class="absolute w-full bottom-0 flex justify-between items-center gap-4 bg-primary-4% px-4 sm:px-6 py-3 sm:py-4 mt-6 rounded-md sm:rounded-lg text-primary-600 z-50"
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

        <!-- Loading spinner -->
        <SpinnerLoader
          v-show="useTransactionStore().loading"
          label="Loading expenses..."
          position="vertical"
          mode="fullscreen"
          bg-color-class="bg-white"
          stroke-color-class="stroke-dark-500"
          :loading="useTransactionStore().loading"
        />
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import type { CategoryExpense } from "~/src/types/global";

const props = defineProps<{
  expenses: CategoryExpense[];
  mode?: "history";
}>();

const progressColor = computed(() => {
  return (expense: CategoryExpense) => {
    const leftValue = expense.limitValue - expense.totalValue;
    if (leftValue > 0) {
      return "primary";
    } else if (leftValue < 0) {
      return "secondary";
    } else {
      return "success";
    }
  };
});
</script>

<style scoped></style>
