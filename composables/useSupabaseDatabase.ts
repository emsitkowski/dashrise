import type { Transaction, Category } from "~/src/types/global";
import { nanoid } from "nanoid";

export const useSupabaseDatabase = () => {
  // Helper function to handle responses
  const handleSupabaseResponse = async (response: any) => {
    const { error, data } = await response;

    if (error) {
      throw new Error(error.message);
    } else {
      return data;
    }
  };

  // Fetch items from database
  const fetchItems = async (type: "transactions" | "categories") => {
    if (type === "transactions") {
      const response = await useSupabaseClient()
        .from("Transactions")
        .select("*")
        .order("date", { ascending: false })
        .order("created_at", { ascending: false });

      return handleSupabaseResponse(response);
    } else if (type === "categories") {
      const response = await useSupabaseClient().from("UserCategories").select("*");

      return handleSupabaseResponse(response);
    }
  };

  // Save item in database
  const saveItem = async (type: "transaction" | "category", item: Transaction | Category) => {
    if (type === "transaction") {
      const response = await useSupabaseClient()
        .from("Transactions")
        .insert([{ ...item }] as never);

      return handleSupabaseResponse(response);
    } else if (type === "category") {
      // save Category and UserCategory if they don't exist yet in the database

      try {
        await useSupabaseClient()
          .from("Categories")
          .insert([{ id: nanoid(), name: item.name }] as never);
      } finally {
        const response = await useSupabaseClient()
          .from("UserCategories")
          .insert([item] as never);

        return handleSupabaseResponse(response);
      }
    }
  };

  // Delete item from database
  const deleteItem = async (type: "transaction" | "category", item: Transaction | Category) => {
    if (type === "transaction") {
      const response = await useSupabaseClient().from("Transactions").delete().eq("id", item.id!);

      return handleSupabaseResponse(response);
    } else if (type === "category") {
      const response = await useSupabaseClient().from("UserCategories").delete().eq("name", item.name);

      return handleSupabaseResponse(response);
    }
  };

  // Edit item in database
  const editItem = async (type: "transaction" | "category", item: Transaction | Category) => {
    if (type === "transaction") {
      const response = await useSupabaseClient()
        .from("Transactions")
        .update({ ...item } as never)
        .eq("id", item.id!);

      return handleSupabaseResponse(response);
    } else if (type === "category") {
      const response = await useSupabaseClient()
        .from("UserCategories")
        .update({ limitValue: (item as Category).limitValue, note: (item as Category).note } as never)
        .eq("name", item.name)
        .select("*");

      return handleSupabaseResponse(response);
    }
  };

  return { fetchItems, saveItem, deleteItem, editItem };
};
