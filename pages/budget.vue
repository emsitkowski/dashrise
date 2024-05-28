<template>
  <div>
    <!-- Page header -->
    <PageHeader
      :header-text="`Budget – ${getCurrentMonthName()} ${getCurrentYear()}`"
      subheader-text="Plan and manage your budget for each category"
      :button="true"
      button-text="Add category"
      :button-icon="true"
      button-icon-type="plus"
      :button-icon-leading="true"
      @button-click="isModalOpen = true"
    />
    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-8">
      <div v-if="useCategoryStore().categories.length < 1">
        <div class="flex items-center gap-1 sm:gap-2 w-full h-full text-dark-32%">
          <img class="w-5 sm:w-6" src="~assets/icons/info.svg" alt="" />
          <span>No budget categories found</span>
        </div>
      </div>
      <CategoryCard
        v-else
        v-for="category in useCategoryStore().categories"
        :category="category"
        class="[&>*]:h-full"
        :class="{ 'order-1': category.limitValue == 0 }"
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
