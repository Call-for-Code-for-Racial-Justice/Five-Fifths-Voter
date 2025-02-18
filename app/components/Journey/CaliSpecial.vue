<script setup>
const { t } = useI18n();
const ymcaInfo = computed(() => {
  return t("registerYouth_2", {
    here: "https://registertovote.ca.gov/",
    ymca: "https://www.ymcayag.org/vote/",
  });
});
</script>
<template>
  <div>
    {{ $t("registerYouth_1") }}
    <mark-down :content="ymcaInfo" />
  </div>
</template>
