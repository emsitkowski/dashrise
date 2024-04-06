import type { Transaction, Category } from "~/src/types/global";

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
          value:
            typeof transaction.value === "string" ? parseFloat(transaction.value.replace(",", ".")) : transaction.value,
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
      .order("date", { ascending: false })
      .order("created_at", { ascending: false });

    if (error) {
      handleError(error);
    } else {
      return data;
    }
  };

  const saveCategory = async (category: Category) => {
    const allCategoriesStoredInDatabase = await useSupabaseDatabase().getAllCategories();
    const userCategoriesStoredInDatabase = await useSupabaseDatabase().getUserCategories();

    // Save new category in Categories table in the database if it doesn't exist yet
    if (allCategoriesStoredInDatabase!.filter((el: Category) => el.name === category.name).length === 0) {
      const { error } = await useSupabaseClient()
        .from("Categories")
        .insert([
          {
            id: category.id,
            name: category.name,
          },
        ] as never);

      if (error) {
        console.log(error);
      }
    }

    // Save new category in UserCategories table if it doesn't exist yet
    if (userCategoriesStoredInDatabase!.filter((el: Category) => el.name === category.name).length === 0) {
      const { error } = await useSupabaseClient()
        .from("UserCategories")
        .insert([
          {
            name: category.name,
            limitValue: category.limitValue,
          },
        ] as never);

      if (error) {
        console.log(error);
      }
    }
  };

  const getAllCategories = async () => {
    const { data, error } = await useSupabaseClient().from("Categories").select("*");

    if (error) {
      handleError(error);
    } else {
      return data;
    }
  };

  const getUserCategories = async () => {
    const { data, error } = await useSupabaseClient().from("UserCategories").select("*");

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

  return { saveTransaction, getTransactions, saveCategory, getAllCategories, getUserCategories };
};
