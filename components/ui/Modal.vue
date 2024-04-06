<template>
  <div
    v-show="open"
    class="fixed flex justify-center items-start top-0 left-0 right-0 w-full h-full px-4 bg-dark-80% overflow-y-auto z-50"
  >
    <!-- Modal card -->
    <Card class="w-full max-w-md my-16">
      <template #card-header>
        <!-- Modal header -->
        <span class="text-xl">{{ headerText }}</span>

        <!-- Modal close button -->
        <Button class="ml-6" variant="ghost" size="sm" @click="$emit('close')">
          <img src="~assets/icons/x.svg" alt="close" />
        </Button>
      </template>

      <!-- Modal body -->
      <template #card-body>
        <slot></slot>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
const props = defineProps(["headerText", "open"]);
defineEmits(["close"]);

onUpdated(() => {
  if (props.open === true) {
    disableScrollbar();
  } else {
    enableScrollbar();
  }
});
</script>

<style scoped></style>