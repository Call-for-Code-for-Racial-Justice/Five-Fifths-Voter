<template>
  <div class="container--countdown">
    <h3>{{ headline }}</h3>
  </div>
</template>

<script setup>
import VueI18n from "@nuxtjs/i18n";
const { t } = VueI18n.useI18n();

const headline = ref("Daysss until the/2024/Presidential Election");
onMounted(() => {
  headline.value = $i18n.t("countdownHeader");
});
</script>

<style scoped lang="scss">
@import "@/assets/scss/theme";
.container--countdown {
  background-color: $ff-red-01;
  height: 320px;
  margin-top: -16px;
}
</style>
