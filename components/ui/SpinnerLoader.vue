<template>
  <Transition>
    <div
      v-if="loading"
      class="absolute flex gap-1 sm:gap-2 items-center duration-300"
      :class="[
        bgColorClass ? bgColorClass : '',
        {
          'top-0 left-0 right-0 w-full h-full justify-center': mode === 'fullscreen',
          'flex-col justify-center': position === 'vertical',
        },
      ]"
    >
      <svg
        class="w-5 sm:w-6 animate-spin duration-100"
        :class="strokeColorClass"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <line x1="12" y1="2" x2="12" y2="6"></line>
        <line x1="12" y1="18" x2="12" y2="22"></line>
        <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
        <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
        <line x1="2" y1="12" x2="6" y2="12"></line>
        <line x1="18" y1="12" x2="22" y2="12"></line>
        <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
        <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
      </svg>

      <!-- Loading label -->
      <span v-if="label" class="text-sm sm:text-base text-dark-60%">
        {{ label }}
      </span>
    </div>
  </Transition>
</template>

<script setup lang="ts">
defineProps(["loading", "bgColorClass", "strokeColorClass", "label", "mode", "position"]);
</script>

<style scoped>
.v-leave-to {
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}
</style>
