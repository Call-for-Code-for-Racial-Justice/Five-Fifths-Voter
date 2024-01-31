<template>
  <div class="page__title">{{ $t("getInformedTitle") }}</div>
  <cv-grid :full-width="true">
    <cv-row>
      <cv-column :sm="4" :lg="8">
        <territory-info v-if="info.register.territory" class="journey__info" />

        <!-- show core races for this state -->
        <div v-if="hasCoreRaces" class="journey__info">
          <span>{{ $t("getInformedTopContests") }}</span>
          <mark-down v-if="info.sample_ballot" :content="info.sample_ballot" />
        </div>

        <div v-else>
          <div class="journey__next-date">
            Next election: {{ niceIsoDate(info.election_start) }}
          </div>
          <div class="journey__info">
            It looks like we do not know much about the upcoming election yet.
            Check back closer to election day.
          </div>
        </div>
      </cv-column>
      <cv-column :sm="4" :lg="8">
        <img
          class="side-image"
          src="@/assets/images/vote-now-black-man-red-flower-1515201899114-98ba64d41df7.jpeg"
          alt=""
        />
      </cv-column>
    </cv-row>
  </cv-grid>
</template>
<!--          <cv-accordion class="candidate__accordion">-->
<!--            <cv-accordion-item v-for="c in info.core_races" :key="c.id" :open="open === c.id">-->
<!--              <template v-slot:title>{{ c.office }} </template>-->
<!--              <template v-slot:content v-if="c.districts">-->
<!--                <find-cong v-if="c.find_cong_district" :district="c.find_cong_district" />-->
<!--                <div-->
<!--                  class="candidate"-->
<!--                  v-for="district in c.districts"-->
<!--                  :key="`${c.id}-${district.name}`"-->
<!--                >-->
<!--                  <cv-link :href="district.link" target="_blank">{{ district.name }}</cv-link>-->
<!--                </div>-->
<!--              </template>-->
<!--              <template v-slot:content v-else-if="c.more_link">-->
<!--                <cv-link :href="c.more_link" target="_blank">{{-->
<!--                  $t('getInformedMoreInfo')-->
<!--                }}</cv-link>-->
<!--              </template>-->
<!--              <template v-slot:content v-else-if="!c.candidates || c.candidates.length === 0">-->
<!--                <cv-link :href="`https://www.vote411.org/${usaState}`" target="_blank">{{-->
<!--                  $t('getInformedMoreInfo')-->
<!--                }}</cv-link>-->
<!--              </template>-->
<!--              <template v-slot:content v-else>-->
<!--                <div>{{ $t('getInformedCandidateOrder') }}</div>-->
<!--                <div class="candidate" v-for="candidate in c.candidates" :key="candidate.id">-->
<!--                  <cv-link :inline="true" :href="candidate.candidateUrl" target="_blank">{{-->
<!--                    candidate.name-->
<!--                  }}</cv-link>-->
<!--                  <span-->
<!--                    >{{ candidate.party }}-->
<!--                    <republican-->
<!--                      v-if="candidate.party === 'Republican'"-->
<!--                      style="width: 20px; height: 20px"-->
<!--                      aria-hidden="true"-->
<!--                      focus="false"-->
<!--                    />-->
<!--                    <democrat-->
<!--                      v-if="candidate.party === 'Democrat'"-->
<!--                      style="width: 20px; height: 20px"-->
<!--                      aria-hidden="true"-->
<!--                      focus="false"-->
<!--                    />-->
<!--                    <libertarian-->
<!--                      v-if="candidate.party === 'Libertarian'"-->
<!--                      style="width: 20px; height: 20px"-->
<!--                      aria-hidden="true"-->
<!--                      focus="false"-->
<!--                    />-->
<!--                  </span>-->
<!--                  <cv-link-->
<!--                    v-for="channel in candidate.channels"-->
<!--                    :key="`${candidate.id}-${channel.type}`"-->
<!--                    :href="channel.id"-->
<!--                    target="_blank"-->
<!--                  >-->
<!--                    <facebook v-if="channel.type === 'Facebook'" aria-hidden="true" focus="false" />-->
<!--                    <twitter-->
<!--                      v-else-if="channel.type === 'Twitter'"-->
<!--                      aria-hidden="true"-->
<!--                      focus="false"-->
<!--                    />-->
<!--                    <youtube-->
<!--                      v-else-if="channel.type === 'YouTube'"-->
<!--                      aria-hidden="true"-->
<!--                      focus="false"-->
<!--                    />-->
<!--                    <instagram-->
<!--                      v-else-if="channel.type === 'Instagram'"-->
<!--                      aria-hidden="true"-->
<!--                      focus="false"-->
<!--                    />-->
<!--                    <linkedin-->
<!--                      v-else-if="channel.type === 'LinkedIn'"-->
<!--                      aria-hidden="true"-->
<!--                      focus="false"-->
<!--                    />-->
<!--                    <span v-else>{{ channel.type }}</span>-->
<!--                  </cv-link>-->
<!--                </div>-->
<!--              </template>-->
<!--            </cv-accordion-item>-->
<!--          </cv-accordion>-->
<!--          <div v-if="!hasCoreRaces">-->
<!--            <div class="informed__next-date">-->
<!--              Next election: {{ niceIsoDate(info.election_start) }}-->
<!--            </div>-->
<!--            <div class="informed__next-message">-->
<!--              It looks like we do not know much about the upcoming election yet. Check back closer-->
<!--              to election day.-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </aside>-->
<!--    </template>-->
<!--    <template v-slot:image>-->
<!--      <aside class="aside__container&#45;&#45;img" :aria-label="$t('ariaSupportingImage')">-->
<!--        <img-->
<!--          class="aside__image"-->
<!--          src="../../assets/vote-now-black-man-red-flower-1515201899114-98ba64d41df7.jpeg"-->
<!--          alt="Man looking stoically away from the camera"-->
<!--        />-->
<!--      </aside>-->
<!--    </template>-->
<!--  </MainContent>-->
<!--</template>-->

