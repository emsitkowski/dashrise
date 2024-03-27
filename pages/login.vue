<template>
  <div class="flex justify-center">
    <Card class="w-full max-w-xs">
      <template #card-header>
        <h1 class="text-xl mx-auto">Log in to your dashboard</h1>
      </template>

      <template #card-body>
        <AuthForm action="login" />
      </template>

      <template #card-footer>
        <p class="mb-2">Don't have an account?</p>
        <NuxtLink to="/register">
          <Button variant="soft" size="sm">Create account here</Button>
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
