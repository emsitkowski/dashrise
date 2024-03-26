<template>
  <div>
    <!-- Authentication form -->
    <Form @submit="handleSubmit" :loading="isSubmitting">
      <FormField>
        <FormLabel inputID="1" label="Email"></FormLabel>
        <FormInput
          id="1"
          type="text"
          name="Email"
          placeholder="Enter your email address"
          @input="handleInput"
        ></FormInput>
      </FormField>
      <FormField>
        <FormLabel inputID="2" label="Password"></FormLabel>
        <FormInput
          id="2"
          type="password"
          name="Password"
          placeholder="Enter your password"
          @input="handleInput"
        ></FormInput>
      </FormField>

      <Button class="mt-4" ref="submitBtn" :loading="isSubmitting">Log in</Button>
    </Form>

    <!-- Authentication error -->
    <p class="text-sm text-red-500 text-center mt-3">
      {{ authError }}
    </p>
  </div>
</template>

<script setup lang="ts">
const isSubmitting = ref(false);
const { signInWithPassword, authError } = useSupabaseLogin();

const formData = ref({
  email: "",
  password: "",
});

async function handleSubmit() {
  // toggle submitting state
  isSubmitting.value = true;

  // log in user
  const success = await signInWithPassword(formData.value);

  if (success) {
    // redirect to homepage
    navigateTo("/");
  } else {
    // toggle submitting state
    isSubmitting.value = false;
  }
}

function handleInput(target: any) {
  const inputType = target.getAttribute("name");

  if (inputType === "Email") {
    formData.value.email = target.value;
  } else if (inputType === "Password") {
    formData.value.password = target.value;
  }
}
</script>

<style scoped></style>
