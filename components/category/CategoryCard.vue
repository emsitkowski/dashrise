<template>
  <div v-if="props.category">
    <Card :class="{ 'opacity-50': category.limitValue == 0 }">
      <template #card-body>
        <div class="flex flex-col h-full">
          <div class="flex justify-between items-center mb-4">
            <div class="flex items-center gap-2 pr-14">
              <!-- Category name -->
              <span class="text-base sm:text-lg font-semibold">
                {{ category.name }}
              </span>
            </div>

            <!-- Action button -->
            <div class="absolute top-5 right-5">
              <Button variant="ghost" size="sm" @click="isModalOpen = true" :icon="true" icon-type="edit" />
            </div>
          </div>

          <!-- Category progress -->
          <div class="flex items-center gap-2 mb-6 mt-auto">
            <span
              class="contents text-2xl sm:text-2xl font-semibold leading-none"
              :class="leftValue < 0 ? 'text-secondary-500' : 'text-dark-500'"
            >
              {{ totalValue > 0 ? convertToCurrency(totalValue) : "–" }}
              <span class="text-sm sm:text-base font-normal whitespace-nowrap">
                / {{ convertToCurrency(category.limitValue) }}
              </span>
            </span>
          </div>

          <ProgressBar
            :label="progressLabel"
            :progress="(totalValue / category.limitValue) * 100"
            :color="leftValue >= 0 ? 'primary' : 'secondary'"
          />

          <!-- Category note indicator -->
          <img
            v-if="category.note"
            class="absolute bottom-6 sm:bottom-8 w-4 h-4"
            src="~/assets/icons/file.svg"
            alt="file text"
          />
        </div>
      </template>
    </Card>

    <!-- Category modal -->
    <CategoryActionsModal
      mode="edit"
      :category-to-edit="props.category"
      :open="isModalOpen"
      @close="isModalOpen = false"
      @success="isModalOpen = false"
    />
  </div>
</template>

<script setup lang="ts">
import type { Category } from "~/src/types/global";

const props = defineProps<{
  category: Category;
}>();
const isModalOpen = ref(false);

// Calculate total transactions value for the category
const totalValue = computed(() => {
  const expenses = useTransactionStore()
    .expensesByCategories(getCurrentDate())
    .filter((el) => el.category === props.category.name);

  return expenses.length > 0 ? expenses[0].totalValue : 0;
});

// Calculate left amount limit for the category
const leftValue = computed(() => {
  return props.category.limitValue - totalValue.value;
});

// Generate correct progress bar label
const progressLabel = computed(() => {
  if (leftValue.value < 0) {
    return `${convertToCurrency(-leftValue.value)} overspent`;
  } else if (leftValue.value > 0) {
    return `${convertToCurrency(leftValue.value)} left`;
  } else {
    return `&nbsp;`;
  }
});
</script>

<style scoped></style>
