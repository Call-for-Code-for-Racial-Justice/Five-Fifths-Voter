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
        >
        </cv-checkbox>
        <!-- Check your registration -->
        <cv-link :inline="true" :href="checkRegLink" target="_blank"
          ><span class="register__link">{{ $t("checkHere") }}</span></cv-link
        >

        <p class="register__desc">
          {{ $t("registerDesc") }}
        </p>
        <territory-info v-if="info.register.territory" class="register__desc" />

        <!-- registration deadline -->
        <mark-down
          v-if="registrationDeadline"
          :content="registrationDeadline"
        />

        <mark-down
          v-if="registerLinks"
          class="register__desc"
          :content="registerLinks"
        />

        <!-- Youth -->
        <cali-special v-if="usaCode === 'ca'" class="register__desc" />
        <div v-else class="register__desc">
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
        <div class="register__desc">
          <div>{{ felonText }}</div>
          <cv-link
            style="margin-left: 0"
            :inline="true"
            :href="felonLink"
            target="_blank"
            >{{ $t("moreInformation") }}</cv-link
          >
        </div>

        <!-- Register day of voting -->
        <div v-if="hasFaq" class="register__faq__header">{{ $t("faq") }}</div>

        <div v-if="'election_day' in info.register" class="register__faq">
          <span>{{ $t("registerElectionDay") }}</span
          ><span>{{ info.register.election_day ? $t("yes") : $t("no") }}</span>
        </div>

        <!-- Register online -->
        <div v-if="'online' in info.register" class="register__faq">
          <span>{{ $t("registerOnlineQ") }}</span
          ><span>{{ info.register.online ? $t("yes") : $t("no") }}</span>
        </div>
      </cv-column>
      <cv-column :sm="4" :lg="8">
        <img
          class="aside__image"
          src="@/assets/images/register-page-woman-in-sun-image-1.jpeg"
          alt=""
        />
      </cv-column>
    </cv-row>
  </cv-grid>
</template>

<script setup>
import electionInfo from "@/assets/data/usa-2024.json";
import { setUserRegistered } from "~/composables/user";
import CaliSpecial from "~/components/journey/CaliSpecial.vue";
import TerritoryInfo from "~/components/journey/TerritoryInfo.vue";
import { loadApproxLocation } from "~/utils/user";

const { t } = useI18n();

const user = useUser();
const usaCode = computed(() => user.value.info?.location?.region_code);
const registered = computed(() =>
  Boolean(user.value.info?.registered === "presidential-2024"),
);
const info = computed(() => {
  const code = usaCode.value?.toLowerCase() || "unknown";
  console.log("code:", code, electionInfo[code]);
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
  return (
    info.value?.register?.felon ||
    "Formerly incarcerated? You may be able to vote."
  );
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
.register {
  &__link {
    color: white !important;
  }
  &__desc {
    @include carbon--type-style("body-long-02");
    color: white;
    margin-top: 0.5rem;
    margin-bottom: 2.5rem;
    :deep(a) {
      color: white;
    }
  }
  &__faq {
    @include type-style("body-short-02");
    margin-top: 0.5rem;

    span:nth-child(1) {
      @include type-style("body-short-02");
    }

    span:nth-child(2) {
      @include type-style("productive-heading-03");
      margin-left: 0.5rem;
      color: $ff-yellow-01;
    }
    &-header {
      @include type-style("productive-heading-03");
      font-weight: 800;
      margin-top: 1rem;
    }
  }
}
</style>
