<template>
  <Transition>
    <div
      id="app"
      class="relative after:content-[''] after:absolute after:w-full after:h-1/2 after:bg-gradient-to-t after:from-transparent after:to-primary-4% after:top-0 after:pointer-events-none after:select-none"
      v-show="isAppLoading === false"
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
  </Transition>
</template>

<script setup lang="ts">
const isAppLoading = ref<boolean>(true);

onMounted(() => {
  isAppLoading.value = false;
});
</script>
