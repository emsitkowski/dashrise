<template>
  <div>
    <PageHeader
      :header-text="`Hi, ${username} 👋`"
      subheader-text="Here's what's happening with your money this month"
      :button="true"
      button-text="Add transaction"
      :button-icon="true"
      button-icon-type="plus"
    ></PageHeader>
  </div>
</template>

<script setup lang="ts">
const username = useSupabaseUser().value?.email?.split("@")[0];
</script>

<style scoped></style>
