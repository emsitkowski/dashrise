import type { Category } from "~/src/types/global";
import { nanoid } from "nanoid";

export const useCategoryStore = defineStore("transaction-categories", () => {
  const storeError = ref("");
  const categories = ref<Category[]>([]);
  const loading = ref(false);

  // Toggle loading
  function toggleLoading(state: boolean) {
    loading.value = state;
  }

  // Fetch categories from database and save them in store
  async function fetchAllCategories() {
    toggleLoading(true);

    try {
      categories.value = (await useSupabaseDatabase().fetchUserCategories()) as [];
    } catch (error: any) {
      console.error("Failed to fetch user categories from database: ", error);
      storeError.value = error;
    }

    toggleLoading(false);
  }

  // Save new category
  async function saveCategory(category: Category) {
    toggleLoading(true);

    try {
      // Add unique id to the category
      category.id = nanoid();

      // Save new category if doesn't exist yet
      if (categories.value.filter((el) => el.name === category.name).length === 0) {
        await useSupabaseDatabase().saveCategory(category);
        categories.value.push(category);
        console.log("new category added: ", category);
      }
    } catch (error: any) {
      console.error("Failed to save new category: ", error);
      storeError.value = error;
    }

    toggleLoading(false);
  }

  // Edit category
  async function editCategory(category: Category) {
    toggleLoading(true);

    try {
      // Find and edit correct category
      const categoryToEdit = categories.value.filter((el) => el.name === category.name);

      await useSupabaseDatabase().editCategory(category);

      // Save updated values in the store
      categories.value[categories.value.findIndex((el) => el.name === category.name)].limitValue = category.limitValue;
    } catch (error: any) {
      console.error("Failed to edit category: ", error);
      storeError.value = error;
    }

    toggleLoading(false);
  }

  // Delete category
  async function deleteCategory(category: Category) {
    toggleLoading(true);

    try {
      // Find and delete correct category
      await useSupabaseDatabase().deleteCategory(category);

      // Delete category from the store
      categories.value = categories.value.filter((el) => el.name !== category.name);
    } catch (error: any) {
      console.error("Failed to delete category: ", error);
      storeError.value = error;
    }

    toggleLoading(false);
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

  return { storeError, categories, saveCategory, editCategory, deleteCategory, fetchAllCategories, getCategoriesNames };
});
