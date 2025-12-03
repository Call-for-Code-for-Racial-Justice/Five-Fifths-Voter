<script setup lang="ts">
import {
  FileText,
  Inbox,
  Mail,
  FileQuestion,
  BadgeCheck,
  PackageSearch,
  MapPin,
  Eraser,
  Vote,
} from "lucide-vue-next";

const deliveredBallot = useLocalStorage(LOCAL_STORAGE_KEYS.VOTER_DELIVERED_BALLOT, false);
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
const requestBallotLink = computed(() => content.value?.mail_in?.request_link ?? "https://www.vote.org/absentee-ballot/");
const trackBallotLink = computed(() => content.value?.mail_in?.track_link ?? "https://www.vote.org/ballot-tracker-tools/");
const idInfoLink = computed(() => content.value?.mail_in?.id_link ?? "https://www.ncsl.org/elections-and-campaigns/voter-id");
const dropoffLink = computed(() => content.value?.mail_in?.dropoff_link);
const infoLink = computed(() => content.value?.mail_in?.more_link ?? "https://www.usa.gov/voter-registration");

function yesNoMaybe(val: string | boolean | undefined, yes: string, no: string, maybe: string | undefined) {
  if (val === true) return yes;
  if (val === false) return no;
  return maybe;
}

const infoLinks = computed(() => [
  {
    title: t("absenteeTrack"),
    link: trackBallotLink.value,
    icon: PackageSearch,
  },
  {
    title: "Ballot dropoff locations",
    link: dropoffLink.value,
    icon: MapPin,
  },
  {
    title: "Voter id requirements",
    link: idInfoLink.value,
    icon: BadgeCheck,
  },
  {
    title: t("absenteeRequest"),
    link: requestBallotLink.value,
    icon: Mail,
  },
  {
    title: "Absentee ballot information",
    link: infoLink.value,
    icon: FileText,
  },
].filter(info => info.link));
const faqs = computed(() => [
  {
    question: t("absenteeDropFaq"),
    answer: yesNoMaybe(content.value?.mail_in?.dropoff,
      "Yes, your state allows allows you to deliver your ballot in person.",
      t("no"), "Your state might allow you to drop off your ballot in person. Check the link for more information."),
    link: dropoffLink.value ?? infoLink.value,
    icon: Inbox,
  },
  {
    question: "How can I track my ballot?",
    answer: "You can track you ballot with your state's tracker.",
    link: trackBallotLink.value,
    icon: PackageSearch,
  },

  {
    question: "Was my ballot accepted?",
    answer: "Track your ballot to check the acceptance status?",
    link: trackBallotLink.value,
    icon: FileQuestion,
  },
  {
    question: "What happens if I made a mistake on my ballot?",
    answer: "Contact your local elections office. Your election office may contact you to help you \"cure\" your ballot. Look for an email, regular mail, or phone call from the elections office and respond as soon as possible.",
    link: infoLink.value,
    icon: Eraser,
  },
  {
    question: "Can I still vote in person after submitting my absentee ballot?",
    answer: "Contact your local elections office. Rules are different in every state but you can usually vote a provisional ballot. ",
    link: infoLink.value,
    icon: Vote,
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
            <input id="delivered-ballot" v-model="deliveredBallot" type="checkbox" class="size-4 rounded-sm border-gray-300 text-blue-600 focus:ring-blue-500" >
            <label for="delivered-ballot" class="ml-2 block text-sm text-gray-700">I dropped off my ballot or voted early</label>
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
                <a v-if="faq.link" :href="faq.link" target="_blank" class="text-blue-600 hover:underline">More information</a>
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