<script setup>
import TerritoryInfo from "~/components/journey/TerritoryInfo.vue";
//TODO move these somewhere else
/**
 * @typedef {Object} candidateInfo
 * @property {!string} name
 * @property {!string} party
 * @property {!string} candidateUrl
 * @property {Array} channels
 */

/**
 * @typedef {Object} contestInfo
 * @property {!string} office
 * @property {!string} id
 * @property {?Object} find_cong_district
 * @property {Array<candidateInfo>} candidates
 */

/**
 * @typedef {Object} regionInfo
 * @property {?boolean} territory
 * @property {?string }region
 * @property {?string} sample_ballot
 * @property {Array} districts
 * @property {Array<contestInfo>} core_races
 */

/**
 * @typedef {Object<string,regionInfo>} electionInfo
 */
import electionInfo from "@/assets/data/usa-2024.json";
// import Republican from '@/assets/icons/Republican';
// import Democrat from '@/assets/icons/Democrat';
// import Libertarian from '@/assets/icons/Libertarian';
// import TerritoryInfo from './TerritoryInfo';
// import FindCong from './FindCong';
// import {
//   LogoFacebook32,
//   LogoTwitter32,
//   LogoYoutube32,
//   LogoInstagram32,
//   LogoLinkedin32,
// } from '@carbon/icons-vue';

const user = useUser();
const usaCode = computed(() => user.value.info?.location?.region_code);
const registered = computed(() =>
  Boolean(user.value.info?.registered === "presidential-2024"),
);
const info = computed(() => {
  const code = usaCode.value?.toLowerCase() || "unknown";
  return electionInfo[code] || { register: { territory: true } };
});
const hasCoreRaces = computed(() => {
  return info.value?.core_races?.length;
});
// function niceIsoDate(dateStr) {
//   return niceIsoDate(dateStr)
// }
</script>

<style lang="scss">
@import "@/assets/scss/theme";
@import "@/assets/scss/pages";
@import "@/assets/scss/journey";
</style>
