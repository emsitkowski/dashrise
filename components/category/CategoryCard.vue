<template>
  <Card>
    <template #card-body>
      <div class="relative flex justify-between items-center mb-3">
        <span class="uppercase text-sm sm:text-base">{{ category.name }}</span>
        <div class="absolute top-0 right-0">
          <Button variant="ghost" size="sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-more-horizontal"
            >
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="19" cy="12" r="1"></circle>
              <circle cx="5" cy="12" r="1"></circle>
            </svg>
          </Button>
        </div>
      </div>
      <div class="mb-6">
        <span class="text-2xl sm:text-3xl font-medium leading-none">
          {{ totalValue > 0 ? convertToCurrency(totalValue) : "–" }}
          <span class="text-sm sm:text-base text-dark-32% whitespace-nowrap font-normal"
            >/ {{ convertToCurrency(category.limitValue) }}</span
          >
        </span>
      </div>
      <ProgressBar
        :label="leftValue ? convertToCurrency(leftValue) + ' left' : '–' + ' left'"
        :progress="(totalValue / category.limitValue) * 100"
      />
    </template>
  </Card>
</template>

<script setup lang="ts">
const props = defineProps(["category"]);

const totalValue = computed(() => {
  const expenses = useTransactionStore()
    .getExpensesByCategories()
    .filter((el) => el.category === props.category.name);

  return expenses.length > 0 ? expenses[0].totalValue : 0;
});

const leftValue = computed(() => {
  return props.category.limitValue - totalValue.value;
});
</script>

<style scoped></style>
