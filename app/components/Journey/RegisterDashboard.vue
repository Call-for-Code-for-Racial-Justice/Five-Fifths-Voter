<script setup lang="ts">
import { AlertCircle, CalendarCheck, Edit, FileText, Mail, RefreshCcw, Scale, Search } from "lucide-vue-next";
import type { FAQ } from "~/types/faq";

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

function yesNoMaybe(val: string | boolean | undefined, yes: string, no: string, maybe?: string) {
  if (val === true) return yes;
  if (val === false) return no;
  return maybe || "";
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
    link: infoLink.value,
    icon: FileText,
  },
].filter(info => info.link));
const faqs: ComputedRef<FAQ[]> = computed(() => [
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
              <input id="registered" v-model="isRegistered" type="checkbox" class="checkbox checkbox-primary" >
              I am already registered to vote
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
