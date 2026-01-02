<script setup lang="ts">
import {
  CalendarDays,
  BadgeCheck,
  Info,
} from "lucide-vue-next";
import { daysLeftIso, niceIsoDate } from "~/utils/dateFormatter";

const iVoted = useLocalStorage(LOCAL_STORAGE_KEYS.VOTER_VOTED, false);
const usaState = useLocalStorage(LOCAL_STORAGE_KEYS.USA_STATE, "");

// uncomment this for local dev
// clearNuxtData(`elections-${usaState.value}`);
const { data: election, status } = await useAsyncData<ContentProcedure>(
  `elections-${usaState.value}`,
  () => {
    // console.log(`fetching elections for ${usaState.value}`);
    return queryCollection("elections").where("ocdId", "=", `ocd-division/country:us/state:${usaState.value}`).first();
  },
  {
    watch: [usaState],
  },
);

const idInfoLink = computed(() => election.value?.voting?.idUrl);
const infoLink = computed(() => election.value?.website ?? "https://www.vote.org/");
const ballotpediaLink = computed(() => election.value?.voting?.ballotpediaUrl ?? "https://ballotpedia.org/Elections_calendar");

const infoLinks = computed(() => [
  {
    title: "Upcoming elections",
    link: ballotpediaLink.value,
    icon: CalendarDays,
  },
  {
    title: "Voter id requirements",
    link: idInfoLink.value,
    icon: BadgeCheck,
  },
  {
    title: "Voter information",
    link: infoLink.value,
    icon: Info,
  },
].filter(info => info.link));

</script>

<template>
  <div class="p-4 sm:p-6 md:p-8">

    <div class="mx-auto grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-3">
      <!-- Sidebar: Info Links -->
      <aside class="rounded-lg bg-base-300 p-4 shadow-md lg:col-span-1">
        <h2 class="mb-4 text-xl font-semibold">Information Links</h2>
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

      <!-- Main election -->
      <section class="rounded-lg bg-base-300 p-4 shadow-md lg:col-span-2">
        <div class="mb-6 space-y-4">
          <JourneySelectState/>
          <div v-if="election" class="flex items-center">
            <label class="label">
              <input id="i-voted" v-model="iVoted" type="checkbox" class="checkbox checkbox-primary" >
              I voted!
            </label>
          </div>
        </div>

        <h1 class="mb-6 text-2xl font-semibold">Upcoming election</h1>

        <Transition>
          <div v-if="status === 'pending'" class="skeleton h-4 w-full"/>
          <div v-else class="space-y-4">
            <div v-if="election">
              <p class="mb-4 text-xl">{{ election.description }}</p>

              <div class="mb-6">
                <JourneyInfoField
                    label="Date"
                    :value="`${niceIsoDate(election.date) } ⟶ ${daysLeftIso(election.date)}`"/>
                <a :href="election.website" target="_blank" class="link link-hover">Official Website</a>
              </div>

              <!-- early voting -->
              <div class="mb-6">
                <JourneyInfoField
                    label="Early voting starts"
                    :value="`${niceIsoDate(election.voting.early.startDate) } ⟶ ${daysLeftIso(election.voting.early.startDate)}`"/>
                <a :href="election.voting.early.url" target="_blank" class="link link-hover">Find your early voting location</a>

              </div>

              <!-- by mail -->
              <div class="mb-6">
                <h2 class="text-xl font-semibold">Voting Options</h2>
                <JourneyInfoField
                    label="Voting by mail"
                    :value="`Deliver you ballot by ${niceIsoDate(election.voting.byMail.deadline.date) } ( ${election.voting.byMail.deadline.postmarkedOrReceived || 'N/A'} ) ⟶ ${daysLeftIso(election.voting.byMail.deadline.date)}`"/>
                <a :href="election.voting.byMail.explainerUrl" target="_blank" class="link link-hover">Carefully follow your state's instructions.</a>
              </div>

              <!-- in person -->
              <div class="mb-4">
                <div class="text-sm font-semibold">In-Person Voting:</div>
                <ul class="list-inside list-disc text-sm">
                  <li v-if="election.voting.inPerson.idRequiredAllVoters">ID Required for All Voters</li>
                  <li v-if="election.voting.inPerson.idInstructions">{{ election.voting.inPerson.idInstructions }}</li>
                  <li v-if="election.voting.inPerson.electionDay.opening">Hours:
                    {{ election.voting.inPerson.electionDay.opening || 'N/A' }} -
                    {{ election.voting.inPerson.electionDay.closing || 'N/A' }}
                  </li>
                </ul>
              </div>
            </div>
            <div v-else class="text-lg">
              {{ $t("getInformedNextCheck")}}
            </div>
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
