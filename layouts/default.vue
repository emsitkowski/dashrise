<template>
  <div>
    <Navbar />
    <slot />
  </div>
</template>

<script setup>
onMounted(() => {
  // Load all transactions
  useTransactionStore().fetchTransactionsFromDatabase();

  // Load all categories
  useCategoryStore().fetchUserCategoriesFromDatabase();
});
</script>
