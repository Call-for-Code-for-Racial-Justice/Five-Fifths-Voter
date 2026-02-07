<script setup lang="ts">
import {
  CalendarDays,
  BadgeCheck,
  Info,
} from "lucide-vue-next";
import { niceIsoDate } from "~/utils/dateFormatter";

const isInformed = useLocalStorage(LOCAL_STORAGE_KEYS.VOTER_INFORMED, false);

const { elections, status } = await useElections();

const election = computed(() => {
  const firstContent = elections.value?.find(e => e.source === "content");
  return firstContent ? firstContent.originalData : null;
});

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

function detailsFromSource(source: string) {
  if (source === "content") return "five-fifths-details";
  return "civic-details";
}

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

        <h1 class="mb-6 text-2xl font-semibold text-base-content">Upcoming elections</h1>

        <Transition>
          <div v-if="status === 'pending'" class="skeleton h-4 w-full"/>
          <div v-else class="space-y-4 text-base-content">
            <div v-if="elections && elections.length > 0" class="space-y-4">
              <div v-for="e in elections" :key="e.id" class="card bg-base-300 shadow-sm transition-transform hover:scale-[1.01]">
                <div class="card-body p-4">
                  <div class="flex items-center justify-between gap-4">
                    <div class="flex-1 min-w-0">
                      <NuxtLink :to="`/journey/election/${detailsFromSource(e.source)}/${e.id}`" class="link link-hover">
                        <h3 class="text-xl font-bold text-primary truncate">{{ e.name }}</h3>
                      </NuxtLink>
                      <p class="text-sm opacity-70">{{ niceIsoDate(e.date) }}</p>
                    </div>
                    <span v-if="e.source === 'content'" class="badge badge-outline badge-sm shrink-0">Five Fifths</span>
                    <NuxtLink :to="`/journey/election/${detailsFromSource(e.source)}/${e.id}`" class="btn btn-primary btn-sm shrink-0">
                      Details
                    </NuxtLink>
                  </div>
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
