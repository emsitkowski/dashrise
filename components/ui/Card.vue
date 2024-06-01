<template>
  <div
    class="relative flex flex-col gap-6 p-4 sm:p-8 rounded-lg sm:rounded-xl bg-white overflow-x-auto overflow-y-hidden"
  >
    <!-- Card header -->
    <div
      v-if="$slots['card-header']"
      :class="{ 'flex justify-between items-center border-b border-primary-8% pb-4 sm:pb-6': $slots['card-header'] }"
    >
      <slot name="card-header"></slot>
    </div>

    <!-- Card body -->
    <div v-if="$slots['card-body']" class="grow h-full">
      <slot name="card-body"></slot>
    </div>

    <!-- Card footer -->
    <div v-if="$slots['card-footer']" class="pt-6 border-t border-primary-8% text-center">
      <slot name="card-footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
