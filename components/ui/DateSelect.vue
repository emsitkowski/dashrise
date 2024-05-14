<template>
  <div class="flex gap-6 [&>*]:w-full max-w-md">
    <SelectMenu
      :options="years"
      :default-selection="yearSelected"
      v-model="yearSelected"
      @select="handleSelection"
    ></SelectMenu>
    <SelectMenu
      :options="months"
      :default-selection="monthSelected"
      v-model="monthSelected"
      @select="handleSelection"
    ></SelectMenu>
  </div>
</template>

<script setup lang="ts">
// Define months
const monthsObjects = [
  { name: "January", value: "01" },
  { name: "February", value: "02" },
  { name: "March", value: "03" },
  { name: "April", value: "04" },
  { name: "May", value: "05" },
  { name: "June", value: "06" },
  { name: "July", value: "07" },
  { name: "August", value: "08" },
  { name: "September", value: "09" },
  { name: "October", value: "10" },
  { name: "November", value: "11" },
  { name: "December", value: "12" },
];

const yearSelected = ref<string>(useSelectedDate().selectedDate.year);
const monthSelected = ref<string>(
  monthsObjects.find((el) => el.value === useSelectedDate().selectedDate.month)?.name as string
);

// Compute years array, starting from start year to current year
const years = computed(() => {
  const startYear = 2024;
  const endYear = Number(getCurrentYear());
  const years = [];

  for (let i = startYear; i <= endYear; i++) {
    years.push(i.toString());
  }

  // Return years sorted descendingly
  return years.sort((a, b) => b.localeCompare(a));
});

// Compute months names
const months = computed(() => monthsObjects.map((month) => month.name));

// Handle date selection
function handleSelection() {
  // Save selected date in store
  useSelectedDate().setDate(
    yearSelected.value,
    monthsObjects.find((el) => el.name === monthSelected.value)?.value as string
  );
}
</script>

<style scoped></style>
