<template>
  <div class="block p-4 sm:p-8 rounded-2xl bg-white divide-y divide-primary-8% overflow-x-auto">
    <!-- Card header -->
    <div :class="{ 'flex justify-between items-center mb-6': $slots['card-header'] }">
      <slot name="card-header"></slot>
    </div>

    <!-- Card body -->
    <slot name="card-body"></slot>

    <!-- Card footer -->
    <div :class="{ 'mt-6 pt-6  text-center': $slots['card-footer'] }">
      <slot name="card-footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
