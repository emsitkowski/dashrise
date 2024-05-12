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
      :button-icon-leading="true"
      @button-click="isModalOpen = true"
    />

    <!-- Summary -->
    <div
      class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 justify-between w-full [&>*]:w-full gap-4 sm:gap-8 mb-16"
    >
      <Total
        header="Balance"
        icon="credit-card"
        :value="
          useTransactionStore().totalValues('Income', today) - useTransactionStore().totalValues('Expense', today)
        "
        :loading="useTransactionStore().loading"
      />
      <Total
        header="Income"
        icon="arrow-in"
        :value="useTransactionStore().totalValues('Income', today)"
        :loading="useTransactionStore().loading"
      />
      <Total
        header="Expenses"
        icon="arrow-out"
        :value="useTransactionStore().totalValues('Expense', today)"
        :loading="useTransactionStore().loading"
      />
    </div>

    <!-- Recent activity widget -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8">
      <div class="flex flex-col">
        <SectionHeader headerText="Recent activity" />
        <RecentActivity
          :transactions="useTransactionStore().filterTransactionsByDate(today, 6)"
          :loading="useTransactionStore().loading"
        />
      </div>
      <div class="flex flex-col">
        <SectionHeader headerText="Expenses summary" />

        <ExpensesByCategories
          :expenses="useTransactionStore().expensesByCategories(today)"
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

const today = { year: getCurrentYear(), month: getCurrentMonth() };
</script>

<style scoped></style>
