import { defineStore } from "pinia";
import { useSupabaseDatabase } from "~/composables/useSupabaseDatabase";
import { nanoid } from "nanoid";
import type { CategoryExpense, Transaction } from "~/src/types/global";

export const useTransactionStore = defineStore("transactions", () => {
  const transactions = ref<Transaction[]>([]);
  const storeError = ref();
  const loading = ref(false);

  // Toggle loading
  function toggleLoading(state: boolean) {
    loading.value = state;
  }

  // Sort transactions by date
  function sortByDate() {
    transactions.value.sort((a, b) => a.date.localeCompare(b.date)).reverse();
  }

  // Fetch all transactions from database and save them in store
  async function fetchAllTransactions() {
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
      transactions.value.unshift(transaction);
    } catch (error: any) {
      console.error("Failed to save new transaction: ", error);
      error.value = error;
    }

    toggleLoading(false);
  }

  // Filter transactions by a given date, with optional limit
  const filterTransactionsByDate = computed(() => {
    return (date: { year: string; month: string }, limit?: number | undefined) => {
      const results = transactions.value.filter((transaction: Transaction) =>
        transaction.date.includes(`${date.year}-${date.month}`)
      );

      return limit ? results.slice(0, limit) : results;
    };
  });

  // Calculate total values
  const totalValues = computed(() => {
    return (type: "Income" | "Expense", date?: { year: string; month: string }) => {
      const transactionsToCalculate: Transaction[] = date
        ? useTransactionStore().filterTransactionsByDate(date)
        : transactions.value;

      return transactionsToCalculate.reduce((total, transaction) => {
        if (transaction.type === type) {
          total += transaction.value as number;
        }
        return total;
      }, 0);
    };
  });

  // Calculate total transaction values by categories, filtered by date
  const expensesByCategories = computed(() => {
    return (date: { year: string; month: string }) => {
      const expenses: CategoryExpense[] = [];

      useTransactionStore()
        .filterTransactionsByDate(date)
        .forEach((transaction: Transaction) => {
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
    fetchAllTransactions,
    filterTransactionsByDate,
    totalValues,
    expensesByCategories,
    loading,
    storeError,
  };
});
