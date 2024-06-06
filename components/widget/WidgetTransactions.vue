<template>
  <Card class="relative h-full min-h-[240px]">
    <template #card-body>
      <div
        class="relative h-full min-h-[320px] overflow-hidden after:content-[''] after:w-full after:h-full after:absolute after:bottom-0 after:left-0 after:bg-gradient-to-t after:from-white after:to-50% after:z-10 after:select-none after:pointer-events-none"
        :class="{ 'after:content-none': $props.mode === 'history' }"
      >
        <div class="flex flex-col" v-if="transactions.length > 0">
          <TransactionList :transactions="transactions" />
          <NuxtLink class="self-center" to="/history">
            <Button
              v-if="$props.mode !== 'history'"
              class="absolute z-20"
              label="See all transactions"
              variant="primary-light"
            />
          </NuxtLink>
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
  mode?: "history";
}>();
</script>
