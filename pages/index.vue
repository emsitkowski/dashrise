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

    <TransactionModal :open="isModalOpen" @close="isModalOpen = false" @success="isModalOpen = false" />
  </div>
</template>

<script setup lang="ts">
const isModalOpen = ref(false);
const username = useSupabaseUser().value?.email?.split("@")[0];
</script>

<style scoped></style>
