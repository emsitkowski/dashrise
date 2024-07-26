<template>
  <div
    id="app"
    class="relative after:content-[''] after:absolute after:w-full after:h-80 after:bg-gradient-to-t after:from-transparent after:to-primary-4% after:top-0 after:pointer-events-none after:select-none duration-500 opacity-0 overflow-hidden"
    :class="{ 'opacity-100': hasAppLoaded }"
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
const hasAppLoaded = ref<boolean>(false);

onMounted(() => {
  document.fonts.ready.then(() => {
    setTimeout(() => {
      useNuxtApp().$pwa?.updateServiceWorker();
      hasAppLoaded.value = true;
    }, 100);
  });
});
</script>
