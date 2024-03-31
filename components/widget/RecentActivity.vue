<template>
  <Card
    class="relative overflow-hidden h-[420px] py-2 sm:py-4 after:content-[''] after:w-full after:h-full after:absolute after:bottom-0 after:left-0 after:bg-gradient-to-t after:from-white after:to-50% z-10 after:select-none after:pointer-events-none"
  >
    <template #card-body>
      <div v-if="props.transactions.length > 0" class="divide-y divide-primary-8%">
        <div v-for="transaction in props.transactions" class="flex items-center py-4 gap-4 sm:gap-8">
          <!-- Transaction type -->
          <div class="w-16 sm:w-20 shrink-0">
            <Badge
              class="w-full"
              :label="transaction.type"
              :variant="transaction.type === 'Income' ? 'primary' : 'secondary'"
            />
          </div>

          <!-- Transaction details -->
          <div class="flex flex-col gap-1 leading-tight">
            <span class="text-base">{{ transaction.name }}</span>
            <span class="text-xs sm:text-sm text-dark-32%">{{ transaction.date }}</span>
          </div>

          <!-- Transaction value -->
          <div class="ml-auto text-base whitespace-nowrap shrink-0">
            <span v-if="transaction.type === 'Income'"> + {{ transaction.value }} PLN</span>
            <span v-if="transaction.type === 'Expense'" class="text-dark-32%"> - {{ transaction.value }} PLN</span>
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
