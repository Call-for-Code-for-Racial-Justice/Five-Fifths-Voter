<script setup lang="ts">
defineProps({
  number: { type: String, required: true },
  label: { type: String, required: true },
  prefix: { type: String, default: ":" },
});
</script>

<template>
  <div
    class="bg-[url(@/assets/images/skewed-oval-empty.svg)] bg-contain
          bg-no-repeat text-white"
  >
    <div
      class="font-[Caprasimo] text-2xl"
    >
      {{ prefix }} {{ number }}
    </div>
    <div class="text-right text-xs">
      {{ label }}
    </div>
  </div>
</template>

<style scoped>

</style>
