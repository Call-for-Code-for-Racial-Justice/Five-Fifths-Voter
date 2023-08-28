const languages = import.meta.glob('assets/locales/*/translations.json')
const messages = {}
for (const path in languages) {
  languages[path]().then((mod) => {
    const lang = path.split('/')[3]
    messages[lang] = mod
  })
}
export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: messages,
}))
