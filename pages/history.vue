<template>
  <div>
    <!-- Page header -->
    <PageHeader
      header-text="History"
      subheader-text="Pick a date to explore your transaction history"
      :button="true"
      button-text="Add transaction"
      :button-icon="true"
      button-icon-type="plus"
      :button-icon-leading="true"
      @button-click="isModalOpen = true"
    >
    </PageHeader>

    <!-- Date select -->
    <DatePicker :start-year="2024" class="mb-16" />

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8">
      <div class="flex flex-col">
        <!-- Transactions list -->
        <SectionHeader header-text="All transactions" />

        <WidgetTransactions
          :transactions="
            useTransactionStore().filterTransactionsByDate({
              year: useSelectedDate().selectedDate.year,
              month: useSelectedDate().selectedDate.month,
            })
          "
          mode="slim"
        />
      </div>
      <div class="flex flex-col">
        <!-- Expenses by categories -->
        <SectionHeader header-text="Expenses summary" />

        <WidgetExpenses
          :expenses="
            useTransactionStore().expensesByCategories({
              year: useSelectedDate().selectedDate.year,
              month: useSelectedDate().selectedDate.month,
            })
          "
          mode="history"
        />
      </div>
    </div>

    <!-- Transactions modal -->
    <TransactionActionsModal :open="isModalOpen" @close="isModalOpen = false" @success="isModalOpen = false" />
  </div>
</template>

<script setup lang="ts">
const isModalOpen = ref(false);
</script>

<style scoped></style>
