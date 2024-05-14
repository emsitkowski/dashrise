<template>
  <Card
    class="relative overflow-hidden h-[420px] py-2 sm:py-4 after:content-[''] after:w-full after:h-full after:absolute after:bottom-0 after:left-0 after:bg-gradient-to-t after:from-white after:to-50% z-10 after:select-none after:pointer-events-none"
  >
    <template #card-body>
      <div v-if="props.transactions.length > 0" class="divide-y divide-primary-8%">
        <div v-for="transaction in props.transactions" class="flex flex-col py-4 gap-4">
          <div class="flex items-center gap-4">
            <!-- Transaction details -->
            <Badge :label="transaction.type" :variant="transaction.type === 'Income' ? 'primary' : 'secondary'" />
            <div class="flex flex-col gap-3">
              <div class="flex flex-col gap-1">
                <span class="text-sm sm:text-base font-semibold">{{ transaction.name }}</span>
                <span v-if="transaction.category" class="text-xs sm:text-sm">{{ transaction.category }}</span>
              </div>

              <!-- Transaction date -->
              <div class="flex items-center gap-1 opacity-40">
                <img class="w-3 sm:w-4 h-3 sm:h-4" src="~assets/icons/calendar.svg" alt="" />
                <span class="text-xs sm:text-sm">{{ transaction.date }}</span>
              </div>
            </div>

            <!-- Transaction value -->
            <div class="ml-auto text-sm sm:text-base font-semibold whitespace-nowrap shrink-0">
              <span v-if="transaction.type === 'Income'" class="text-primary-500 font-semibold">
                + {{ convertToCurrency(transaction.value) }}</span
              >
              <span v-if="transaction.type === 'Expense'" class="text-dark-60%">
                - {{ convertToCurrency(transaction.value) }}</span
              >
            </div>
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div v-else class="flex flex-col justify-center items-center w-full h-full gap-1 sm:gap-2 text-dark-32%">
        <img class="w-5 sm:w-6" src="~assets/icons/info.svg" alt="" />
        <span>No recent transactions found</span>
      </div>

      <!-- Loading spinner -->
      <SpinnerLoader
        label="Loading transactions..."
        bg-color-class="bg-white"
        stroke-color-class="stroke-dark-500"
        :loading="loading"
      />
    </template>
  </Card>
</template>

<script setup lang="ts">
const props = defineProps(["transactions", "loading"]);
</script>

<style scoped></style>
