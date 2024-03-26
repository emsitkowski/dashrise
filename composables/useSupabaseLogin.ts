export const useSupabaseLogin = () => {
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

  return { signInWithPassword, authError };
};
