export const useSupabaseAuth = () => {
  const authError = ref("");

  const signInWithPassword = async (userDetails: any) => {
    // clear previous error message
    authError.value = "";

    const { error } = await useSupabaseClient().auth.signInWithPassword({
      email: userDetails.email,
      password: userDetails.password,
    });

    if (error) {
      // save error message to a ref
      authError.value = error.message;
      return false;
    } else {
      // sign-in successful
      return true;
    }
  };

  const createNewAccount = async (userDetails: any) => {
    // clear previous error message
    authError.value = "";

    const { error } = await useSupabaseClient().auth.signUp({
      email: userDetails.email,
      password: userDetails.password,
    });

    if (error) {
      // save error message to a ref
      authError.value = error.message;
      return false;
    } else {
      // sign-in successful
      return true;
    }
  };

  const logOut = async (userDetails: any) => {
    // clear previous error message
    authError.value = "";

    const { error } = await useSupabaseClient().auth.signOut();

    if (error) {
      // save error message to a ref
      authError.value = error.message;
      return false;
    } else {
      // navigate to login page and restart the app
      reloadNuxtApp({ path: "/login" });
      return true;
    }
  };

  // User sign out function
  async function signOut() {}

  return { signInWithPassword, createNewAccount, logOut, authError };
};
