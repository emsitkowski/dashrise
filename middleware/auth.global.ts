export default defineNuxtRouteMiddleware((to, from) => {
  // Check if user is authenticated
  if (!useSupabaseUser().value) {
    // Allow access to login and register page
    if (to.path === "/login" || to.path === "/register") {
      return;
    }

    // If not authenticated and accessing user-only pages, redirect to login
    return navigateTo("/login");
  }
});
