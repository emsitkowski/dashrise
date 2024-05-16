<template>
  <button
    class="flex justify-between items-center px-3 py-2 bg-white-60% border-gray-300 cursor-pointer border rounded-md"
    type="button"
  >
    <slot></slot>

    <div class="ml-auto pointer-events-none">
      <img src="~assets/icons/chevron-down.svg" alt="" />
    </div>
  </button>
</template>
