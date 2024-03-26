<template>
  <div class="inline-block p-8 rounded-2xl bg-white">
    <div class="mb-6 pb-6 border-b border-b-primary-8% text-center">
      <slot name="card-header"></slot>
    </div>
    <slot name="card-body"></slot>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
