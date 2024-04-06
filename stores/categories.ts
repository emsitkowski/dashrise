import type { Category } from "~/src/types/global";
import { nanoid } from "nanoid";

export const useCategoryStore = defineStore("transaction-categories", () => {
  const categories = ref<Category[]>([]);

  // Save new category
  async function saveCategory(category: Category) {
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
  }

  // Get all categories
  const getAllCategories = computed(() => {
    return categories.value;
  });

  // Fetch all user categories from the database and save them to store
  async function fetchUserCategoriesFromDatabase() {
    // retrieve data from database
    const userCategories = (await useSupabaseDatabase().getUserCategories()) as [];

    categories.value = userCategories;

    console.log(categories.value);
    return userCategories;
  }

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
