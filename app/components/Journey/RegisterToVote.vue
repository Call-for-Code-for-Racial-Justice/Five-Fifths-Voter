<template>
  <div class="page__title">{{ $t("registerTitle") }}</div>
  <cv-grid :full-width="true">
    <cv-row>
      <cv-column :sm="4" :lg="8">
        <cv-checkbox
          value="checked-registered"
          :label="$t('journeyPageRegisteredLabel')"
          :checked="registered"
          @change="onRegistered"
        />
        <!-- Check your registration -->
        <cv-link :inline="true" :href="checkRegLink" target="_blank"
          ><span>{{ $t("checkHere") }}</span></cv-link
        >

        <p class="journey__desc">
          {{ $t("registerDesc") }}
        </p>
        <journey-territory-info
          v-if="info.register.territory"
          class="journey__desc"
        />

        <!-- registration deadline -->
        <mark-down
          v-if="registrationDeadline"
          :content="registrationDeadline"
        />

        <mark-down
          v-if="registerLinks"
          class="journey__desc"
          :content="registerLinks"
        />

        <!-- Youth -->
        <journey-cali-special v-if="usaCode === 'ca'" class="journey__desc" />
        <div v-else class="journey__desc">
          <div>{{ registerYouth }}</div>
          <cv-link
            style="margin-left: 0"
            :inline="true"
            :href="registerYouthLink"
            target="_blank"
            >{{ $t("register") }}</cv-link
          >
        </div>

        <!-- Formerly incarcerated-->
        <div class="journey__desc">
          <div>{{ felonText }}</div>
          <cv-link
            style="margin-left: 0"
            :inline="true"
            :href="felonLink"
            target="_blank"
            >{{ $t("moreInformation") }}</cv-link
          >
        </div>

        <!-- FAQ section -->
        <div v-if="hasFaq" class="journey__faq__header">{{ $t("faq") }}</div>

        <!-- Register day of voting -->
        <div v-if="'election_day' in info.register" class="journey__faq">
          <span>{{ $t("registerElectionDay") }}</span
          ><span>{{ info.register.election_day ? $t("yes") : $t("no") }}</span>
        </div>

        <!-- Register online -->
        <div v-if="'online' in info.register" class="journey__faq">
          <span>{{ $t("registerOnlineQ") }}</span
          ><span>{{ info.register.online ? $t("yes") : $t("no") }}</span>
        </div>
      </cv-column>
      <cv-column :sm="4" :lg="8">
        <div class="aspect-[4/3] w-full max-w-xl">
          <img
            class="h-full w-full object-cover"
            src="@/assets/images/journey/embrace-vote.gif"
            alt=""
          >
        </div>
      </cv-column>
    </cv-row>
  </cv-grid>
</template>

<script setup>
import electionInfo from "@/assets/data/usa-2024.json";
import { isUserRegistered, setUserRegistered } from "~/composables/user";
import { loadApproxLocation } from "~/utils/user";

const { t } = useI18n();

const user = useUser();
const usaCode = computed(() => user.value.info?.location?.region_code);
const registered = computed(() => isUserRegistered());
const info = computed(() => {
  const code = usaCode.value?.toLowerCase() || "unknown";
  return electionInfo[code] || { register: { territory: true } };
});
const checkRegLink = computed(() => {
  return (
    info.value?.register?.check_link ||
    "https://www.vote.org/am-i-registered-to-vote/"
  );
});
const registrationDeadline = computed(() => {
  const dateStr = info.value?.register?.deadline_in_person;
  if (!dateStr) return "";
  return t("registrationDeadline", {
    date: niceDate(dateStr),
    days: daysLeft(dateStr),
  });
});
const registerLinks = computed(() => {
  const onlineUrl = info.value?.register?.online_link;
  const mailLink = info.value?.register?.mail_link;
  if (!onlineUrl && !mailLink) return "";

  return t("registerLinks", {
    onlineUrl,
    mailLink,
  });
});
const registerYouth = computed(() => {
  return info.value?.register?.youth || t("registerYouthQ");
});
const registerYouthLink = computed(() => {
  return (
    info.value?.register?.youth_link ||
    info.value?.register?.online_link ||
    "https://www.ncsl.org/research/elections-and-campaigns/preregistration-for-young-voters.aspx"
  );
});
const felonText = computed(() => {
  return info.value?.register?.felon || t("registerFormerlyIncarcerated");
});
const felonLink = computed(() => {
  return (
    info.value?.register?.felon_link ||
    "https://www.ncsl.org/research/elections-and-campaigns/felon-voting-rights.aspx"
  );
});
const hasFaq = computed(() => {
  const register = info.value?.register || {};
  return "election_day" in register || "online" in register;
});
const onRegistered = (val) => setUserRegistered(val);
onMounted(() => {
  loadApproxLocation();
});
</script>

<style scoped lang="scss">
@import "@/assets/scss/theme";
@import "@/assets/scss/pages";
@import "@/assets/scss/journey";
</style>
