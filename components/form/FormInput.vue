<template>
  <div class="relative w-full flex">
    <input
      :value="modelValue"
      @input="handleInput"
      class="w-full px-3 py-2 bg-none border border-gray-300 rounded-md"
      :class="$props.disabled ? 'bg-dark-2% text-dark-60% cursor-not-allowed' : ''"
      :type="props.type"
      :name="props.name"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      autocomplete="off"
      ref="input"
    />

    <!-- Password reveal -->
    <div v-if="type === 'password'" class="absolute top-1/2 -translate-y-1/2 right-0 scale-75">
      <Button class="opacity-50" variant="unstyled" type="button" @click="handlePasswordReveal">
        <img v-show="isPasswordRevealed" src="~assets/icons/eye.svg" alt="eye" />
        <img v-show="!isPasswordRevealed" src="~assets/icons/eye-off.svg" alt="closed eye" />
      </Button>
    </div>
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
  disabled: {
    type: Boolean,
  },
  modelValue: {},
});

const isPasswordRevealed = ref<boolean>(false);
const input = ref<HTMLInputElement>();

function handleInput(e: Event) {
  const target = e.target as HTMLInputElement;
  emit("update:modelValue", target.value);
}

function handlePasswordReveal() {
  isPasswordRevealed.value = !isPasswordRevealed.value;

  if (input.value) {
    isPasswordRevealed.value ? (input.value.type = "text") : (input.value.type = "password");
  }
}
</script>

<style scoped></style>
