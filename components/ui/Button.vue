<template>
  <button
    class="relative inline-flex justify-center items-center shrink-0 gap-1 rounded-md sm:rounded-lg leading-none overflow-hidden duration-300 [&>*]:pointer-events-none"
    :class="buttonVariantClass[variant as ButtonVariant], size === 'sm' ? 'px-2 py-2 sm:px-3 sm:py-3 text-sm' : 'px-4 py-4'"
    @click="$emit('button-click')"
  >
    <div v-if="icon" :class="iconLeading === true ? '-ml-1' : ''">
      <svg
        v-if="iconType === 'plus'"
        class="w-5 h-full"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
      <svg
        v-if="iconType === 'edit'"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-edit-2"
      >
        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
      </svg>
      <svg
        v-if="iconType === 'actions'"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-more-vertical"
      >
        <circle cx="12" cy="12" r="1"></circle>
        <circle cx="12" cy="5" r="1"></circle>
        <circle cx="12" cy="19" r="1"></circle>
      </svg>
      <svg
        v-if="iconType === 'x'"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-x"
      >
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
      <svg
        v-if="iconType === 'trash'"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-trash"
      >
        <polyline points="3 6 5 6 21 6"></polyline>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
      </svg>
    </div>

    <SpinnerLoader
      :loading="loading"
      mode="fullscreen"
      bg-color-class="bg-primary-500"
      stroke-color-class="stroke-white"
    />

    {{ label }}
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
type ButtonVariant = "primary" | "secondary" | "ghost";

const props = defineProps({
  loading: {
    type: Boolean,
  },
  label: {
    type: String,
  },
  variant: {
    type: String,
    default: "primary",
  },
  size: {
    type: String,
  },
  icon: {
    type: Boolean,
  },
  iconType: {
    type: String,
  },
  iconLeading: {
    type: Boolean,
  },
});

defineEmits(["button-click"]);

const buttonVariantClass = {
  primary: "bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-600",
  "primary-light": "bg-primary-4% text-primary-600 hover:bg-primary-8% active:bg-primary-8%",
  secondary: "bg-secondary-500 text-white hover:bg-secondary-600 active:bg-secondary-600",
  "secondary-ghost":
    "opacity-30 hover:bg-secondary-4% hover:text-secondary-500 active:text-secondary-500  hover:bg-secondary-600 active:bg-secondary-600 hover:opacity-100 active:opacity-100",
  ghost:
    "opacity-30 text-dark-500 hover:text-primary-500 active:text-primary-500 hover:bg-primary-2% active:bg-primary-2% hover:opacity-100 active:opacity-100",
  unstyled: "",
};
</script>

<style scoped></style>
