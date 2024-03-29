<template>
  <div class="flex flex-col">
    <div
      class="relative flex w-full h-10 mb-4 p-1 bg-dark-4% rounded-md overflow-hidden text-sm font-medium [&>.active]:bg-white [&>.active]:text-dark-500"
    >
      <!-- Tab links -->
      <div
        v-for="(tab, index) in items"
        class="flex basis-1/3 items-center justify-center flex-grow rounded text-dark-32% cursor-pointer select-none duration-300"
        :class="{ 'bg-white text-dark-500': activeTab === index }"
        :key="index"
        @click="setActiveTab(index), $emit('tabSwitch', tab)"
      >
        {{ tab.label }}
      </div>
    </div>

    <!-- Tab content -->
    <div v-show="activeTab === index" v-for="(tab, index) in items">
      <slot :name="tab.label"></slot>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps(["items"]);
const emit = defineEmits(["tabSwitch"]);
const activeTab = ref(0);

function setActiveTab(index: number) {
  activeTab.value = index;
}
</script>

<style scoped></style>
