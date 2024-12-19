<template>
  <div class="flex flex-col divide-y divide-primary-8%">
    <div
      v-for="month in monthsList"
      :key="month.value"
      class="flex flex-col sm:grid sm:grid-cols-12 sm:items-center gap-4 py-4 sm:py-5 first:pt-0 last:pb-0"
    >
      <span class="text-base sm:text-lg font-bold col-span-3">
        {{ month.name }}
      </span>

      <div class="w-full grid grid-cols-3 items-center gap-2 col-span-9 max-w-xs sm:max-w-none">
        <div class="flex flex-col items-start md:flex-row sm:items-center gap-2 sm:gap-4 text-sm sm:text-base">
          <Badge variant="primary" />

          {{
            convertToCurrency(
              useTransactionStore().totalValues("Income", {
                month: month.value,
                year: useSelectedDate().selectedDate.year,
              })
            )
          }}
        </div>

        <div class="flex flex-col items-start md:flex-row sm:items-center gap-2 sm:gap-4 text-sm sm:text-base">
          <Badge variant="secondary" />
          {{
            convertToCurrency(
              useTransactionStore().totalValues("Expense", {
                month: month.value,
                year: useSelectedDate().selectedDate.year,
              })
            )
          }}
        </div>

        <div class="flex flex-col items-start md:flex-row sm:items-center gap-2 sm:gap-4 text-sm sm:text-base">
          <Badge variant="tertiary" />
          {{
            convertToCurrency(
              useTransactionStore().totalValues("Income", {
                month: month.value,
                year: useSelectedDate().selectedDate.year,
              }) -
                useTransactionStore().totalValues("Expense", {
                  month: month.value,
                  year: useSelectedDate().selectedDate.year,
                })
            )
          }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { monthsList } from "~/utils/date";
</script>

<style scoped></style>
