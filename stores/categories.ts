import type { Category } from "~/src/types/global";
import { nanoid } from "nanoid";

export const useCategoryStore = defineStore("transaction-categories", () => {
  const error = ref("");
  const categories = ref<Category[]>([]);
  const loading = ref(false);

  // Clear store
  function clear() {
    categories.value = [];
  }

  // Toggle loading
  function toggleLoading(state: boolean) {
    loading.value = state;
  }

  // Save new category
  async function saveCategory(category: Category) {
    toggleLoading(true);

    try {
      const newCategory: Category = {
        id: nanoid(),
        name: category.name,
        limitValue:
          typeof category.limitValue === "string"
            ? parseFloat(category.limitValue.replace(",", "."))
            : category.limitValue,
      };

      // Save new category in database
      await useSupabaseDatabase().saveCategory(newCategory);

      // Save new category in store if doesn't exist yet
      if (categories.value.filter((el) => el.name === category.name).length === 0) {
        categories.value.push(newCategory);
      }
    } catch (error: any) {
      console.error("Failed to save new category: ", error);
      error.value = error;
    }

    toggleLoading(false);
  }

  // Fetch all user categories from the database and save them to store
  async function fetchUserCategoriesFromDatabase() {
    toggleLoading(true);

    // Retrieve data from database and save it in store
    try {
      const userCategories = (await useSupabaseDatabase().getUserCategories()) as [];
      categories.value = userCategories;
    } catch (error: any) {
      console.error("Failed to fetch user categories from database: ", error);
      error.value = error;
    }

    toggleLoading(false);
  }

  // Get all categories
  const getAllCategories = computed(() => {
    return categories.value;
  });

  // Get all categories names sorted alfabetically
  const getUserCategoriesNames = computed(() => {
    return () => {
      const names = [] as any;

      categories.value.forEach((el: Category) => {
        names.push(el.name);
      });

      return names.sort((a: string, b: string) => a.localeCompare(b));
    };
  });

  return { categories, saveCategory, getAllCategories, fetchUserCategoriesFromDatabase, getUserCategoriesNames };
});
