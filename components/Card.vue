<template>
  <div class="inline-block p-6 sm:p-8 rounded-2xl bg-white">
    <!-- Card header -->
    <div :class="{ 'flex justify-between items-center mb-6 pb-6 border-b border-b-primary-8%': $slots['card-header'] }">
      <slot name="card-header"></slot>
    </div>

    <!-- Card body -->
    <slot name="card-body"></slot>

    <!-- Card footer -->
    <div :class="{ 'mt-6 pt-6 border-t border-t-primary-8% text-center': $slots['card-footer'] }">
      <slot name="card-footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
