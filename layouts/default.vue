<template>
  <div>
    <Navbar />
    <slot />
  </div>
</template>

<script setup>
onMounted(() => {
  // Load all transactions
  useTransactionStore().getTransactions();
});
</script>
