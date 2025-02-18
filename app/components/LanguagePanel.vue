<template>
  <cv-header-panel
    id="language-panel"
    :class="{
      '-mt-4': headerSize === 'thin',
      'mt-12': headerSize === 'thick',
    }"
  >
    <cv-switcher>
      <cv-switcher-item
        v-for="entry in availableLocales"
        :key="entry.title"
      >
        <cv-switcher-item-link
          :id="`language-${entry.language}`"
          :selected="entry.language === locale"
          :class="{ '!bg-ff-purple-02': entry.language === locale }"
          @click="changeLocale(entry.language)"
        >
          {{ entry.title }}
        </cv-switcher-item-link>
      </cv-switcher-item>
    </cv-switcher>
  </cv-header-panel>
</template>
<script setup>
defineProps({
  headerSize: { type: String, default: "thin" },
});

const { setLocale, locale, locales } = useI18n();
function changeLocale(locale) {
  document.activeElement.blur();
  if (setLocale) setLocale(locale);
}
const availableLocales = computed(() => {
  return locales.value?.map((i) => {
    const names = new Intl.DisplayNames(i.code, { type: "language" });
    const locals = new Intl.DisplayNames(locale.value, {
      type: "language",
    });
    let displayName = names.of(i.code);
    if (locale.value !== i.code) displayName += ":" + locals.of(i.code);
    return { language: i.code, title: displayName };
  });
});
</script>
