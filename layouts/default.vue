<template>
  <div class="flex flex-col min-h-screen">
    <Navbar />
    <slot></slot>

    <!-- Privacy policy footer -->
    <div class="flex flex-col justify-center items-center gap-2 mt-auto pb-6">
      <NuxtLink to="/privacy-policy">
        <Button size="sm" label="Privacy Policy" variant="ghost" />
      </NuxtLink>
    </div>
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
