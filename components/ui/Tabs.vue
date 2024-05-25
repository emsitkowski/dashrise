<template>
  <div class="flex flex-col">
    <div
      class="relative flex w-full h-10 p-1 bg-dark-4% rounded-md overflow-hidden text-sm font-medium [&>.active]:bg-white [&>.active]:text-dark-500"
    >
      <!-- Tab links -->
      <div
        v-for="(tab, index) in items"
        class="flex basis-1/3 items-center justify-center flex-grow rounded text-dark-32% select-none duration-300"
        :class="[
          props.value === index ? 'bg-white text-dark-500' : '',
          disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        ]"
        :key="index"
        @click="switchTab(index)"
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
const props = defineProps(["items", "value", "disabled"]);
const emit = defineEmits(["update:value"]);
const activeTab = ref(props.value); // set initial active tab to first one

function switchTab(index: number) {
  if (!props.disabled) {
    activeTab.value = index;
    emit("update:value", index);
  }
}
</script>

<style scoped></style>
