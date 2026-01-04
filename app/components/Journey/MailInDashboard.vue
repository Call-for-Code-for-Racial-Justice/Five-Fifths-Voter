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
import JourneyFAQ from "~/components/Journey/JourneyFAQ.vue";
import type { FAQ } from "~/types/faq";

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
const trackBallotLink = computed(() => content.value?.mail_in?.track_link || "https://www.vote.org/ballot-tracker-tools/");
const absenteeInfoLink = computed(() => content.value?.mail_in?.more_link || "https://www.vote.org/absentee-ballot/");
const idInfoLink = computed(() => content.value?.mail_in?.id_link ?? "https://www.ncsl.org/elections-and-campaigns/voter-id");
const dropoffLink = computed(() => content.value?.mail_in?.dropoff_link);
const infoLink = computed(() => content.value?.mail_in?.more_link ?? "https://www.usa.gov/voter-registration");

function yesNoMaybe(val: string | boolean | undefined, yes: string, no: string, maybe: string | undefined) {
  if (val === true) return yes;
  if (val === false) return no;
  return maybe || "";
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
    link: trackBallotLink.value,
    icon: PackageSearch,
  },
  {
    title: "Absentee ballot information",
    link: infoLink.value,
    icon: FileText,
  },
].filter(info => info.link));
const faqs: ComputedRef<FAQ[]> = computed(() => [
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
  <div class="mt-2">

    <div class="mx-auto grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-3">
      <!-- Sidebar: Info Links -->
      <aside class="rounded-lg bg-base-200 p-4 shadow-md lg:col-span-1">
        <Transition>
          <div v-if="status === 'pending'" class="skeleton h-4 w-full"/>
          <h2 v-else-if="content" class="mb-4 text-xl font-semibold">Information Links</h2>
          <h2 v-else class="mb-4 font-semibold text-error">We don’t have a lot of details for your state or territory just yet, but here’s some general info to help you out.</h2>
        </Transition>
        <Transition>
          <div v-if="status === 'pending'" class="skeleton h-4 w-full"/>
          <ul v-else class="space-y-3">
            <li v-for="info in infoLinks" :key="info.title" class="flex items-center gap-2">
              <component :is="info.icon" class="size-5 text-primary" />
              <a :href="info.link" target="_blank" class="link link-hover">{{ info.title }}</a>
            </li>
          </ul>
        </Transition>
      </aside>

      <!-- Main Content: FAQs -->
      <section class="rounded-lg bg-base-200 p-4 shadow-md lg:col-span-2">
        <div class="mb-6 space-y-4">
          <JourneySelectState/>
          <div class="flex items-center">
            <label class="label">
            <input
                id="requestedBallot" v-model="requestedBallot"
                   type="checkbox" class="checkbox checkbox-primary" >
              {{ t("absenteeRequested") }}
            </label>
          </div>
        </div>

        <h1 class="mb-6 text-2xl font-semibold">Frequently Asked Questions</h1>

        <Transition>
          <div v-if="status === 'pending'" class="skeleton h-4 w-full"/>
          <div v-else class="space-y-4">
            <JourneyFAQ :faqs="faqs"/>
          </div>
        </Transition>
      </section>
    </div>
  </div>
</template>
<style scoped lang="css">
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
