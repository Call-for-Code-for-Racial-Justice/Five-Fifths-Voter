<script setup>
defineProps({
  number: { type: [Number, String], required: true },
  label: { type: String, required: true },
  prefix: { type: String, default: ":" },
});
</script>

<template>
  <div
    class="bg-oval bg-contain bg-no-repeat text-white"
  >
    <div
      class="font-[Caprasimo] text-2xl sm:text-4xl"
    >
      {{ prefix }} {{ number }}
    </div>
    <div class="text-right text-xs sm:text-base">
      {{ label }}
    </div>
  </div>
</template>

<style scoped>
.bg-oval {
  background-image: url("@/assets/images/skewed-oval-empty.svg");
}
</style>
