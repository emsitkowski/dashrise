<template>
  <div>
    <!-- Page header -->
    <PageHeader
      header-text="Budget"
      subheader-text="Adjust the limits for each category and track current month's progress"
      :button="true"
      button-text="Add category"
      :button-icon="true"
      button-icon-type="plus"
      :button-icon-leading="true"
      @button-click="isModalOpen = true"
    />
    <div class="">
      <div v-if="!useCategoryStore().loading" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-8">
        <CategoryCard
          v-if="useCategoryStore().categories.length > 0"
          v-for="category in useCategoryStore().categories"
          :category="category"
          class="[&>*]:h-full"
          :class="{ 'order-1': category.limitValue == 0 }"
        />

        <!-- No items found label -->
        <InfoLabel v-else position="horizontal" label="No categories found" />
      </div>

      <!-- Loading spinner -->
      <SpinnerLoader
        v-else
        label="Loading categories..."
        position="horizontal"
        stroke-color-class="stroke-dark-500"
        :loading="useCategoryStore().loading"
      />
    </div>

    <!-- Category modal -->
    <CategoryActionsModal :open="isModalOpen" @close="isModalOpen = false" @success="isModalOpen = false" />
  </div>
</template>

<script setup lang="ts">
const isModalOpen = ref(false);
</script>

<style scoped></style>
