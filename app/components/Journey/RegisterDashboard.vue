<script setup lang="ts">
import {
  FileText,
  AlertCircle,
  Scale,
  CalendarCheck,
  Mail,
  Search,
  Edit,
  RefreshCcw,
} from "lucide-vue-next";

const isRegistered = useLocalStorage(LOCAL_STORAGE_KEYS.VOTER_REGISTERED, false);
const usaState = useLocalStorage(LOCAL_STORAGE_KEYS.USA_STATE, "");
const { t } = useI18n();

// uncomment this for local dev
// clearNuxtData(`procedures-${usaState.value}`);
const { data: content, status } = await useAsyncData<ContentProcedure>(
  `procedures-${usaState.value}`,
  () => {
    // console.log(`fetching procedures for ${usaState.value}`);
    return queryCollection("procedures").where("region_code", "=", usaState.value).first();
  },
  {
    watch: [usaState],
  },
);
const checkRegLink = computed(() => {
  return (
    content.value?.register?.check_link || "https://www.vote.org/am-i-registered-to-vote/"
  );
});
const registerOnlineLink = computed(() => content.value?.register?.online_link ?? "https://www.vote.org/register-to-vote/");
const registerByMailLink = computed(() => content.value?.register?.mail_link ?? "https://www.vote.org/absentee-ballot/");
const changePartyLink = computed(() => content.value?.register?.change_party_link);
const infoLink = computed(() => content.value?.register?.more_link ?? "https://www.usa.gov/voter-registration");
const felonLink = computed(() => content.value?.register?.felon_link ?? "https://www.nationalvotinginprison.org/#state-laws");

function yesNoMaybe(val: string | boolean | undefined, yes: string, no: string, maybe: string | undefined) {
  if (val === true) return yes;
  if (val === false) return no;
  return maybe;
}

const infoLinks = computed(() => [
  {
    title: "Check your registration status",
    link: checkRegLink.value,
    icon: Search,
  },
  {
    title: "Register online",
    link: registerOnlineLink.value,
    icon: Edit,
  },
  {
    title: "Register by mail",
    link: registerByMailLink.value,
    icon: Mail,
  },
  {
    title: "Change your potilical party affiliation",
    link: changePartyLink.value,
    icon: RefreshCcw,
  },
  {
    title: "Voter registration info",
    link: infoLink,
    icon: FileText,
  },
].filter(info => info.link));
const faqs = computed(() => [
  {
    question: "Can I register to vote if I am under 18?",
    answer: yesNoMaybe(content.value?.register.under18,
      t(content.value?.register?.under18key || "yes"),
      "No, in your state you have to be at least 18 to register.",
      "You can pre-register before you turn 18 in most states, the District of Columbia, and U.S. territories, but you must be 18 to vote."),
    link: yesNoMaybe(content.value?.register?.under18, infoLink.value, infoLink.value, "https://www.ncsl.org/elections-and-campaigns/preregistration-for-young-voters"),
    icon: AlertCircle,
  },
  {
    question: "Can I register to vote if I am \"Off Paper\"?",
    answer: yesNoMaybe(!!content.value?.register?.formerlyIncarcerated,
      "Yes, your state allows formerly incarcerated people to register. Check the link for more information and any limitations.",
      "It depends. Check the link for more information and any limitations."),
    link: felonLink.value,
    icon: Scale,
  },
  {
    question: t("registerElectionDay"),
    answer: yesNoMaybe(content.value?.register.election_day, t("yes"), t("no"),
      "Twenty-three states and Washington, D.C., have implemented same-day registration, which allows any qualified resident of the state to register to vote and cast a ballot at the same time."),
    link: registerOnlineLink.value ?? infoLink.value,
    icon: CalendarCheck,
  },
  {
    question: t("registerOnlineQ"),
    answer: yesNoMaybe(content.value?.register.online, t("yes"), t("no"), "Currently, 43 states offer online voter registration."),
    link: registerOnlineLink.value ?? infoLink.value,
    icon: Edit,
  },
]);

</script>

<template>
  <div class="p-4 sm:p-6 md:p-8">

    <div class="mx-auto grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-3">
      <!-- Sidebar: Info Links -->
      <aside class="rounded-lg bg-white p-4 shadow-md lg:col-span-1">
        <Transition>
          <cv-skeleton-text v-if="status === 'pending'"/>
          <h2 v-else-if="content" class="mb-4 text-xl font-semibold text-gray-800">Information Links</h2>
          <h2 v-else class="mb-4 text-lg font-semibold text-ff-red-01">We don’t have a lot of details for your state or territory just yet, but here’s some general info to help you out.</h2>
        </Transition>
        <Transition>
          <cv-skeleton-text v-if="status === 'pending'"/>
          <ul v-else class="space-y-3">
            <li v-for="info in infoLinks" :key="info.title" class="flex items-center gap-2">
              <component :is="info.icon" class="size-5 text-blue-500" />
              <a :href="info.link" target="_blank" class="text-blue-600 hover:underline">{{ info.title }}</a>
            </li>
          </ul>
        </Transition>
      </aside>

      <!-- Main Content: FAQs -->
      <section class="rounded-lg bg-white p-4 shadow-md lg:col-span-2">
        <div class="mb-6 space-y-4">
          <JourneySelectState/>
          <div class="flex items-center">
            <input id="registered" v-model="isRegistered" type="checkbox" class="size-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" >
            <label for="registered" class="ml-2 block text-sm text-gray-700">I am already registered to vote</label>
          </div>
        </div>

        <h1 class="mb-6 text-2xl font-bold text-gray-900">Frequently Asked Questions</h1>

        <Transition>
          <cv-skeleton-text v-if="status === 'pending'"/>
          <div v-else class="space-y-4">
            <details
                v-for="faq in faqs"
                :key="faq.question"
                class="group rounded-lg border border-solid border-carbon-gray-100 p-4"
            >
              <summary class="flex cursor-pointer items-center gap-2 font-semibold text-gray-800 group-open:text-blue-600">
                <component :is="faq.icon" class="size-5 text-blue-500" />
                {{ faq.question }}
              </summary>
              <div>
                <p class="mt-2 text-gray-600">
                  {{ faq.answer }}
                </p>
                <a v-if="faq.link" :href="faq.link" target="_blank"  class="text-blue-600 hover:underline">More information</a>
              </div>
            </details>
          </div>
        </Transition>
      </section>
    </div>
  </div>
</template>
<style scoped lang="css">
::v-deep(.bx--select .bx--label) {
 @apply text-carbon-gray-100
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
