<template>
  <div class="page__title">{{ $t("absenteeTitle") }}</div>
  <cv-grid :full-width="true">
    <cv-row>
      <cv-column :sm="4" :lg="8">
        <cv-checkbox
          value="checked-requested"
          :label="$t('absenteeRequested')"
          :checked="requested"
          @change="onRequested"
        />

        <p class="journey__desc">
          {{ $t("absenteeDesc") }}
        </p>

        <territory-info v-if="info.register.territory" class="journey__desc" />

        <!-- link request ballot -->
        <mark-down :content="requestLink" />

        <!-- State link -->
        <mark-down v-if="moreLink" :content="moreLink" />

        <!-- Request deadline -->
        <mark-down v-if="requestDeadline" :content="requestDeadline" />

        <!-- Return deadline -->
        <mark-down v-if="returnDeadline" :content="returnDeadline" />

        <!-- FAQ section -->
        <div v-if="hasFaq" class="journey__faq__header">{{ $t("faq") }}</div>

        <!-- ID needed -->
        <div v-if="idNeeded" class="journey__faq">
          <span>{{ $t("absenteeIdFaq") }}</span>
          <span>{{ info.mail_in.id_needed ? $t("yes") : $t("no") }}</span>

          <mark-down
            v-if="info.mail_in.id_explainer"
            style="display: inline-block"
            :content="idExplainer"
          />
        </div>
      </cv-column>
      <cv-column :sm="4" :lg="8">
        <img
          class="aside__img"
          src="@/assets/images/absentee-page-group-friends-laptop-image-1.jpg"
          :alt="$t('absenteeImageAlt')"
        />
      </cv-column>
    </cv-row>
  </cv-grid>
  <!--    <template v-slot:content>-->
  <!--      <aside class="aside" :aria-label="$t('ariaAbsenteeInfo')">-->
  <!--        <div class="aside__container&#45;&#45;text">-->

  <!--          <div class="register-faq-header">{{ $t('faq') }}</div>-->
  <!--          &lt;!&ndash; ID needed &ndash;&gt;-->

  <!--          &lt;!&ndash; drop-off &ndash;&gt;-->
  <!--          <div class="register-faq" v-if="'dropoff' in info.mail_in">-->
  <!--            <span>{{ $t('absenteeDropFaq') }}</span-->
  <!--            ><span>{{ info.mail_in.dropoff ? $t('yes') : $t('no') }}</span>-->
  <!--            <div>-->
  <!--              <mark-down-->
  <!--                style="display: inline-block"-->
  <!--                v-if="info.mail_in.dropoff_explainer"-->
  <!--                :content="`\u21b3 ` + info.mail_in.dropoff_explainer"-->
  <!--              />-->
  <!--            </div>-->
  <!--          </div>-->
  <!--          <div class="register-faq" v-if="'any_reason' in info.mail_in">-->
  <!--            <span>{{ $t('absenteeReasonFaq') }}</span-->
  <!--            ><span>{{ !info.mail_in.any_reason ? $t('yes') : $t('no') }}</span>-->
  <!--          </div>-->
  <!--          <div class="register-faq" v-if="'without_notary' in info.mail_in">-->
  <!--            <span>{{ $t('absenteeWitnessFaq') }}</span-->
  <!--            ><span>{{ !info.mail_in.without_notary ? $t('yes') : $t('no') }}</span>-->
  <!--          </div>-->
  <!--        </div>-->
  <!--      </aside>-->
  <!--    </template>-->
  <!--    <template v-slot:image>-->
  <!--      <aside class="aside__container&#45;&#45;img" :aria-label="$t('ariaSupportingImage')">-->

  <!--      </aside>-->
  <!--    </template>-->
  <!--  </MainContent>-->
</template>

<script setup>
import electionInfo from "@/assets/data/usa-2024.json";
import TerritoryInfo from "~/components/journey/TerritoryInfo.vue";

const { t } = useI18n();
const user = useUser();
const usaCode = computed(() => user.value.info?.location?.region_code);
const requested = computed(() =>
  Boolean(user.value.info?.requested_early === "presidential-2024"),
);
const info = computed(() => {
  const code = usaCode.value?.toLowerCase() || "unknown";
  return electionInfo[code] || { register: { territory: true } };
});

const requestLink = computed(() => {
  const requestUrl =
    info.value?.mail_in?.request_link ||
    "https://www.vote.org/absentee-ballot/";
  return t("absenteeRequest", { url: requestUrl });
});
const moreLink = computed(() => {
  const moreUrl = info.value?.mail_in?.more_link;
  if (!moreUrl) return "";

  return t("absenteeMoreInfo", { moreUrl: moreUrl });
});
const requestDeadline = computed(() => {
  const dateStr = info.value?.mail_in?.request_deadline;
  if (!dateStr) return "";
  return t("absenteeRequestDeadline", {
    date: niceDate(dateStr),
    days: daysLeft(dateStr),
  });
});
const returnDeadline = computed(() => {
  const dateStr = info.value?.mail_in?.return_deadline;
  if (!dateStr) return "";
  return t("absenteeReturn", {
    date: niceDate(dateStr),
    days: daysLeft(dateStr),
  });
});
const hasFaq = computed(() => {
  const faq = info.value?.mail_in || {};
  return "id_needed" in faq || "online" in faq;
});

const idNeeded = computed(() => {
  const faq = info.value?.mail_in || {};
  return "id_needed" in faq;
});

const idExplainer = computed(() => {
  const explainer = info.value?.mail_in?.id_explainer;
  const idLink =
    info.value?.mail_in?.id_link ||
    "https://www.ncsl.org/elections-and-campaigns/voter-id";
  if (!explainer) return "";

  return `\u21b3 ${explainer}[${t("absenteeMoreId")}](${idLink})`;
});

const onRequested = (val) => setUserRequested(val);
</script>
<style scoped lang="scss">
@import "@/assets/scss/theme";
@import "@/assets/scss/pages";
@import "@/assets/scss/journey";
.aside__img {
  max-height: 100%;
  max-width: 100%;
}
</style>
