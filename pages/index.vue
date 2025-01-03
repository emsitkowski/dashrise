<template>
  <div>
    <!-- Page header -->
    <PageHeader
      header-text="Dashboard"
      :subheader-text="`Get a quick overview of your financial performance this month – ${getCurrentMonthName()} ${getCurrentYear()}`"
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
      <WidgetTotal
        header="Balance"
        icon="credit-card"
        :value="
          useTransactionStore().totalValues('Income', today) - useTransactionStore().totalValues('Expense', today)
        "
        :loading="useTransactionStore().loading"
      />
      <WidgetTotal
        header="Income"
        icon="arrow-in"
        :value="useTransactionStore().totalValues('Income', today)"
        :loading="useTransactionStore().loading"
      />
      <WidgetTotal
        header="Expenses"
        icon="arrow-out"
        :value="useTransactionStore().totalValues('Expense', today)"
        :loading="useTransactionStore().loading"
      />
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8">
      <div class="flex flex-col">
        <!-- Recent transactions widget -->
        <SectionHeader headerText="Recent transactions" />
        <WidgetTransactions
          :transactions="
            useTransactionStore().filterTransactionsByDate(
              {
                year: getCurrentYear(),
                month: getCurrentMonth(),
              },
              6
            )
          "
        />
      </div>
      <div class="flex flex-col">
        <!-- Expenses summary widget -->
        <SectionHeader headerText="Budget summary" />
        <WidgetExpenses :expenses="useTransactionStore().expensesByCategories(today)" mode="current" show-planned />
      </div>
    </div>

    <!-- Transactions modal -->
    <TransactionActionsModal :open="isModalOpen" @close="isModalOpen = false" @success="isModalOpen = false" />
  </div>
</template>

<script setup lang="ts">
const isModalOpen = ref(false);
const today = getCurrentDate();
</script>

<style scoped></style>
