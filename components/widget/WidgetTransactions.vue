<template>
  <Card class="relative h-full min-h-[320px]">
    <template #card-body>
      <div class="relative h-full overflow-hidden" :class="{ 'after:content-none': $props.mode === 'slim' }">
        <div class="flex flex-col" v-if="transactions.length > 0">
          <!-- Transactions list -->
          <TransactionList :transactions="transactions" />

          <!-- Show more overlay + button -->
          <div v-if="transactions.length > 3 && $props.mode !== 'slim'" class="flex flex-col items-center mt-4 w-full">
            <div
              class="after:content-[''] after:w-full after:h-[600px] after:absolute after:bottom-0 after:left-0 after:bg-gradient-to-t after:from-white after:from-10% after:to-60% after:z-10 after:select-none after:pointer-events-none"
            ></div>
            <NuxtLink to="/history">
              <Button
                v-if="$props.mode !== 'slim'"
                class="absolute z-20"
                label="See all transactions"
                variant="primary-light"
              />
            </NuxtLink>
          </div>
        </div>

        <!-- No items found label -->
        <InfoLabel v-else position="vertical" mode="fullscreen" label="No transactions found" />

        <!-- Loading spinner -->
        <SpinnerLoader
          v-show="useTransactionStore().loading"
          label="Loading transactions..."
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
import type { Transaction } from "~/src/types/global";

const props = defineProps<{
  transactions: Transaction[];
  mode?: "slim";
}>();
</script>
