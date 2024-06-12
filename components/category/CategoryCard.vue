<template>
  <div v-if="props.category">
    <Card :class="{ 'opacity-50': category.limitValue == 0 }">
      <template #card-body>
        <div class="flex flex-col">
          <div class="flex justify-between items-center mb-4">
            <div class="flex items-center pr-14">
              <!-- Category name -->
              <span class="text-base sm:text-lg font-bold">
                {{ category.name }}
              </span>
            </div>

            <!-- Action button -->
            <div class="absolute top-5 right-5">
              <Button variant="ghost" size="sm" @click="isModalOpen = true" :icon="true" icon-type="edit" />
            </div>
          </div>

          <!-- Category progress -->
          <div class="flex items-center gap-2 mt-auto">
            <div
              class="contents text-2xl font-medium leading-none"
              :class="leftValue < 0 ? 'text-secondary-500' : 'text-dark-500'"
            >
              <span>
                {{ totalValue > 0 ? convertToCurrency(totalValue) : "–" }}
              </span>
              <span class="text-sm sm:text-base font-normal whitespace-nowrap text-dark-60%">
                / {{ convertToCurrency(category.limitValue) }}
              </span>
            </div>

            <!-- Category note indicator + modal trigger -->
            <button
              v-if="category.note"
              class="w-7 h-7 sm:ml-1 p-[6px] rounded-md sm:rounded-lg bg-primary-4%"
              type="button"
              @click="isModalOpen = true"
            >
              <img src="~/assets/icons/file-primary.svg" alt="file text" />
            </button>
          </div>

          <ProgressBar
            v-if="$props.category.limitValue > 0"
            class="mt-4"
            :label="progressLabel"
            :progress="(totalValue / category.limitValue) * 100"
            :color="progressColor"
            :label-color="labelColor"
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
  } else if (leftValue.value === 0 && props.category.limitValue != 0) {
    return `Budget limit achieved`;
  } else {
    return `&nbsp;`;
  }
});

// Generate correct label color
const labelColor = computed(() => {
  if (leftValue.value > 0 && totalValue.value > 0) {
    return "text-primary-500";
  } else if (leftValue.value < 0) {
    return "text-secondary-500";
  } else if (leftValue.value === 0) {
    return "text-success";
  }
});

// Generate correct progress bar and its label color
const progressColor = computed(() => {
  if (leftValue.value > 0 && totalValue.value > 0) {
    return "bg-primary-500";
  } else if (leftValue.value < 0) {
    return "bg-secondary-500";
  } else if (leftValue.value === 0) {
    return "bg-success";
  }
});
</script>

<style scoped></style>
