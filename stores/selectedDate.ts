export const useSelectedDate = defineStore("selected-date", () => {
  const selectedDate = ref({ year: getCurrentYear(), month: getCurrentMonth() });

  const setDate = (year: string, month: string) => {
    selectedDate.value.year = year;
    selectedDate.value.month = month;
  };

  return { selectedDate, setDate };
});
