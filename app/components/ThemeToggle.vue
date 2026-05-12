<script setup lang="ts">
import { Sun, Moon } from "lucide-vue-next";
import { useDark } from "@vueuse/core";

const isDark = useDark({
  selector: "html",
  attribute: "data-theme",
  valueDark: "ffv-dark",
  valueLight: "ffv-light",
  storageKey: null,
});
</script>

<template>
  <label class="swap swap-rotate btn btn-ghost btn-square btn-xs md:btn-md self-start md:self-end lg:self-start z-10">
    <input v-model="isDark" type="checkbox" class="theme-controller">
    <Sun class="swap-off size-6" />
    <Moon class="swap-on size-6" />
  </label>
</template>
