<template>
  <div class="flex justify-center">
    <Card class="w-full max-w-sm">
      <template #card-header>
        <h1 class="text-xl mx-auto">Log in to your dashboard</h1>
      </template>

      <template #card-body>
        <AuthForm action="login" />
      </template>

      <template #card-footer>
        <p class="mb-2">Don't have an account?</p>
        <NuxtLink to="/register">
          <Button label="Create account here" variant="ghost" size="sm" />
        </NuxtLink>
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
