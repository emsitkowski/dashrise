<template>
  <Card class="relative overflow-x-hidden overflow-y-visible h-[420px] py-2 sm:py-4">
    <template #card-body>
      <div v-if="expenses.length > 0" class="divide-y divide-primary-8%">
        <div v-for="expense in expenses" class="flex flex-col sm:flex-row sm:items-center py-4 gap-1 sm:gap-4">
          <!-- Category name -->
          <div class="sm:basis-2/5">
            <span class="text-sm sm:text-base uppercase">{{ expense.category }}</span>
          </div>

          <div class="w-full flex flex-col sm:flex-row sm:basis-3/5 gap-2 sm:gap-4">
            <!-- Category total value -->
            <div class="flex flex-col basis-1/4 gap-1 leading-tight">
              <span
                class="text-base font-semibold"
                :class="{ 'text-secondary-500': expense.totalValue > expense.limitValue && expense.limitValue > 0 }"
                >{{ convertToCurrency(expense.totalValue) }}</span
              >
            </div>

            <!-- Category progress bar -->
            <div class="w-full flex flex-col basis-3/4 justify-center">
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

      <!-- Empty state -->
      <div v-else class="flex flex-col justify-center items-center w-full h-full gap-1 sm:gap-2 text-dark-32%">
        <img class="w-5 sm:w-6" src="~assets/icons/info.svg" alt="" />
        <span>No expenses found</span>
      </div>

      <!-- Loading spinner -->
      <SpinnerLoader
        label="Loading expenses..."
        bg-color-class="bg-white"
        stroke-color-class="stroke-dark-500"
        :loading="loading"
      />
    </template>
  </Card>
</template>

<script setup lang="ts">
import type { CategoryExpense } from "~/src/types/global";

const props = defineProps({
  expenses: {
    type: Array as () => CategoryExpense[],
    required: true,
  },
  loading: {
    type: Boolean,
  },
});
</script>

<style scoped></style>
