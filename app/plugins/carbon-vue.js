import CarbonVue from '@carbon/vue'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(CarbonVue)
})