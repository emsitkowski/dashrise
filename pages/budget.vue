<template>
  <div>
    <!-- Page header -->
    <PageHeader
      header-text="Monthly budget"
      subheader-text="You can set monthly budget limits for each category"
      :button="true"
      button-text="Add category"
      :button-icon="true"
      button-icon-type="plus"
      @button-click="isModalOpen = true"
    />
    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-8">
      <CategoryCard :category="category" v-for="category in useCategoryStore().categories" />
    </div>

    <!-- Category modal -->
    <CategoryActionsModal :open="isModalOpen" @close="isModalOpen = false" @success="isModalOpen = false" />
  </div>
</template>

<script setup lang="ts">
const isModalOpen = ref(false);
</script>

<style scoped></style>
