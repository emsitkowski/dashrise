<template>
  <div>
    <!-- Authentication form -->
    <Form
      @submit="handleSubmit"
      :loading="isSubmitting"
      :fields="[
        { label: 'Email', type: 'text', name: 'Email', placeholder: 'Enter your email address' },
        {
          label: 'Password',
          type: 'password',
          name: 'Password',
          placeholder: 'Enter your password',
        },
      ]"
    >
      <Button type="submit" class="mt-4" ref="submitBtn" :loading="isSubmitting">{{
        action === "login" ? "Log in" : "Create account"
      }}</Button>
    </Form>

    <!-- Authentication error -->
    <p class="text-sm text-red-500 text-center mt-3">
      {{ authError }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { userCredentials } from "~/src/types/global";
const isSubmitting = ref(false);
const { signInWithPassword, createNewAccount, authError } = useSupabaseAuth();

const props = defineProps({
  action: {
    type: String,
  },
});

async function handleSubmit(formData: userCredentials) {
  // toggle submitting state
  isSubmitting.value = true;

  // clear error message
  authError.value = "";

  // log in user
  if (props.action === "login") {
    const success = await signInWithPassword(formData);

    // redirect to homepage
    if (success) {
      navigateTo("/");
    } else {
      // toggle submitting state
      isSubmitting.value = false;
    }
  } else {
    // create new account
    const success = await createNewAccount(formData);

    // redirect to homepage
    if (success) {
      navigateTo("/");
    } else {
      // toggle submitting state
      isSubmitting.value = false;
    }
  }
}
</script>

<style scoped></style>
