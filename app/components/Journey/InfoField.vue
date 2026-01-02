<script setup lang="ts">
import { computed } from "vue";

const { t } = useI18n();

const props = defineProps<{
  label: string
  value: string | number | boolean
}>();

const displayValue = computed(() =>
  typeof props.value === "boolean" ? props.value ? t("Yes") : t("No") : String(props.value),
);
</script>

<template>
  <div class="flex items-center gap-2 text-sm">
    <span class="font-semibold">
      {{ label }}:
    </span>

    <span class="badge badge-secondary badge-md">
      {{ displayValue }}
    </span>
  </div>
</template>
