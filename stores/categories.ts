import type { Category } from "~/src/types/global";
import { nanoid } from "nanoid";

export const useCategoryStore = defineStore("transaction-categories", () => {
  const categories = ref<Category[]>([]);
  const loading = ref(true);

  // Toggle loading
  function toggleLoading(state: boolean) {
    loading.value = state;
  }

  // Sort categories by name
  function sortCategoriesByName() {
    categories.value.sort((a, b) => a.name.localeCompare(b.name));
  }

  // Fetch categories from database and save them in store
  async function fetchAllCategories() {
    try {
      categories.value = (await useSupabaseCategories().fetchUserCategories()) as [];
      sortCategoriesByName();
    } catch (error: any) {
      console.error("Failed to fetch user categories from database: ", error);
    } finally {
      toggleLoading(false);
    }
  }

  // Save new category
  async function saveCategory(category: Category) {
    try {
      // Add unique id for the category
      category.id = nanoid();

      // Save new category to database and store if doesn't exist yet
      if (categories.value.filter((el) => el.name === category.name).length === 0) {
        await useSupabaseCategories().saveCategory(category);
        categories.value.push(category);
        sortCategoriesByName();
      } else {
        console.warn("Category already exists");
      }
    } catch (error: any) {
      console.error("Failed to save new category: ", error);
    } finally {
      toggleLoading(false);
    }
  }

  // Edit category and update the store
  async function editCategory(category: Category) {
    try {
      // Edit selected category
      await useSupabaseCategories().editCategory(category);

      // Update category in the store
      categories.value[categories.value.findIndex((el) => el.name === category.name)] = category;
    } catch (error: any) {
      console.error("Failed to edit category: ", error);
    } finally {
      toggleLoading(false);
    }
  }

  // Delete category and update the store
  async function deleteCategory(category: Category) {
    try {
      // Delete selected category
      await useSupabaseCategories().deleteCategory(category);

      // Delete category from the store
      categories.value = categories.value.filter((el) => el.name !== category.name);
    } catch (error: any) {
      console.error("Failed to delete category: ", error);
    } finally {
      toggleLoading(false);
    }
  }

  // Get all categories names sorted alfabetically
  const getCategoriesNames = computed(() => {
    return () => {
      const names = [] as any;

      categories.value.forEach((el: Category) => {
        names.push(el.name);
      });

      return names.sort((a: string, b: string) => a.localeCompare(b));
    };
  });

  // Get total categories values planned for current month
  const getTotalValuesForCurrentMonth = computed(() => {
    return () => {
      let total: number = 0;

      categories.value.forEach((el: Category) => {
        if (el.limitValue > 0) {
          total += Number(el.limitValue);
        }
      });

      return total;
    };
  });

  return {
    loading,
    categories,
    saveCategory,
    editCategory,
    deleteCategory,
    fetchAllCategories,
    getCategoriesNames,
    getTotalValuesForCurrentMonth,
  };
});
