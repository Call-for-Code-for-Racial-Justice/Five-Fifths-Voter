<script setup lang="ts">
import {
  CalendarDays,
  BadgeCheck,
  Info,
} from "lucide-vue-next";
import { daysLeftIso, niceIsoDate } from "~/utils/dateFormatter";

const isInformed = useLocalStorage(LOCAL_STORAGE_KEYS.VOTER_INFORMED, false);
const usaState = useLocalStorage(LOCAL_STORAGE_KEYS.USA_STATE, "");
const { t } = useI18n();

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

function yesNoMaybe(val: string | boolean | undefined) {
  if (val === true) return t("yes");
  if (val === false) return t("no");
  return t("maybe");
}

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
  <div class="mt-2">

    <div class="mx-auto grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-3">
      <!-- Sidebar: Info Links -->
      <aside class="rounded-lg bg-base-200 p-4 shadow-md lg:col-span-1">
        <h2 class="mb-4 text-xl font-semibold text-base-content">Information Links</h2>
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
      <section class="rounded-lg bg-base-200 p-4 shadow-md lg:col-span-2">
        <div class="mb-6 space-y-4">
          <JourneySelectState/>
          <div v-if="election" class="flex items-center">
            <label class="label">
              <input id="informed" v-model="isInformed" type="checkbox" class="checkbox checkbox-primary" >
              I am informed about the next election
            </label>
          </div>
        </div>

        <h1 class="mb-6 text-2xl font-semibold text-base-content">Upcoming election</h1>

        <Transition>
          <div v-if="status === 'pending'" class="skeleton h-4 w-full"/>
          <div v-else class="space-y-4 text-base-content">
            <div v-if="election" class="grid space-y-4">
              <p class="text-xl">{{ election.description }}</p>

              <div>
                <JourneyInfoField label="Date" :value="`${niceIsoDate(election.date) } ⟶ ${ daysLeftIso(election.date)}`" />
                <a :href="election.website" target="_blank" class="link link-primary link-hover">Official Website</a>
              </div>

              <h2 class="text-xl font-semibold">Voting Options</h2>
              <div class="grid space-y-1">
                <JourneyInfoField
                  label="In-Person Voting Available"
                  :value="yesNoMaybe(election.voting.inPersonVotingAvailable)" />

                <JourneyInfoField
                  label="Mail Ballots Sent Automatically"
                  :value="yesNoMaybe(election.voting.mailBallotsSentAutomatically)" />
              </div>

              <!-- early voting -->
              <div class="grid space-y-1">
                <h3 class="font-semibold">Early Voting</h3>
                <JourneyInfoField
                    label="Start"
                    :value="`${niceIsoDate(election.voting.early.startDate) } ⟶ ${ daysLeftIso(election.voting.early.startDate)}`" />
                <JourneyInfoField
                    label="End"
                    :value="`${niceIsoDate(election.voting.early.endDate) } ⟶ ${ daysLeftIso(election.voting.early.endDate)}`" />
                <JourneyInfoField
                    label="Varies by location"
                    :value="yesNoMaybe(election.voting.early.varies)" />
                <a :href="election.voting.early.url" target="_blank" class="link link-primary link-hover">More Info</a>
              </div>

              <!-- by mail -->
              <div class="grid space-y-1">
                <h3 class="font-semibold">Voting by Mail</h3>
                <span class="font-semibold text-sm">ID Instructions:</span>
                <div class="text-sm">{{ election.voting.byMail.idInstructions }}</div>
                <a :href="election.voting.byMail.explainerUrl" target="_blank" class="link link-primary link-hover">View Explainer</a>
                <JourneyInfoField
                  label="Ballot request deadline"
                  :value="`${niceIsoDate(election.voting.byMail.deadline.ballotRequest.date) } ⟶ ${ daysLeftIso(election.voting.byMail.deadline.ballotRequest.date)}`"/>
                <JourneyInfoField
                  label="(Postmarked or Received)"
                  :value="election.voting.byMail.deadline.ballotRequest.postmarkedOrReceived || 'N/A'"/>
                <JourneyInfoField
                  label="Ballot delivery deadline"
                  :value="`${niceIsoDate(election.voting.byMail.deadline.date) } ⟶ ${ daysLeftIso(election.voting.byMail.deadline.date)}`"/>
                <div class="text-sm">{{ election.voting.byMail.deadline.ballotRequest.description }}</div>
              </div>

              <!-- in person -->
              <div class="grid space-y-1">
                <h3 class="font-semibold">In-Person Voting</h3>
                <JourneyInfoField
                  label="ID Required for All Voters"
                  :value="yesNoMaybe(election.voting.inPerson.idRequiredAllVoters)"/>
                <div v-if="election.voting.inPerson.idInstructions" class="text-sm">
                  <span class="font-semibold">ID Instructions:</span>
                  {{ election.voting.inPerson.idInstructions }}
                </div>
                <a v-if="idInfoLink" :href="idInfoLink" target="_blank" class="link link-primary link-hover">More information about IDs</a>
                <div class="text-sm"><span class="font-semibold">Election Day Hours:</span>
                  {{ election.voting.inPerson.electionDay.opening || 'N/A' }} - {{ election.voting.inPerson.electionDay.closing || 'N/A' }}
                </div>
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
