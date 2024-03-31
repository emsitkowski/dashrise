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

  // Save new transaction
  async function saveTransaction(transaction: Transaction) {
    const newTransaction: Transaction = {
      id: nanoid(),
      date: transaction.date,
      type: transaction.type,
      category: transaction.category,
      value: transaction.value,
      name: transaction.name,
    };

    // Save new transactions in database
    await useSupabaseDatabase().saveTransaction(newTransaction);

    // Save new transactions in store
    if (transactions.value) {
      transactions.value.push(newTransaction);
    }
    console.log(newTransaction);
  }

  // Save new transaction
  async function fetchTransactionsFromDatabase() {
    loading.value = true;
    // retrieve data from database
    transactions.value = (await useSupabaseDatabase().getTransactions()) as any;

    loading.value = false;
  }

  return {
    clear,
    transactions,
    saveTransaction,
    fetchTransactionsFromDatabase,
    loading,
    error,
  };
});
