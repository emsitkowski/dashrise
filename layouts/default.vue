<template>
  <div>
    <Navbar />
    <slot />
  </div>
</template>

<script setup>
onMounted(() => {
  // Load all transactions
  useTransactionStore().fetchTransactions();

  // Load all categories
  useCategoryStore().fetchCategories();
});
</script>
