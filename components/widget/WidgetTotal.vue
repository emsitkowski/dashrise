<template>
  <Card class="relative">
    <template #card-body>
      <div class="flex flex-col gap-2 sm:gap-3">
        <!-- Header -->
        <div class="flex items-center gap-2 sm:gap-3">
          <img v-if="icon === 'credit-card'" class="w-4 sm:w-5" src="~assets/icons/credit-card.svg" alt="" />
          <img v-if="icon === 'arrow-in'" class="w-4 sm:w-5" src="~assets/icons/arrow-in.svg" alt="" />
          <img v-if="icon === 'arrow-out'" class="w-4 sm:w-5" src="~assets/icons/arrow-out.svg" alt="" />
          <img v-if="icon === 'box'" class="w-4 sm:w-5" src="~assets/icons/box.svg" alt="" />
          <span class="uppercase text-sm sm:text-base font-medium">{{ header }}</span>
        </div>

        <!-- Value -->
        <div class="text-2xl sm:text-3xl font-medium leading-none whitespace-nowrap shrink-0 overflow-hidden">
          <span v-if="value">
            <span class="opacity-0" ref="integer">0</span>
          </span>
          <span v-else>–</span>
        </div>
      </div>

      <!-- Loading spinner -->
      <SpinnerLoader
        v-show="useTransactionStore().loading"
        mode="fullscreen"
        position="vertical"
        :label="`Calculating ${header}...`"
        bg-color-class="bg-white"
        stroke-color-class="stroke-dark-500"
        :loading="loading"
      />
    </template>
  </Card>
</template>

<script setup lang="ts">
import anime from "animejs/lib/anime.es.js";
const props = defineProps(["header", "icon", "value", "loading"]);

const integer = ref();

// Split value by decimal point
const value = computed(() => {
  return props.value;
});

watchEffect(() => {
  animateValues();
});

// Animate values whenever they update
function animateValues() {
  if (integer.value) {
    const startValue = revertCurrencyToNumber(integer.value.textContent);
    const endValue = value.value;
    const element = integer.value;

    // Fade in values
    anime({
      targets: element,
      opacity: 1,
      duration: 600,
      easing: "linear",
    });

    // Animate digits
    anime({
      targets: { value: startValue },
      value: endValue,
      duration: 600,
      easing: "linear",
      update: function (animation: any) {
        element.innerHTML = `${
          convertToCurrency(animation.animatables[0].target.value).split(".")[0]
        }<span class="text-dark-32% text-xs sm:text-base">.${
          convertToCurrency(animation.animatables[0].target.value).split(".")[1]
        }</span>
        `;
      },
    });
  }
}
</script>

<style scoped></style>
