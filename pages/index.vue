<template>
  <div>
    <!-- Page header -->
    <PageHeader
      :header-text="`Hi, ${username} 👋`"
      subheader-text="Here's what's happening with your money this month"
      :button="true"
      button-text="Add transaction"
      :button-icon="true"
      button-icon-type="plus"
      @button-click="isModalOpen = true"
    />

    <!-- Summary -->
    <div
      class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 justify-between w-full [&>*]:w-full gap-4 sm:gap-8 mb-16"
    >
      <Total
        header="Balance"
        icon="credit-card"
        :value="getTotalTransactionValues.totalIncome - getTotalTransactionValues.totalExpenses"
        :loading="useTransactionStore().loading"
      />
      <Total
        header="Income"
        icon="arrow-in"
        :value="getTotalTransactionValues.totalIncome"
        :loading="useTransactionStore().loading"
      />
      <Total
        header="Expenses"
        icon="arrow-out"
        :value="getTotalTransactionValues.totalExpenses"
        :loading="useTransactionStore().loading"
      />
      <Total
        header="Savings"
        icon="box"
        :value="getTotalTransactionValues.totalSavings"
        :loading="useTransactionStore().loading"
      />
    </div>

    <!-- Recent activity widget -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div class="flex flex-col">
        <SectionHeader headerText="Recent activity" />
        <RecentActivity
          :transactions="useTransactionStore().filterTransactionsByDate('2024', '04', 6)"
          :loading="useTransactionStore().loading"
        />
      </div>
    </div>

    <!-- Transactions modal -->
    <TransactionActionsModal :open="isModalOpen" @close="isModalOpen = false" @success="isModalOpen = false" />
  </div>
</template>

<script setup lang="ts">
const isModalOpen = ref(false);
const username = useSupabaseUser().value?.email?.split("@")[0];

const { getTotalTransactionValues } = storeToRefs(useTransactionStore());
</script>

<style scoped></style>
