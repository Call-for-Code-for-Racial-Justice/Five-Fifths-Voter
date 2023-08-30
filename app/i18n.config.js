const languages = import.meta.glob("assets/locales/*.json");
const messages = {};
for (const path in languages) {
  languages[path]().then(mod => {
    console.log("found locale", path, path.split(/[\/.]/)[3]);
    const lang = path.split(/[\/.]/)[3];
    messages[lang] = mod;
  });
}
export default defineI18nConfig(() => ({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
  messages: messages
}));
