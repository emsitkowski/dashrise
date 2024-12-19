<template>
  <div>
    <!-- Page header -->
    <PageHeader
      header-text="Statistics"
      subheader-text="Get a detailed statistics and overview of your finances"
      :button="true"
      button-text="Add transaction"
      :button-icon="true"
      button-icon-type="plus"
      :button-icon-leading="true"
      @button-click="isModalOpen = true"
    >
    </PageHeader>

    <!-- Date select -->
    <DatePicker :start-year="2024" :hide-month="true" class="mb-16 !max-w-[212px]" />

    <div class="flex gap-16 lg:gap-8">
      <Card class="w-full">
        <template #card-body>
          <TransactionsSummary />
        </template>
      </Card>
    </div>

    <!-- Transactions modal -->
    <TransactionActionsModal :open="isModalOpen" @close="isModalOpen = false" @success="isModalOpen = false" />
  </div>
</template>

<script setup lang="ts">
const isModalOpen = ref(false);
</script>

<style scoped></style>
