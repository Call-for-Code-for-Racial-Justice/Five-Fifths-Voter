<script setup lang="ts">
import { daysLeftIso, niceIsoDate } from "~/utils/dateFormatter";

definePageMeta({
  subnavigation: "journey",
});

const route = useRoute();
const id = route.params.id as string;
const { elections, status } = await useElections();
const { t } = useI18n();

const election = computed(() => {
  return elections.value?.find(e => e.source === "content" && e.id === id);
});

function yesNoMaybe(val: string | boolean | undefined) {
  if (val === true) return t("yes");
  if (val === false) return t("no");
  return t("maybe");
}
</script>

<template>
  <div class="p-4 max-w-4xl mx-auto">
    <div v-if="status === 'pending'" class="flex justify-center p-12">
      <span class="loading loading-spinner loading-lg text-primary"></span>
    </div>

    <div v-else-if="election" class="space-y-8 animate-in fade-in duration-500">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-base-300 pb-4">
        <div>
          <h1 class="text-3xl font-bold text-primary">{{ election.name }}</h1>
          <p class="text-lg opacity-70">{{ election.originalData.description }}</p>
        </div>
        <div class="badge badge-primary badge-lg p-4">
          {{ niceIsoDate(election.date) }}
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Date and Website -->
        <div class="card bg-base-200 shadow-sm">
          <div class="card-body">
            <h2 class="card-title text-secondary">General Info</h2>
            <JourneyInfoField label="Date" :value="`${niceIsoDate(election.date)} ⟶ ${daysLeftIso(election.date)}`" />
            <div class="mt-4">
              <a :href="election.originalData.website" target="_blank" class="btn btn-outline btn-primary btn-block">
                Official Website
              </a>
            </div>
          </div>
        </div>

        <!-- Voting Options -->
        <div class="card bg-base-200 shadow-sm">
          <div class="card-body">
            <h2 class="card-title text-secondary">Voting Options</h2>
            <div class="space-y-2">
              <JourneyInfoField
                label="In-Person Voting Available"
                :value="yesNoMaybe(election.originalData.voting.inPersonVotingAvailable)" />
              <JourneyInfoField
                label="Mail Ballots Sent Automatically"
                :value="yesNoMaybe(election.originalData.voting.mailBallotsSentAutomatically)" />
            </div>
          </div>
        </div>

        <!-- Early Voting -->
        <div class="card bg-base-200 shadow-sm md:col-span-2">
          <div class="card-body">
            <h2 class="card-title text-secondary">Early Voting</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <JourneyInfoField
                  label="Start"
                  :value="`${niceIsoDate(election.originalData.voting.early.startDate)} ⟶ ${daysLeftIso(election.originalData.voting.early.startDate)}`" />
                <JourneyInfoField
                  label="End"
                  :value="`${niceIsoDate(election.originalData.voting.early.endDate)} ⟶ ${daysLeftIso(election.originalData.voting.early.endDate)}`" />
              </div>
              <div>
                <JourneyInfoField
                  label="Varies by location"
                  :value="yesNoMaybe(election.originalData.voting.early.varies)" />
                <div class="mt-2">
                  <a :href="election.originalData.voting.early.url" target="_blank" class="btn btn-sm btn-ghost btn-primary">
                    More Info
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Voting by Mail -->
        <div class="card bg-base-200 shadow-sm">
          <div class="card-body">
            <h2 class="card-title text-secondary">Voting by Mail</h2>
            <div class="space-y-3">
              <div>
                <span class="text-sm font-bold opacity-70 uppercase">ID Instructions</span>
                <p class="text-sm mt-1">{{ election.originalData.voting.byMail.idInstructions }}</p>
              </div>
              <a :href="election.originalData.voting.byMail.explainerUrl" target="_blank" class="btn btn-sm btn-link p-0 h-auto">View Explainer</a>
              <JourneyInfoField
                label="Ballot request deadline"
                :value="`${niceIsoDate(election.originalData.voting.byMail.deadline.ballotRequest.date)} ⟶ ${daysLeftIso(election.originalData.voting.byMail.deadline.ballotRequest.date)}`"/>
              <JourneyInfoField
                label="(Postmarked or Received)"
                :value="election.originalData.voting.byMail.deadline.ballotRequest.postmarkedOrReceived || 'N/A'"/>
              <JourneyInfoField
                label="Ballot delivery deadline"
                :value="`${niceIsoDate(election.originalData.voting.byMail.deadline.date)} ⟶ ${daysLeftIso(election.originalData.voting.byMail.deadline.date)}`"/>
              <p class="text-xs opacity-60 italic">{{ election.originalData.voting.byMail.deadline.ballotRequest.description }}</p>
            </div>
          </div>
        </div>

        <!-- In-Person Voting -->
        <div class="card bg-base-200 shadow-sm">
          <div class="card-body">
            <h2 class="card-title text-secondary">In-Person Voting</h2>
            <div class="space-y-3">
              <JourneyInfoField
                label="ID Required for All Voters"
                :value="yesNoMaybe(election.originalData.voting.inPerson.idRequiredAllVoters)"/>
              <div v-if="election.originalData.voting.inPerson.idInstructions">
                <span class="text-sm font-bold opacity-70 uppercase">ID Instructions</span>
                <p class="text-sm mt-1">{{ election.originalData.voting.inPerson.idInstructions }}</p>
              </div>
              <a v-if="election.originalData.voting.idUrl" :href="election.originalData.voting.idUrl" target="_blank" class="btn btn-sm btn-link p-0 h-auto">More information about IDs</a>
              <div class="bg-base-300 p-3 rounded-lg mt-2">
                <span class="text-xs font-bold opacity-70 uppercase block mb-1">Election Day Hours</span>
                <span class="text-sm">
                  {{ election.originalData.voting.inPerson.electionDay.opening || 'N/A' }} - {{ election.originalData.voting.inPerson.electionDay.closing || 'N/A' }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-8">
        <NuxtLink to="/journey/getInformed" class="btn btn-ghost">
          ← Back to Dashboard
        </NuxtLink>
      </div>
    </div>

    <div v-else class="text-center py-20">
      <h2 class="text-2xl font-bold">Election not found</h2>
      <NuxtLink to="/journey/getInformed" class="btn btn-primary mt-4">
        Back to Dashboard
      </NuxtLink>
    </div>
  </div>
</template>
