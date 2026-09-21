<script setup lang="ts">
import { daysLeftIso, niceIsoDate } from "~/utils/dateFormatter";
import { Info } from "lucide-vue-next";
import type { ContentElection } from "~/types/election";

defineProps<{
  election: ContentElection
}>();

function isDateOk(theDate: null | string) {
  if (theDate === null) return false;
  return true;
}
</script>

<template>
  <div class="card bg-base-200 shadow-sm md:col-span-2">
    <div class="card-body">
      <h2 class="card-title">Early Voting</h2>
      <div class="grid grid-cols-1 gap-4">
        <ul class="list bg-base-100 rounded-box shadow-md">
          <li v-if="isDateOk(election?.voting?.early.startDate)" class="p-4 pb-2 text-xs opacity-60 tracking-wide">Mark your calendar</li>
          <li v-else class="p-4 pb-2 text-lg opacity-60 tracking-wide">Early In-Person Voting is not available </li>

          <li v-if="isDateOk(election?.voting?.early.startDate)" class="list-row">
            <div><span class="badge badge-success">Start</span></div>
            <div>
              <div>
                {{niceIsoDate(election?.voting?.early.startDate)}}
                ⟶
                <span class="badge badge-secondary badge-md">{{ daysLeftIso(election?.voting?.early.startDate) }}</span>
              </div>
            </div>
            <a  :href="election?.voting?.early.url" target="_blank" class="btn btn-sm btn-ghost btn-primary">
              <Info title="More information"/>
            </a>
          </li>

          <li v-if="isDateOk(election?.voting?.early.endDate)" class="list-row">
            <div><span class="badge badge-error">End</span></div>
            <div>
              <div>{{niceIsoDate(election?.voting?.early.endDate)}}
                ⟶
                <span class="badge badge-secondary badge-md">{{ daysLeftIso(election?.voting?.early.endDate) }}</span>
              </div>
            </div>
            <a  :href="election?.voting?.early.url" target="_blank" class="btn btn-sm btn-ghost btn-primary">
              <Info title="More information"/>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
