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
    />

    <!-- Transactions modal -->
    <TransactionActionsModal :open="isModalOpen" @close="isModalOpen = false" @success="isModalOpen = false" />
  </div>
</template>

<script setup lang="ts">
const isModalOpen = ref(false);
</script>

<style scoped></style>
