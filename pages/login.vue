<template>
  <div class="flex justify-center">
    <Card class="w-full max-w-xs">
      <template #card-header>
        <h1 class="text-xl">Login to your dashboard</h1>
      </template>

      <template #card-body>
        <AuthForm />
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "auth",
});
</script>

<style scoped></style>
