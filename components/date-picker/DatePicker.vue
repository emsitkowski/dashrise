<template>
  <DatePickerContainer>
    <Select :options="years" v-model="selectedYear" :default-value="selectedYear" @select="handleSelection"></Select>
    <Select :options="months" v-model="selectedMonth" :default-value="selectedMonth" @select="handleSelection"></Select>
  </DatePickerContainer>
</template>

<script setup lang="ts">
const props = defineProps({
  startYear: {
    type: Number,
    required: true,
  },
});
// Define months
const monthsList = [
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

const selectedYear = ref<string>(useSelectedDate().selectedDate.year);
const selectedMonth = ref<string>(
  monthsList.find((el) => el.value === useSelectedDate().selectedDate.month)?.name as string
);

// Compute years array, starting from start year to current year
const years = computed(() => {
  const startYear = props.startYear;
  const endYear = Number(getCurrentYear());
  const years = [];

  for (let i = startYear; i <= endYear; i++) {
    years.push(i.toString());
  }

  // Return years sorted descendingly
  return years.sort((a, b) => b.localeCompare(a));
});

// Compute months names
const months = computed(() => monthsList.map((month) => month.name));

// Handle date selection
function handleSelection() {
  // Save selected date in store
  useSelectedDate().setDate(
    selectedYear.value,
    monthsList.find((el) => el.name === selectedMonth.value)?.value as string
  );
}
</script>
