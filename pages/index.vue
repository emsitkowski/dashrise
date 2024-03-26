<template>
  <div>
    <h1 class="text-3xl font-bold mb-3">Hi, {{ useSupabaseUser().value?.email?.split("@")[0] }} 👋</h1>
    <p>Here's what's happening with your money this month</p>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
