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
                  :value="yesNoMaybe(election.originalData.voting.early.startDate ? true : undefined)" />
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
            <h2 class="card-title">Early Voting</h2>
            <div class="grid grid-cols-1 gap-4">
              <ul class="list bg-base-100 rounded-box shadow-md">

                <li class="p-4 pb-2 text-xs opacity-60 tracking-wide">Mark your calendar</li>

                <li class="list-row">
                  <div><span class="badge badge-success">Start</span></div>
                  <div>
                    <div>
                      {{niceIsoDate(election.originalData.voting.early.startDate)}}
                      ⟶
                      <span class="badge badge-secondary badge-md">{{ daysLeftIso(election.originalData.voting.early.startDate) }}</span>
                    </div>
                  </div>
                  <a  :href="election.originalData.voting.early.url" target="_blank" class="btn btn-sm btn-ghost btn-primary">
                    <Info title="More information"/>
                  </a>
                </li>

                <li class="list-row">
                  <div><span class="badge badge-error">End</span></div>
                  <div>
                    <div>{{niceIsoDate(election.originalData.voting.early.endDate)}}
                      ⟶
                      <span class="badge badge-secondary badge-md">{{ daysLeftIso(election.originalData.voting.early.endDate) }}</span>
                    </div>
                  </div>
                  <a  :href="election.originalData.voting.early.url" target="_blank" class="btn btn-sm btn-ghost btn-primary">
                    <Info title="More information"/>
                  </a>
                </li>
              </ul>
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
                  <div>{{ election.originalData.voting.byMail.idInstructions }}</div>
                </div>
                <a  :href="election.originalData.voting.byMail.explainerUrl" target="_blank" class="btn btn-sm btn-ghost btn-primary">
                  <Info title="Id instructions"/>
                </a>
              </li>

              <li class="list-row">
                <div><span class="badge">Ballot request deadline</span></div>
                <div>
                  <div>
                    {{ niceIsoDate(election.originalData.voting.byMail.deadline.ballotRequest.date) }}
                    ⟶
                    <span class="badge badge-secondary badge-md">{{ daysLeftIso(election.originalData.voting.byMail.deadline.ballotRequest.date) }}</span>
                  </div>
                </div>
                <a  :href="election.originalData.voting.byMail.explainerUrl" target="_blank" class="btn btn-sm btn-ghost btn-primary">
                  <Info title="More information"/>
                </a>
              </li>
              <li class="list-row">
                <div><span class="badge">Postmarked or Received</span></div>
                <div>
                  <div>{{
                      election.originalData.voting.byMail.deadline.ballotRequest.postmarkedOrReceived || 'N/A'
                    }}</div>
                </div>
                <a  :href="election.originalData.voting.early.url" target="_blank" class="btn btn-sm btn-ghost btn-primary">
                  <Info title="More information"/>
                </a>
              </li>
              <li class="list-row">
                <div><span class="badge">Ballot delivery deadline</span></div>
                <div>
                  <div>
                    {{ niceIsoDate(election.originalData.voting.byMail.deadline.date) }}
                    ⟶
                    <span class="badge badge-secondary badge-md">{{ daysLeftIso(election.originalData.voting.byMail.deadline.date) }}</span>
                  </div>
                </div>
                <a  :href="election.originalData.voting.early.url" target="_blank" class="btn btn-sm btn-ghost btn-primary">
                  <Info title="More information"/>
                </a>
              </li>
              <li class="list-row">
                <div><span class="badge">Reminder</span></div>
                <div>
                  <div>
                    {{ election.originalData.voting.byMail.deadline.ballotRequest.description }}
                  </div>
                </div>
                <a  :href="election.originalData.voting.byMail.explainerUrl" target="_blank" class="btn btn-sm btn-ghost btn-primary">
                  <Info title="More information"/>
                </a>
              </li>
            </ul>

            <div v-if="false" class="space-y-3">
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
        <div class="card bg-base-200 shadow-sm md:col-span-2">
          <div class="card-body">
            <h2 class="card-title">In-Person Voting</h2>
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
    </div>

    <div v-else class="text-center py-20">
      <h2 class="text-2xl font-bold">Election not found</h2>
      <NuxtLink to="/journey/getInformed" class="btn btn-primary mt-4">
        Back to Dashboard
      </NuxtLink>
    </div>
  </div>
</template>
