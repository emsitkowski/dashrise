<template>
  <nav class="flex justify-between">
    <ul class="container max-w-5xl mx-auto flex flex-row flex-wrap gap-2 sm:gap-6 py-6 border-b border-primary-8">
      <li v-for="link in links" :key="link.label">
        <NuxtLink
          :to="link.path"
          :class="{ active: useRoute().path === link.path }"
          class="block px-2 py-2 sm:px-4 sm:py-3 opacity-30 rounded-md cursor-pointer [&.active]:bg-primary-50 [&.active]:text-primary-500 [&.active]:opacity-100 duration-300"
        >
          {{ link.label }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
const links = [
  { path: "/", label: "Dashboard" },
  { path: "/budget", label: "Budget" },
  { path: "/vaults", label: "Vaults" },
  { path: "/activity", label: "Activity" },
  { path: "/analytics", label: "Analytics" },
];
</script>

<style scoped></style>
