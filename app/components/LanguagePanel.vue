<script setup>
import { Languages } from "lucide-vue-next";

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
<template>
  <div class="dropdown">
    <div tabindex="0" role="button" class="btn btn-ghost btn-square">
      <Languages/>
    </div>
    <ul tabindex="-1" class="dropdown-content menu text-base-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
      <li
          v-for="entry in availableLocales" :key="entry.title" :class="{ 'menu-active': entry.language === locale }"
          @click="changeLocale(entry.language)">
        <a>{{ entry.title }}</a>
      </li>
    </ul>
  </div>
</template>
