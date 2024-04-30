import type { Category } from "~/src/types/global";

export const useSupabaseCategories = () => {
  const saveCategory = async (category: Category) => {
    const userCategoriesStoredInDatabase = await useSupabaseCategories().fetchUserCategories();

    // Save new category in Categories table in the database if it doesn't exist yet
    const { error } = await useSupabaseClient()
      .from("Categories")
      .insert([
        {
          id: category.id,
          name: category.name,
        },
      ] as never);

    if (error) {
      throw new Error(error.message);
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

  // Edit category in UserCategories table
  const editCategory = async (category: Category) => {
    const { data, error } = await useSupabaseClient()
      .from("UserCategories")
      .update({ limitValue: category.limitValue } as never)
      .eq("name", category.name)
      .select("*");

    if (error) {
      throw new Error(error.message);
    }
  };

  // Delete category from UserCategories table
  const deleteCategory = async (category: Category) => {
    const { data, error } = await useSupabaseClient().from("UserCategories").delete().eq("name", category.name);

    if (error) {
      throw new Error(error.message);
    }
  };

  // Fetch all categories from Categories table
  const fetchCategories = async () => {
    const { data, error } = await useSupabaseClient().from("Categories").select("*");

    if (error) {
      throw new Error(error.message);
    } else {
      return data;
    }
  };

  // Fetch all user categories from UserCategories table
  const fetchUserCategories = async () => {
    const { data, error } = await useSupabaseClient().from("UserCategories").select("*");

    if (error) {
      throw new Error(error.message);
    } else {
      return data;
    }
  };

  return { saveCategory, editCategory, deleteCategory, fetchCategories, fetchUserCategories };
};
