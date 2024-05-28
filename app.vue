<template>
  <div
    id="app"
    class="relative after:content-[''] after:absolute after:w-full after:h-48 after:bg-gradient-to-t after:from-transparent after:to-primary-8% after:top-0 after:pointer-events-none after:select-none duration-500"
    :style="isAppLoading === true ? 'opacity: 0' : 'opacity: 1'"
  >
    <div class="container max-w-6xl min-h-screen mx-auto px-4">
      <NuxtLayout>
        <div>
          <NuxtPage class="py-12 sm:py-20" />
        </div>
      </NuxtLayout>
    </div>

    <!-- PWA Manifest component -->
    <NuxtPwaManifest />
  </div>
</template>

<script setup lang="ts">
const isAppLoading = ref<boolean>(true);

onMounted(() => {
  setTimeout(() => {
    isAppLoading.value = false;
  }, 100);
});
</script>
