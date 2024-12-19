<template>
  <nav
    class="flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center sm:border-b sm:border-primary-8 sm:py-6"
  >
    <ul class="container max-w-5xl mx-auto flex flex-row gap-2 sm:gap-6 py-4 sm:py-0 overflow-x-scroll hide-scrollbar">
      <li v-for="link in links" :key="link.label">
        <NuxtLink :to="link.path">
          <Button
            :label="link.label"
            variant="ghost"
            :class="{ active: useRoute().path === link.path }"
            class="[&.active]:bg-primary-50 [&.active]:text-primary-500 [&.active]:opacity-100"
          >
          </Button>
        </NuxtLink>
      </li>
    </ul>

    <!-- Log out button -->
    <div
      class="flex justify-between items-center shrink-0 gap-2 sm:gap-6 py-1 border-b sm:border-none border-primary-8"
    >
      <span>Hi, {{ username }} 👋</span>
      <Button label="Log out" class="self-end sm:self-auto" variant="ghost" @click="useSupabaseAuth().logOut"></Button>
    </div>
  </nav>
</template>

<script setup lang="ts">
const links = [
  { path: "/", label: "Dashboard" },
  { path: "/budget", label: "Budget" },
  { path: "/statistics", label: "Statistics" },
  { path: "/history", label: "History" },
];

const username = useSupabaseUser().value?.email?.split("@")[0];
</script>

<style scoped></style>
