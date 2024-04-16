<template>
  <div class="flex justify-center">
    <Card class="w-full max-w-sm">
      <template #card-header>
        <h1 class="text-xl mx-auto">Create an account</h1>
      </template>

      <template #card-body>
        <AuthForm action="register" />
      </template>

      <template #card-footer>
        <p class="mb-2">Have an account?</p>
        <NuxtLink to="/login">
          <Button label="Log in here" variant="ghost" size="sm" />
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
