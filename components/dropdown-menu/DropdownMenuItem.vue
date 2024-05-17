<template>
  <div class="hover:bg-dark-4% px-3 py-2 rounded cursor-pointer [&>div]:pointer-events-none" @click="$emit('select')">
    <slot></slot>
  </div>
</template>
