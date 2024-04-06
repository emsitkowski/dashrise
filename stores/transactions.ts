import { defineStore } from "pinia";
import { useSupabaseDatabase } from "~/composables/useSupabaseDatabase";
import { nanoid } from "nanoid";
import type { Transaction } from "~/src/types/global";

export const useTransactionStore = defineStore("transactions", () => {
  const error = ref("");
  const transactions = ref<Transaction[]>([]);
  const loading = ref(false);

  // Clear store
  function clear() {
    transactions.value = [];
  }

  // Toggle loading
  function toggleLoading(state: boolean) {
    loading.value = state;
  }

  // Sort transactions by date
  function sortByDate() {
    transactions.value.sort((a, b) => a.date.localeCompare(b.date)).reverse();
  }

  // Save new transaction
  async function saveTransaction(transaction: Transaction) {
    toggleLoading(true);

    try {
      const newTransaction: Transaction = {
        id: nanoid(),
        date: transaction.date,
        type: transaction.type,
        category: transaction.category,
        value:
          typeof transaction.value === "string" ? parseFloat(transaction.value.replace(",", ".")) : transaction.value,
        name: transaction.name,
      };

      // Save in database
      await useSupabaseDatabase().saveTransaction(newTransaction);

      // Save in store
      transactions.value.push(newTransaction);

      // Sort by date
      sortByDate();
    } catch (error: any) {
      console.error("Failed to save new transaction: ", error);
      error.value = error;
    }

    toggleLoading(false);
  }

  // Fetch transactions from database
  async function fetchTransactionsFromDatabase() {
    toggleLoading(true);

    // Retrieve data from database and save it in store
    try {
      transactions.value = (await useSupabaseDatabase().getTransactions()) as any;
    } catch (error: any) {
      console.error("Failed to fetch transactions from database: ", error);
      error.value = error;
    }

    toggleLoading(false);
  }

  // Filter transactions by a given date, with optional limit
  const filterTransactionsByDate = computed(() => {
    return (month: string | number, year: string | number, limit: number) => {
      const filterTransactions = transactions.value.filter((transaction: Transaction) =>
        transaction.date.includes(`${month}-${year}`)
      );

      // Return limited number of transactions
      return filterTransactions.slice(0, limit);
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

  return {
    clear,
    transactions,
    saveTransaction,
    fetchTransactionsFromDatabase,
    filterTransactionsByDate,
    getTotalTransactionValues,
    loading,
    error,
  };
});
