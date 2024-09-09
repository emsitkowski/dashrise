<template>
  <div class="relative w-full flex">
    <!-- Input or textarea -->
    <component
      :is="type === 'textarea' ? 'textarea' : 'input'"
      :value="modelValue"
      class="flex w-full h-auto min-h-[42px] px-3 py-2 bg-transparent border border-gray-300 rounded-md resize-none appearance-none disabled:bg-dark-4% disabled:text-dark-60% disabled:cursor-not-allowed"
      :rows="type === 'textarea' ? 3 : null"
      :type="type"
      :name="name"
      :maxlength="maxlength"
      :placeholder="placeholder"
      :disabled="disabled"
      autocomplete="off"
      :inputmode="inputmode"
      @input="handleInput"
      ref="input"
    >
      {{ type === "textarea" ? modelValue : null }}
    </component>

    <!-- Password reveal -->
    <div v-if="type === 'password'" class="absolute top-1/2 -translate-y-1/2 right-0 scale-75">
      <Button class="opacity-50" variant="unstyled" type="button" @click="handlePasswordReveal">
        <img v-show="isPasswordRevealed" src="~assets/icons/eye-off.svg" alt="closed eye" />
        <img v-show="!isPasswordRevealed" src="~assets/icons/eye.svg" alt="eye" />
      </Button>
    </div>

    <!-- Characters counter -->
    <span
      v-if="maxlength"
      class="absolute right-0 bottom-0 text-xs px-2 py-1 select-none pointer-events-none"
      :class="currentTextLength === Number(maxlength) ? 'text-error' : 'text-dark-32%'"
    >
      {{ currentTextLength }} / {{ maxlength }}
    </span>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
  type: {
    required: true,
    type: String,
  },
  placeholder: {
    type: String,
  },
  name: {
    type: String,
  },
  maxlength: {
    type: String,
  },
  disabled: {
    type: Boolean,
  },
  inputmode: {
    type: String,
  },
  modelValue: {},
});

const isPasswordRevealed = ref<boolean>(false);
const input = ref<HTMLInputElement | HTMLTextAreaElement>();
const currentTextLength = ref<number | undefined>(props.type === "textarea" ? input.value?.value.length : undefined);

onMounted(() => {
  currentTextLength.value = input.value?.value.length;
});

function handleInput(e: Event) {
  const target = e.target as HTMLInputElement;

  // Compute current input characters length
  currentTextLength.value = target.value.length;

  // Emit event with input's value
  emit("update:modelValue", target.value);
}

function handlePasswordReveal() {
  isPasswordRevealed.value = !isPasswordRevealed.value;
  const inputElement = input.value as HTMLInputElement;

  if (inputElement) {
    isPasswordRevealed.value ? (inputElement.type = "text") : (inputElement.type = "password");
  }
}
</script>

<style scoped></style>
