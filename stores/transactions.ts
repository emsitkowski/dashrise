import { defineStore } from "pinia";
import { nanoid } from "nanoid";
import type { CategoryExpense, Transaction } from "~/src/types/global";

export const useTransactionStore = defineStore("transactions", () => {
  const transactions = ref<Transaction[]>([]);
  const loading = ref(true);

  // Toggle loading
  function toggleLoading(state: boolean) {
    loading.value = state;
  }

  // Sort transactions by date
  function sortByDate() {
    transactions.value.sort((a, b) => {
      return a.date === b.date ? a.name.localeCompare(b.name) : b.date.localeCompare(a.date);
    });
  }

  // Fetch all transactions from database and save them in the store
  async function fetchAllTransactions() {
    try {
      transactions.value = (await useSupabaseTransactions().getTransactions()) as Transaction[];
    } catch (error) {
      console.error("Failed to fetch transactions from database: ", error);
    }

    toggleLoading(false);
  }

  // Save new transaction
  async function saveTransaction(transaction: Transaction) {
    try {
      // Add unique id for the transaction
      transaction.id = nanoid();

      // Save transaction to database and store
      await useSupabaseTransactions().saveTransaction(transaction);
      transactions.value.unshift(transaction);

      // Sort transactions by date
      sortByDate();
    } catch (error: any) {
      console.error("Failed to save new transaction: ", error);
      error.value = error;
    }

    toggleLoading(false);
  }

  // Delete transaction
  async function deleteTransaction(transaction: Transaction) {
    try {
      // Delete transaction from database and store
      await useSupabaseTransactions().deleteTransaction(transaction);
      transactions.value = transactions.value.filter((el) => el.id !== transaction.id);
    } catch (error: any) {
      console.error("Failed to delete transaction: ", error);
      error.value = error;
    }

    toggleLoading(false);
  }

  // Edit transaction
  async function editTransaction(transaction: Transaction) {
    try {
      // Delete transaction from database and store
      await useSupabaseTransactions().editTransaction(transaction);
      transactions.value = transactions.value.map((el) => (el.id === transaction.id ? { ...transaction } : el));
    } catch (error: any) {
      console.error("Failed to edit transaction: ", error);
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

      // Return expenses sorted descendingly by value
      return expenses.sort((a, b) => b.totalValue - a.totalValue);
    };
  });

  return {
    transactions,
    saveTransaction,
    deleteTransaction,
    editTransaction,
    fetchAllTransactions,
    filterTransactionsByDate,
    totalValues,
    expensesByCategories,
    loading,
  };
});
