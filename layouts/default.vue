<template>
  <div>
    <Navbar />
    <slot></slot>
  </div>
</template>

<script setup>
onMounted(() => {
  // Load all transactions
  useTransactionStore().fetchAllTransactions();

  // Load all categories
  useCategoryStore().fetchAllCategories();
});
</script>
