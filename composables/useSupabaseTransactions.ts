import type { Transaction } from "~/src/types/global";

export const useSupabaseTransactions = () => {
  const saveTransaction = async (transaction: Transaction) => {
    const { error } = await useSupabaseClient()
      .from("Transactions")
      .insert([transaction] as never);

    if (error) {
      throw new Error(error.message);
    }
  };

  const deleteTransaction = async (transaction: Transaction) => {
    const { error } = await useSupabaseClient().from("Transactions").delete().eq("id", transaction.id!);

    if (error) {
      throw new Error(error.message);
    }
  };

  const getTransactions = async () => {
    const { data, error } = await useSupabaseClient()
      .from("Transactions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(error.message);
    } else {
      return data;
    }
  };

  return { saveTransaction, deleteTransaction, getTransactions };
};
