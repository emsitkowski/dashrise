<template>
  <div
    class="relative min-h-[420px] overflow-hidden rounded-2xl after:content-[''] after:w-full after:h-full after:absolute after:bottom-0 after:left-0 after:bg-gradient-to-t after:from-white after:to-50% after:z-10 after:select-none after:pointer-events-none"
  >
    <TransactionList :transactions="useTransactionStore().filterTransactionsByDate(getCurrentDate(), 6)" />
  </div>
</template>
