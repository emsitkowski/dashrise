<template>
  <div>
    <PageHeader
      :headerText="`Hi, ${username} 👋`"
      subheader-text="Here's what's happening with your money this month"
    ></PageHeader>
  </div>
</template>

<script setup lang="ts">
const username = computed(() => {
  return useSupabaseUser().value?.email?.split("@")[0];
});
</script>

<style scoped></style>
