<script setup lang="ts">
import { ArrowBigRight, BuildingIcon, Download, Flag, MapPinIcon, MessageSquare } from "lucide-vue-next";
import type { ContentElectionRace } from "~/types/election";
import promptUrl from "~/assets/data/ClaudePrompt.md?url";

const slackUrl = "https://callforcode.slack.com/archives/C01CDLTU015";

defineProps<{
  races: ContentElectionRace[]
  electionDescription: string
  electionId: string
}>();
</script>

<template>
  <div class="card bg-base-200 shadow-sm md:col-span-2">
    <div class="card-body">
      <h2 class="card-title">Explore Races</h2>
      <p v-if="races.length === 0">
        No candidates available for this election.
      </p>

      <div v-if="races.length > 0" class="flex flex-col gap-2 items-start">
        <ul class="list bg-base-100 rounded-box shadow-md w-full">

          <li class="p-4 pb-2 text-xs opacity-60 tracking-wide">Open each race to compare candidates and view their
            issue scorecards
          </li>

          <NuxtLink
              v-for="r in races" :key="r.id"
              :to="`/journey/election/five-fifths-details/${electionId}/${r.id}`">
            <li class="list-row">
              <div>
                <div v-if="r.name.includes('Senate')" class="badge badge-primary p-2">
                  <Flag/>
                </div>
                <div v-else-if="r.name.includes('Governor')" class="badge badge-primary p-2">
                  <MapPinIcon/>
                </div>
                <div v-else class="badge badge-primary p-2">
                  <BuildingIcon/>
                </div>
              </div>
              <div>
                <div>{{ r.name }}</div>
                <div class="text-xs uppercase font-semibold opacity-60">
                  {{ electionDescription }}
                </div>
              </div>

              <ArrowBigRight/>
            </li>
          </NuxtLink>

        </ul>
      </div>

      <div class="">
        <div class="flex items-center gap-1">
          <Download class="w-3.5 h-3.5"/>
          Download the
          <a
              :href="promptUrl"
              download="ClaudePrompt.md"
              class="link link-primary"
          >prompt</a>
          we use to help us score candidates.
        </div>
        <div class="flex items-center gap-1">
          <MessageSquare class="w-3.5 h-3.5"/>
          Share score for a candidate on Slack at
          <a
              :href="slackUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="link link-primary flex items-center gap-1"
          >
            #racial-justice-five-fifths-voter
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
