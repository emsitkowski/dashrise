<template>
  <div class="inline-block p-8 rounded-2xl bg-white">
    <div class="mb-6 pb-6 border-b border-b-primary-8% text-center">
      <slot name="card-header"></slot>
    </div>
    <slot name="card-body"></slot>
    <div class="mt-6 pt-6 border-t border-t-primary-8% text-center">
      <slot name="card-footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
