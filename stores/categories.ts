import type { Category } from "~/src/types/global";

export const useCategoryStore = defineStore("transaction-categories", () => {
  const categories = ref<Category[]>([]);
  const loading = ref(true);

  // Sort categories by name
  function sortCategoriesByName() {
    categories.value.sort((a, b) => a.name.localeCompare(b.name));
  }

  // Fetch categories from database and save them in store
  async function fetchAllCategories() {
    categories.value = (await useSupabaseDatabase().fetchItems("categories")) as [];
    sortCategoriesByName();

    loading.value = false;
  }

  // Save new category
  async function saveCategory(category: Category) {
    // Save new category to database and store if doesn't exist yet
    if (categories.value.filter((el) => el.name === category.name).length === 0) {
      await useSupabaseDatabase().saveItem("category", category);
      categories.value.push(category);
      sortCategoriesByName();
    } else {
      console.warn("Category already exists");
    }
  }

  // Edit category and update the store
  async function editCategory(category: Category) {
    // Edit selected category
    await useSupabaseDatabase().editItem("category", category);

    // Update category in the store
    categories.value[categories.value.findIndex((el) => el.name === category.name)] = category;
  }

  // Delete category and update the store
  async function deleteCategory(category: Category) {
    // Delete selected category
    await useSupabaseDatabase().deleteItem("category", category);

    // Delete category from the store
    categories.value = categories.value.filter((el) => el.name !== category.name);
  }

  // Get all categories names sorted alfabetically
  const getCategoriesNames = computed(() => {
    return () => categories.value.map((category: Category) => category.name);
  });

  // Get total categories values planned for current month
  const getTotalValuesForCurrentMonth = computed(() => {
    return () => {
      return categories.value.reduce(
        (total: number, category: Category) => (category.limitValue > 0 ? total + Number(category.limitValue) : total),
        0
      );
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
