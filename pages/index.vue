<template>
  <div>
    <PageHeader
      :header-text="`Hi, ${username} 👋`"
      subheader-text="Here's what's happening with your money this month"
      :button="true"
      button-text="Add transaction"
      :button-icon="true"
      button-icon-type="plus"
      @button-click="isModalOpen = true"
    ></PageHeader>

    <TransactionActionsModal :open="isModalOpen" @close="isModalOpen = false" @success="isModalOpen = false" />

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
      <div class="flex flex-col">
        <SectionHeader></SectionHeader>
        <RecentActivity
          :transactions="useTransactionStore().filterTransactionsByDate('2024', '03', 10)"
          :loading="useTransactionStore().loading"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const isModalOpen = ref(false);
const username = useSupabaseUser().value?.email?.split("@")[0];
</script>

<style scoped></style>
