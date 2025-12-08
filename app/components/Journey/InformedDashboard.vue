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

function yesNoMaybe(val: string | boolean | undefined, yes: string = t("yes"), no: string = t("no"), maybe: string | undefined) {
  if (val === true) return yes;
  if (val === false) return no;
  return maybe;
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
  <div class="p-4 sm:p-6 md:p-8">

    <div class="mx-auto grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-3">
      <!-- Sidebar: Info Links -->
      <aside class="rounded-lg bg-white p-4 shadow-md lg:col-span-1">
        <h2 class="mb-4 text-xl font-semibold text-gray-800">Information Links</h2>
        <Transition>
          <div class="skeleton h-4 w-full" v-if="status === 'pending'"/>
          <ul v-else class="space-y-3">
            <li v-for="info in infoLinks" :key="info.title" class="flex items-center gap-2">
              <component :is="info.icon" class="size-5 text-blue-500" />
              <a :href="info.link" target="_blank" class="text-blue-600 hover:underline">{{ info.title }}</a>
            </li>
          </ul>
        </Transition>
      </aside>

      <!-- Main election -->
      <section class="rounded-lg bg-white p-4 shadow-md lg:col-span-2">
        <div class="mb-6 space-y-4">
          <JourneySelectState/>
          <div v-if="election" class="flex items-center">
            <input id="informed" v-model="isInformed" type="checkbox" class="size-4 rounded-sm border-gray-300 text-blue-600 focus:ring-blue-500" >
            <label for="informed" class="ml-2 block text-sm text-gray-700">I am informed about the next election</label>
          </div>
        </div>

        <h1 class="mb-6 text-2xl font-bold text-ff-purple-01">Upcoming election</h1>

        <Transition>
          <div class="skeleton h-4 w-full" v-if="status === 'pending'"/>
          <div v-else class="space-y-4 text-base-200">
            <div v-if="election">
              <p class="mb-4 text-xl">{{ election.description }}</p>

              <div class="mb-6">
                <p><strong>Date:</strong> {{ niceIsoDate(election.date) }} ⟶ {{ daysLeftIso(election.date)}}</p>
                <a :href="election.website" target="_blank" class="text-blue-600 hover:underline">Official Website</a>
              </div>

              <h2 class="mb-2 text-xl font-semibold text-gray-800">Voting Options</h2>
              <ul class="mb-4 space-y-1">
                <li><strong>In-Person Voting Available:</strong> {{ yesNoMaybe(election.voting.inPersonVotingAvailable) }}</li>
                <li><strong>Mail Ballots Sent Automatically:</strong> {{ yesNoMaybe(election.voting.mailBallotsSentAutomatically) }}</li>
              </ul>

              <!-- early voting -->
              <div class="mb-6">
                <h3 class="font-semibold text-ff-purple-01">Early Voting</h3>
                <p><strong>Start:</strong> {{ niceIsoDate(election.voting.early.startDate) }}  ⟶ {{ daysLeftIso(election.voting.early.startDate)}} </p>
                <p><strong>End:</strong> {{ niceIsoDate(election.voting.early.endDate) }}  ⟶ {{ daysLeftIso(election.voting.early.endDate)}}</p>
                <p><strong>Varies by location:</strong> {{ yesNoMaybe(election.voting.early.varies) }}</p>
                <a :href="election.voting.early.url" target="_blank" class="text-blue-600 hover:underline">More Info</a>
              </div>

              <!-- by mail -->
              <div class="mb-6">
                <h3 class="font-semibold text-ff-purple-01">Voting by Mail</h3>
                <p><strong>ID Instructions:</strong> {{ election.voting.byMail.idInstructions }}</p>
                <a :href="election.voting.byMail.explainerUrl" target="_blank" class="text-blue-600 hover:underline">View Explainer</a>
                <p><strong>Ballot request deadline:</strong>
                  {{ niceIsoDate(election.voting.byMail.deadline.ballotRequest.date) }}
                  ({{ election.voting.byMail.deadline.ballotRequest.postmarkedOrReceived || 'N/A' }})
                  ⟶ {{ daysLeftIso(election.voting.byMail.deadline.ballotRequest.date)}}</p>
                <p><strong>Ballot delivery deadline:</strong> {{ niceIsoDate(election.voting.byMail.deadline.date) }} ({{ election.voting.byMail.deadline.postmarkedOrReceived || 'N/A' }})  ⟶ {{ daysLeftIso(election.voting.byMail.deadline.date)}}</p>
                <p>{{ election.voting.byMail.deadline.ballotRequest.description }}</p>
              </div>

              <!-- in person -->
              <div class="mb-4">
                <h3 class="font-semibold text-ff-purple-01">In-Person Voting</h3>
                <p><strong>ID Required for All Voters:</strong> {{ yesNoMaybe(election.voting.inPerson.idRequiredAllVoters) }}</p>
                <p v-if="election.voting.inPerson.idInstructions"><strong>ID Instructions:</strong>
                  {{ election.voting.inPerson.idInstructions }}
                </p>
                <a v-if="idInfoLink" :href="idInfoLink" target="_blank" class="text-blue-600 hover:underline">More information about IDs</a>
                <p><strong>Election Day Hours:</strong>
                  {{ election.voting.inPerson.electionDay.opening || 'N/A' }} - {{ election.voting.inPerson.electionDay.closing || 'N/A' }}
                </p>
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
