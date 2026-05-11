<script setup lang="ts">
import { daysLeftIso, niceIsoDate } from "~/utils/dateFormatter";
import { Info, MoveLeftIcon } from "lucide-vue-next";

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
const races = computed(() => election.value?.originalData?.meta?.races || []);
const voting = computed(() => election.value?.originalData?.voting || {});

function yesNoMaybe(val: string | boolean | undefined) {
  if (val === true) return t("yes");
  if (val === false) return t("no");
  return t("maybe");
}
</script>

<template>
  <div class="p-4 max-w-4xl mx-auto mt-14">
    <div v-if="status === 'pending'" class="flex justify-center p-12">
      <span class="loading loading-spinner loading-lg text-primary"/>
    </div>

    <div v-else-if="election" class="animate-in fade-in duration-500">
      <div>
        <NuxtLink to="/journey/getInformed" class="btn btn-ghost text-xs">
          <MoveLeftIcon/> Back to Dashboard
        </NuxtLink>
      </div>
      <div class="border-b border-base-300 pb-4">
        <div>
          <h1 class="text-3xl font-bold text-primary">{{ election.name }}</h1>
          <p class="text-lg opacity-70">Information from Five Fifths Voter</p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Date and Website -->
        <div class="card bg-base-200 shadow-sm">
          <div class="card-body">
            <h2 class="card-title">General Info</h2>
            <JourneyInfoField label="Date" :prefix="`${niceIsoDate(election.date)} ⟶`" :value="daysLeftIso(election.date)" />
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
            <h2 class="card-title">Voting Options</h2>
            <div class="space-y-2">
              <JourneyInfoField
                  label="Early Voting Available"
                  :value="yesNoMaybe(voting?.early.startDate ? true : undefined)" />
              <JourneyInfoField
                label="In-Person Voting Available"
                :value="yesNoMaybe(voting?.inPersonVotingAvailable)" />
              <JourneyInfoField
                label="Mail Ballots Sent Automatically"
                :value="yesNoMaybe(voting?.mailBallotsSentAutomatically)" />
            </div>
          </div>
        </div>

        <!-- Early Voting -->
        <div class="card bg-base-200 shadow-sm md:col-span-2">
          <div class="card-body">
            <h2 class="card-title">Early Voting</h2>
            <div class="grid grid-cols-1 gap-4">
              <ul class="list bg-base-100 rounded-box shadow-md">

                <li class="p-4 pb-2 text-xs opacity-60 tracking-wide">Mark your calendar</li>

                <li class="list-row">
                  <div><span class="badge badge-success">Start</span></div>
                  <div>
                    <div>
                      {{niceIsoDate(voting?.early.startDate)}}
                      ⟶
                      <span class="badge badge-secondary badge-md">{{ daysLeftIso(voting?.early.startDate) }}</span>
                    </div>
                  </div>
                  <a  :href="voting?.early.url" target="_blank" class="btn btn-sm btn-ghost btn-primary">
                    <Info title="More information"/>
                  </a>
                </li>

                <li class="list-row">
                  <div><span class="badge badge-error">End</span></div>
                  <div>
                    <div>{{niceIsoDate(voting?.early.endDate)}}
                      ⟶
                      <span class="badge badge-secondary badge-md">{{ daysLeftIso(voting?.early.endDate) }}</span>
                    </div>
                  </div>
                  <a  :href="voting?.early.url" target="_blank" class="btn btn-sm btn-ghost btn-primary">
                    <Info title="More information"/>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Candidates-->
        <div class="card bg-base-200 shadow-sm md:col-span-2">
          <div class="card-body">
            <h2 class="card-title">Candidates</h2>
            <div v-if="races.length === 0">
              No candidates available for this election.
            </div>
            <div v-else class="flex flex-col gap-2 items-start">
              <NuxtLink
                  v-for="r in races"
                  :key="r"
                  class="btn btn-link"
                  :to="`/journey/election/candidates/${r}`">
                {{ r }}
              </NuxtLink>
              </div>
          </div>
        </div>

        <!-- Voting by Mail -->
        <div class="card bg-base-200 shadow-sm md:col-span-2">
          <div class="card-body">
            <h2 class="card-title">Voting by Mail</h2>
            <ul class="list bg-base-100 rounded-box shadow-md">

              <li class="p-4 pb-2 text-xs opacity-60 tracking-wide">Get organized</li>

              <li class="list-row">
                <div><span class="badge">ID Instructions</span></div>
                <div>
                  <div>{{ voting?.byMail.idInstructions }}</div>
                </div>
                <a  :href="voting?.byMail.explainerUrl" target="_blank" class="btn btn-sm btn-ghost btn-primary">
                  <Info title="Id instructions"/>
                </a>
              </li>

              <li class="list-row">
                <div><span class="badge">Ballot request deadline</span></div>
                <div>
                  <div>
                    {{ niceIsoDate(voting?.byMail.deadline.ballotRequest.date) }}
                    ⟶
                    <span class="badge badge-secondary badge-md">{{ daysLeftIso(voting?.byMail.deadline.ballotRequest.date) }}</span>
                  </div>
                </div>
                <a  :href="voting?.byMail.explainerUrl" target="_blank" class="btn btn-sm btn-ghost btn-primary">
                  <Info title="More information"/>
                </a>
              </li>
              <li class="list-row">
                <div><span class="badge">Postmarked or Received</span></div>
                <div>
                  <div>{{
                      voting?.byMail.deadline.ballotRequest.postmarkedOrReceived || 'N/A'
                    }}</div>
                </div>
                <a  :href="voting?.early.url" target="_blank" class="btn btn-sm btn-ghost btn-primary">
                  <Info title="More information"/>
                </a>
              </li>
              <li class="list-row">
                <div><span class="badge">Ballot delivery deadline</span></div>
                <div>
                  <div>
                    {{ niceIsoDate(voting?.byMail.deadline.date) }}
                    ⟶
                    <span class="badge badge-secondary badge-md">{{ daysLeftIso(voting?.byMail.deadline.date) }}</span>
                  </div>
                </div>
                <a  :href="voting?.early.url" target="_blank" class="btn btn-sm btn-ghost btn-primary">
                  <Info title="More information"/>
                </a>
              </li>
              <li class="list-row">
                <div><span class="badge">Reminder</span></div>
                <div>
                  <div>
                    {{ voting?.byMail.deadline.ballotRequest.description }}
                  </div>
                </div>
                <a  :href="voting?.byMail.explainerUrl" target="_blank" class="btn btn-sm btn-ghost btn-primary">
                  <Info title="More information"/>
                </a>
              </li>
            </ul>

            <div v-if="false" class="space-y-3">
              <div>
                <span class="text-sm font-bold opacity-70 uppercase">ID Instructions</span>
                <p class="text-sm mt-1">{{ voting?.byMail.idInstructions }}</p>
              </div>
              <a :href="voting?.byMail.explainerUrl" target="_blank" class="btn btn-sm btn-link p-0 h-auto">View Explainer</a>
              <JourneyInfoField
                label="Ballot request deadline"
                :value="`${niceIsoDate(voting?.byMail.deadline.ballotRequest.date)} ⟶ ${daysLeftIso(voting?.byMail.deadline.ballotRequest.date)}`"/>
              <JourneyInfoField
                label="(Postmarked or Received)"
                :value="voting?.byMail.deadline.ballotRequest.postmarkedOrReceived || 'N/A'"/>
              <JourneyInfoField
                label="Ballot delivery deadline"
                :value="`${niceIsoDate(voting?.byMail.deadline.date)} ⟶ ${daysLeftIso(voting?.byMail.deadline.date)}`"/>
              <p class="text-xs opacity-60 italic">{{ voting?.byMail.deadline.ballotRequest.description }}</p>
            </div>
          </div>
        </div>

        <!-- In-Person Voting -->
        <div class="card bg-base-200 shadow-sm md:col-span-2">
          <div class="card-body">
            <h2 class="card-title">In-Person Voting</h2>
            <div class="space-y-3">
              <JourneyInfoField
                label="ID Required for All Voters"
                :value="yesNoMaybe(voting?.inPerson.idRequiredAllVoters)"/>
              <div v-if="voting?.inPerson.idInstructions">
                <span class="text-sm font-bold opacity-70 uppercase">ID Instructions</span>
                <p class="text-sm mt-1">{{ voting?.inPerson.idInstructions }}</p>
              </div>
              <a v-if="voting?.idUrl" :href="voting?.idUrl" target="_blank" class="btn btn-sm btn-link p-0 h-auto">More information about IDs</a>
              <div class="bg-base-300 p-3 rounded-lg mt-2">
                <span class="text-xs font-bold opacity-70 uppercase block mb-1">Election Day Hours</span>
                <span class="text-sm">
                  {{ voting?.inPerson.electionDay.opening || 'N/A' }} - {{ voting?.inPerson.electionDay.closing || 'N/A' }}
                </span>
              </div>
            </div>
          </div>
        </div>
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
