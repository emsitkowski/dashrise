export const useSupabaseAuth = () => {
  const authError = ref("");

  const signInWithPassword = async (userDetails: any) => {
    const { error } = await useSupabaseClient().auth.signInWithPassword({
      email: userDetails.email,
      password: userDetails.password,
    });

    return handleResponse(error);
  };

  const createNewAccount = async (userDetails: any) => {
    const { error } = await useSupabaseClient().auth.signUp({
      email: userDetails.email,
      password: userDetails.password,
    });

    return handleResponse(error);
  };

  const logOut = async (userDetails: any) => {
    const { error } = await useSupabaseClient().auth.signOut();

    reloadNuxtApp({ path: "/login" });

    return handleResponse(error);
  };

  function handleResponse(error: any) {
    // save error message to a ref
    if (error) {
      authError.value = error.message;
      return false;
    } else {
      // auth action successful
      return true;
    }
  }

  return { signInWithPassword, createNewAccount, logOut, authError };
};
