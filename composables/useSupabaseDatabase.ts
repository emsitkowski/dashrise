import type { Transaction } from "~/src/types/global";

export const useSupabaseDatabase = () => {
  const databaseError = ref("");

  const saveTransaction = async (transaction: Transaction) => {
    const { error } = await useSupabaseClient()
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

    return handleResponse(error);
  };

  function handleResponse(error: any) {
    // save error message to a ref
    if (error) {
      databaseError.value = error.message;
      return error;
    } else {
      // auth action successful
      return true;
    }
  }

  return { saveTransaction, databaseError };
};
