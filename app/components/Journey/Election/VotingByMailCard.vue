<script setup lang="ts">
import { daysLeftIso, niceIsoDate } from "~/utils/dateFormatter";
import { Info } from "lucide-vue-next";
import type { ContentElection } from "~/types/election";

const props = defineProps<{
  election: ContentElection
}>();

const voting = computed(() => props.election?.voting);
</script>

<template>
  <div class="card bg-base-200 shadow-sm md:col-span-2">
    <div class="card-body">
      <h2 class="card-title">Voting by Mail</h2>
      <ul class="list bg-base-100 rounded-box shadow-md">

        <li class="p-4 pb-2 text-xs opacity-60 tracking-wide">Get organized</li>

        <li class="list-row">
          <div><span class="badge">ID Instructions</span></div>
          <div>
            <div>{{ election?.voting?.byMail.idInstructions }}</div>
          </div>
          <a  :href="election?.voting?.byMail.explainerUrl" target="_blank" class="btn btn-sm btn-ghost btn-primary">
            <Info title="Id instructions"/>
          </a>
        </li>

        <li class="list-row">
          <div><span class="badge">Ballot request deadline</span></div>
          <div>
            <div>
              {{ niceIsoDate(election?.voting?.byMail.deadline.ballotRequest.date) }}
              ⟶
              <span class="badge badge-secondary badge-md">{{ daysLeftIso(election?.voting?.byMail.deadline.ballotRequest.date) }}</span>
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
              {{ niceIsoDate(election?.voting?.byMail.deadline.date) }}
              ⟶
              <span class="badge badge-secondary badge-md">{{ daysLeftIso(election?.voting?.byMail.deadline.date) }}</span>
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
          :value="`${niceIsoDate(election?.voting?.byMail.deadline.ballotRequest.date)} ⟶ ${daysLeftIso(voting?.byMail.deadline.ballotRequest.date)}`"/>
        <JourneyInfoField
          label="(Postmarked or Received)"
          :value="voting?.byMail.deadline.ballotRequest.postmarkedOrReceived || 'N/A'"/>
        <JourneyInfoField
          label="Ballot delivery deadline"
          :value="`${niceIsoDate(election?.voting?.byMail.deadline.date)} ⟶ ${daysLeftIso(voting?.byMail.deadline.date)}`"/>
        <p class="text-xs opacity-60 italic">{{ voting?.byMail.deadline.ballotRequest.description }}</p>
      </div>
    </div>
  </div>
</template>
