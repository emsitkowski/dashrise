<template>
  <nav class="flex justify-between items-center border-b border-primary-8">
    <ul class="container max-w-5xl mx-auto flex flex-row flex-wrap gap-2 sm:gap-6 py-6">
      <li v-for="link in links" :key="link.label">
        <NuxtLink :to="link.path">
          <Button
            variant="ghost"
            :class="{ active: useRoute().path === link.path }"
            class="[&.active]:bg-primary-50 [&.active]:text-primary-500"
          >
            {{ link.label }}
          </Button>
        </NuxtLink>
      </li>
    </ul>

    <!-- Log out button -->
    <Button variant="ghost" @click="useSupabaseAuth().logOut">Log out</Button>
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
