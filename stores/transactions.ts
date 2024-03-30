import { defineStore } from "pinia";
import { useSupabaseDatabase } from "~/composables/useSupabaseDatabase";
import { nanoid } from "nanoid";
import type { Transaction } from "~/src/types/global";

export const useTransactionStore = defineStore("transactions", () => {
  const error = ref("");
  const transactions = ref<Transaction[]>([]);

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
    const { error } = await useSupabaseDatabase().saveTransaction(newTransaction);

    // save error message to a ref
    if (error) {
      error.value = error.message;
      return false;
    } else {
      // Save new transactions in store
      transactions.value.push(newTransaction);
      console.log(newTransaction);
      return true;
    }
  }

  return {
    clear,
    transactions,
    saveTransaction,
    error,
  };
});
