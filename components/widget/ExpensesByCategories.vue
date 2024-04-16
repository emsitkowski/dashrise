<template>
  <Card
    class="relative overflow-hidden h-[420px] py-2 sm:py-4 after:content-[''] after:w-full after:h-full after:absolute after:bottom-0 after:left-0 after:bg-gradient-to-t after:from-white after:to-50% z-10 after:select-none after:pointer-events-none"
  >
    <template #card-body>
      <div v-if="expenses.length > 0" class="divide-y divide-primary-8%">
        <div v-for="expense in expenses" class="flex items-center py-4 gap-4 sm:gap-8">
          <!-- Category name -->
          <div class="shrink-0 basis-1/4">
            <span class="text-base">{{ expense.category }}</span>
          </div>

          <!-- Category total value -->
          <div class="flex flex-col basis-1/3 gap-1 leading-tight">
            <span class="text-base font-semibold">{{ convertToCurrency(expense.totalValue) }}</span>
          </div>

          <!-- Category progress bar -->
          <div class="w-full">
            <ProgressBar
              :progress="(expense.totalValue / expense.limitValue) * 100"
              :color="expense.limitValue - expense.totalValue >= 0 ? 'primary' : 'secondary'"
            />
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
