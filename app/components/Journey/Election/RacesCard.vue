<script setup lang="ts">
import { ArrowBigRight, Flag, MapPinIcon, BuildingIcon } from "lucide-vue-next";
import type { ContentElectionRace } from "~/types/election";

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

          <li class="p-4 pb-2 text-xs opacity-60 tracking-wide">Open each race to compare candidates and view their issue scorecards</li>

          <NuxtLink
              v-for="r in races" :key="r.id"
              :to="`/journey/election/five-fifths-details/${electionId}/${r.id}`">
          <li class="list-row">
            <div>
              <div v-if="r.name.includes('Senate')" class="badge badge-primary p-2"><Flag/></div>
              <div v-else-if="r.name.includes('Governor')" class="badge badge-primary p-2"><MapPinIcon/></div>
              <div v-else class="badge badge-primary p-2"><BuildingIcon/></div>
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
    </div>
  </div>
</template>
