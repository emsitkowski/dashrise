import { defineStore } from "pinia";
import { nanoid } from "nanoid";
import type { CategoryExpense, Transaction } from "~/src/types/global";

export const useTransactionStore = defineStore("transactions", () => {
  const transactions = ref<Transaction[]>([]);
  const loading = ref(true);

  // Fetch all transactions from database and save them in the store
  async function fetchAllTransactions() {
    transactions.value = (await useSupabaseDatabase().fetchItems("transactions")) as Transaction[];

    loading.value = false;
  }

  // Save new transaction
  async function saveTransaction(transaction: Transaction) {
    transaction.id = nanoid();

    await useSupabaseDatabase().saveItem("transaction", transaction);
    transactions.value.unshift(transaction);

    // Sort transactions by date, or name if date is the same
    transactions.value.sort((a, b) => {
      return b.date.localeCompare(a.date);
    });
  }

  // Delete transaction
  async function deleteTransaction(transaction: Transaction) {
    await useSupabaseDatabase().deleteItem("transaction", transaction);
    transactions.value = transactions.value.filter((el) => el.id !== transaction.id);
  }

  // Edit transaction
  async function editTransaction(transaction: Transaction) {
    await useSupabaseDatabase().editItem("transaction", transaction);
    transactions.value = transactions.value.map((el) => (el.id === transaction.id ? { ...transaction } : el));
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

  // Calculate total values for specified date
  const totalValues = computed(() => {
    return (type: "Income" | "Expense", date?: { year: string; month: string }) => {
      const transactionsToCalculate: Transaction[] = date
        ? useTransactionStore().filterTransactionsByDate(date)
        : transactions.value;

      return transactionsToCalculate.reduce(
        (total: number, transaction: Transaction) => (transaction.type === type ? total + transaction.value : total),
        0
      );
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

  // Calculate monthly summary of all transactions
  const transactionsMonthlySummary = computed(() => {
    return transactions.value;
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
    transactionsMonthlySummary,
    loading,
  };
});
