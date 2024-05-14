<template>
  <div v-if="props.category">
    <Card>
      <template #card-body>
        <div class="flex flex-col h-full">
          <div class="flex justify-between items-center mb-3">
            <span class="uppercase text-sm sm:text-base pr-14">{{ category.name }}</span>
            <div class="absolute top-5 right-5">
              <Button variant="ghost" size="sm" @click="isModalOpen = true" :icon="true" icon-type="edit" />
            </div>
          </div>
          <div class="mb-6 mt-auto">
            <span
              class="text-2xl sm:text-3xl font-medium leading-none"
              :class="{ 'text-secondary-500': leftValue < 0 }"
            >
              {{ totalValue > 0 ? convertToCurrency(totalValue) : "–" }}
              <span class="text-sm sm:text-base text-dark-32% whitespace-nowrap font-normal"
                >/ {{ convertToCurrency(category.limitValue) }}</span
              >
            </span>
          </div>
          <ProgressBar
            :label="progressLabel"
            :progress="(totalValue / category.limitValue) * 100"
            :color="leftValue >= 0 ? 'primary' : 'secondary'"
          />
        </div>
      </template>
    </Card>

    <!-- Category modal -->
    <CategoryActionsModal
      v-if="isModalOpen"
      mode="edit"
      :category="props.category"
      :open="isModalOpen"
      @close="isModalOpen = false"
      @success="isModalOpen = false"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps(["category"]);
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
