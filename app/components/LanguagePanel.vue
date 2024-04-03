<template>
  <cv-header-panel
    id="language-panel"
    :class="{
      '-mt-4': headerSize === 'thin',
      'mt-12': headerSize === 'thick',
    }"
  >
    <cv-switcher>
      <cv-switcher-item v-for="entry in languages" :key="entry.title">
        <cv-switcher-item-link
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
const languages = [
  { flag: "", language: "en", title: "English" },
  { flag: "", language: "es", title: "Español" },
  { flag: "", language: "hi", title: "हिंदी" },
  { flag: "", language: "kr", title: "한국어" },
  { flag: "", language: "sc", title: "汉语" },
  { flag: "", language: "zh", title: "漢語" },
  { flag: "", language: "ru", title: "русский" },
  { flag: "", language: "ar", title: "اللغة العربية" },
  { flag: "", language: "fa", title: " زبان فارسی" },
  { flag: "", language: "ja", title: "日本語" },
  { flag: "", language: "tl", title: "Tagalog" },
  { flag: "", language: "vn", title: "ngôn ngữ tiếng Việt" },
];

const { setLocale, locale } = useI18n();
function changeLocale(locale) {
  document.activeElement.blur();
  if (setLocale) setLocale(locale);
}
</script>
