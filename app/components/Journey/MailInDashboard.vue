<script setup lang="ts">
import {
  FileText,
  AlertCircle,
  Mail,
  FileQuestion,
  Stamp,
  BadgeCheck,
  MapPin, PackageSearch,
} from "lucide-vue-next";

const requestedBallot = useLocalStorage(LOCAL_STORAGE_KEYS.VOTER_REQUESTED_BALLOT, false);
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
const requestBallotLink = computed(() => content.value?.mail_in?.request_link || "https://www.vote.org/absentee-ballot/");
const absenteeInfoLink = computed(() => content.value?.mail_in?.more_link || "https://www.vote.org/absentee-ballot/");
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
    title: t("absenteeRequest"),
    link: requestBallotLink.value,
    icon: Mail,
  },
  {
    title: "Voter id requirements",
    link: idInfoLink.value,
    icon: BadgeCheck,
  },
  {
    title: "Ballot dropoff locations",
    link: dropoffLink.value,
    icon: MapPin,
  },
  {
    title: t("absenteeTrack"),
    link: dropoffLink.value,
    icon: PackageSearch,
  },
  {
    title: "Absentee ballot information",
    link: infoLink.value,
    icon: FileText,
  },
].filter(info => info.link));
const faqs = computed(() => [
  {
    question: t("absenteeIdFaq"),
    answer: yesNoMaybe(content.value?.mail_in?.id_needed,
      t("yes"), t("no"),
      "Thirty-six states have laws requesting or requiring voters to show some form of identification at the polls."),
    link: idInfoLink.value,
    icon: AlertCircle,
  },
  {
    question: t("absenteeReasonFaq"),
    answer: yesNoMaybe(content.value?.mail_in?.any_reason,
      "Your state offers \"no-excuse\" absentee voting, which means that any voter can request and cast an absentee/mail ballot, no excuse or reason necessary.",
      "Your state does not offer \"no-excuse\" absentee voting.",
      "Twenty-eight states offer \"no-excuse\" absentee voting, which means that any voter can request and cast an absentee/mail ballot, no excuse or reason necessary."),
    link: absenteeInfoLink.value ?? infoLink.value,
    icon: FileQuestion,
  },
  {
    question: t("absenteeWitnessFaq"),
    answer: yesNoMaybe(content.value?.mail_in?.without_notary,
      "A notary/witness is not required in your state.",
      "A notary/witness is required in your state.",
      "In some states, your own signature is not enough to successfully cast a ballot. You must also obtain either a notary signature to either apply for an absentee ballot or submit a completed ballot."),
    link: infoLink.value,
    icon: Stamp,
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
            <input id="requestedBallot" v-model="requestedBallot" type="checkbox" class="size-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" >
            <label for="requestedBallot" class="ml-2 block text-sm text-gray-700">{{ t("absenteeRequested") }}</label>
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
