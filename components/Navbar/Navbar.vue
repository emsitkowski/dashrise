<template>
  <nav>
    <ul
      class="flex gap-6 py-6 border-b border-primary-8 [&_a]:opacity-30 [&_a]:px-4 [&_a]:py-3 [&_a]:rounded-md [&_a]:cursor-pointer"
    >
      <li v-for="link in links" :key="link.label">
        <NuxtLink
          :to="link.path"
          :class="{ active: useRoute().path === link.path }"
          class="[&.active]:bg-primary-50 [&.active]:text-primary-500 [&.active]:opacity-100"
        >
          {{ link.label }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
const links = [
  {
    path: "/",
    label: "Dashboard",
  },
  {
    path: "/budget",
    label: "Budget",
  },
  {
    path: "/vaults",
    label: "Vaults",
  },
  {
    path: "/activity",
    label: "Activity",
  },
  {
    path: "/analytics",
    label: "Analytics",
  },
];
</script>

<style scoped></style>
