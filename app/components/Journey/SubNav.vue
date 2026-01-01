<script setup lang="ts">
import { CheckCircle, Circle, CircleDot } from "lucide-vue-next";

defineProps<{
  mobile?: boolean
}>();

const route = useRoute();

const { t } = useI18n();
const subPages = computed(() => [
  {
    page: "register",
    label: t("journeyPageRegisteredLabel"),
  },
  {
    page: "mailInBallot",
    label: t("journeyPageBallotLabel"),
  },
  {
    page: "getInformed",
    label: t("journeyPageGetInformedLabel"),
  },
  {
    page: "voteInPerson",
    label: t("journeyPageVoteNowLabel"),
  },
  {
    page: "ballotReturn",
    label: t("journeyPageDeliverLabel"),
  },
]);
const currentSub = computed(() => {
  return route.path.split("/").slice(-1)[0];
});

const isCurrentStep = (step: { page: string }) => step.page === currentSub.value;

const deliveredBallot = useLocalStorage(LOCAL_STORAGE_KEYS.VOTER_DELIVERED_BALLOT, false);
const isInformed = useLocalStorage(LOCAL_STORAGE_KEYS.VOTER_INFORMED, false);
const requestedBallot = useLocalStorage(LOCAL_STORAGE_KEYS.VOTER_REQUESTED_BALLOT, false);
const isRegistered = useLocalStorage(LOCAL_STORAGE_KEYS.VOTER_REGISTERED, false);
const iVoted = useLocalStorage(LOCAL_STORAGE_KEYS.VOTER_VOTED, false);

function isCompleted(step: { page: string }) {
  switch (step.page) {
    case "register":
      return isRegistered.value;
    case "ballotReturn":
      return deliveredBallot.value;
    case "mailInBallot":
      return requestedBallot.value;
    case "getInformed":
      return isInformed.value;
    case "voteInPerson":
      return iVoted.value;
    default:
      return false;
  }
}
</script>

<template>
  <nav v-if="mobile">
    <ul>
      <li v-for="(step) in subPages" :key="step.page">
        <NuxtLink
            :to="`/journey/${step.page}`"
            class="text-xs"
            :class="{'menu-active': isCurrentStep(step)}"
        >
          <CheckCircle v-if="isCompleted(step)" class="size-4 text-ff-green-01" />
          <Circle v-else class="size-4 text-gray-400" />
          <span>{{ step.label }}</span>
        </NuxtLink>
      </li>
    </ul>
  </nav>
  <nav v-else class="flex gap-2 overflow-x-auto p-2 sm:gap-4 sm:px-4">
    <template v-for="(step) in subPages" :key="step.page">
      <NuxtLink
          :to="`/journey/${step.page}`"
          class="flex items-center gap-1 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors duration-500"
          :class="{
          'bg-ff-purple-02 font-bold text-white': isCurrentStep(step),
          'bg-gray-100 text-gray-800 hover:bg-gray-200': !isCurrentStep(step)
        }"
      >
        <CircleDot v-if="isCurrentStep(step)" class="size-4 text-white" />
        <CheckCircle v-else-if="isCompleted(step)" class="size-4 text-ff-green-01" />
        <Circle v-else class="size-4 text-gray-400" />
        <span>{{ step.label }}</span>
      </NuxtLink>
    </template>
  </nav>
</template>
