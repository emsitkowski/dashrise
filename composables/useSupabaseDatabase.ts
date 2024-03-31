import type { Transaction } from "~/src/types/global";

export const useSupabaseDatabase = () => {
  const saveTransaction = async (transaction: Transaction) => {
    const { data, error } = await useSupabaseClient()
      .from("Transactions")
      .insert([
        {
          id: transaction.id,
          date: transaction.date,
          type: transaction.type,
          category: transaction.category,
          name: transaction.name,
          value: transaction.value,
        },
      ] as never);

    if (error) {
      handleError(error);
    } else {
      return data;
    }
  };

  const getTransactions = async () => {
    const { data, error } = await useSupabaseClient()
      .from("Transactions")
      .select("*")
      .order("date", { ascending: false });

    if (error) {
      handleError(error);
    } else {
      return data;
    }
  };

  function handleError(error: any) {
    // save error message to a ref
    if (error) {
      throw Error(error);
    }
  }

  return { saveTransaction, getTransactions };
};
