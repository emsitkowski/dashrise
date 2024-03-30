<template>
  <div>
    <!-- Authentication form -->
    <Form class="mt-4" @submit="handleSubmit" :loading="isSubmitting" :state="formState" :schema="formSchema">
      <!-- Email -->
      <FormField label="Email">
        <FormInput name="Email" type="text" placeholder="Enter your email address" v-model="formState.email" />
      </FormField>

      <!-- Password -->
      <FormField label="Password">
        <FormInput name="Password" type="password" placeholder="Enter your password" v-model="formState.password" />
      </FormField>

      <!-- Submit button -->
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
import { authSchema } from "~/src/schemas/form";
const isSubmitting = ref(false);
const { signInWithPassword, createNewAccount, authError } = useSupabaseAuth();

const props = defineProps({
  action: {
    type: String,
  },
});

const formState = ref<any>({});
const formSchema = ref(authSchema);

async function handleSubmit() {
  // Turn on loading state
  toggleFormLoading();

  // Clear error message
  authError.value = "";

  // Log in user
  if (props.action === "login") {
    const success = await signInWithPassword(formState.value as userCredentials);

    // Redirect to homepage
    if (success) {
      navigateTo("/");
    } else {
      // Toggle submitting state
      isSubmitting.value = false;
    }
  } else {
    // Create new account
    const success = await createNewAccount(formState.value as userCredentials);

    // Redirect to homepage
    if (success) {
      navigateTo("/");
    } else {
      // Turn on loading state
      toggleFormLoading();
    }
  }
}

function toggleFormLoading() {
  isSubmitting.value = !isSubmitting.value;
}
</script>

<style scoped></style>
