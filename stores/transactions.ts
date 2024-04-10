import { defineStore } from "pinia";
import { useSupabaseDatabase } from "~/composables/useSupabaseDatabase";
import { nanoid } from "nanoid";
import type { CategoryExpense, Transaction } from "~/src/types/global";

export const useTransactionStore = defineStore("transactions", () => {
  const storeError = ref();
  const transactions = ref<Transaction[]>([]);
  const loading = ref(false);

  // Toggle loading
  function toggleLoading(state: boolean) {
    loading.value = state;
  }

  // Sort transactions by date
  function sortByDate() {
    transactions.value.sort((a, b) => a.date.localeCompare(b.date)).reverse();
  }

  // Fetch transactions from database and save them in store
  async function fetchTransactions() {
    toggleLoading(true);

    try {
      transactions.value = (await useSupabaseDatabase().getTransactions()) as Transaction[];
    } catch (error) {
      console.error("Failed to fetch transactions from database: ", error);
      storeError.value = error;
    }

    toggleLoading(false);
  }

  // Save new transaction
  async function saveTransaction(transaction: Transaction) {
    toggleLoading(true);

    try {
      // Add unique id to the transaction
      transaction.id = nanoid();

      // Save transaction in database
      await useSupabaseDatabase().saveTransaction(transaction);

      // Save transaction in the store
      transactions.value.push(transaction);
    } catch (error: any) {
      console.error("Failed to save new transaction: ", error);
      error.value = error;
    }

    // Sort transactions by date
    sortByDate();

    toggleLoading(false);
  }

  // Filter transactions by a given date, with optional limit
  const filterTransactionsByDate = computed(() => {
    return (month: string | number, year: string | number, limit: number) => {
      return transactions.value
        .filter((transaction: Transaction) => transaction.date.includes(`${month}-${year}`))
        .slice(0, limit);
    };
  });

  // Calculate total transaction values
  const getTotalTransactionValues = computed(() => {
    let totalIncome = 0;
    let totalExpenses = 0;
    let totalSavings = 0;

    transactions.value.forEach((transaction) => {
      if (transaction.type === "Income") {
        totalIncome += transaction.value as number;
      } else if (transaction.type === "Expense") {
        totalExpenses += transaction.value as number;
      } else if (transaction.type === "Savings") {
        totalSavings += transaction.value as number;
      }
    });

    return { totalIncome, totalExpenses, totalSavings };
  });

  // Calculate total transaction values by categories
  const getExpensesByCategories = computed(() => {
    return () => {
      const expenses: CategoryExpense[] = [];

      transactions.value.forEach((transaction: Transaction) => {
        // Check if it's an expense
        if (transaction.type === "Expense") {
          // If category doesn't exist, initialize it with the transaction value
          if (!expenses.find((el) => el.category === transaction.category)) {
            const filteredCategory = useCategoryStore().categories.filter(
              (category) => category.name === transaction.category
            );
            const categoryLimit = filteredCategory.length > 0 ? filteredCategory[0].limitValue : 0;

            // Save expense in a variable
            expenses.push({
              category: transaction.category as string,
              totalValue: transaction.value as number,
              limitValue: categoryLimit as number,
            });
          } else {
            // If category exists, add transaction value to the existing total value
            const category = expenses.find((el) => el.category === transaction.category);

            if (category) {
              category.totalValue += transaction.value as number;
            }
          }
        }
      });

      return expenses;
    };
  });

  return {
    transactions,
    saveTransaction,
    fetchTransactions,
    filterTransactionsByDate,
    getTotalTransactionValues,
    getExpensesByCategories,
    loading,
    storeError,
  };
});
