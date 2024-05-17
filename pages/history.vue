<template>
  <div>
    <!-- Page header -->
    <PageHeader
      header-text="History"
      subheader-text="Choose date and check out the history of your transactions"
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

    <!-- Transactions table -->
    <SectionHeader header-text="Transactions" />

    <TransactionList
      :transactions="
        useTransactionStore().filterTransactionsByDate({
          year: useSelectedDate().selectedDate.year,
          month: useSelectedDate().selectedDate.month,
        })
      "
    ></TransactionList>

    <!-- Transactions modal -->
    <TransactionActionsModal :open="isModalOpen" @close="isModalOpen = false" @success="isModalOpen = false" />
  </div>
</template>

<script setup lang="ts">
const isModalOpen = ref(false);
</script>

<style scoped></style>
