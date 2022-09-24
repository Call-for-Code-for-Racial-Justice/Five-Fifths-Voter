<template>
  <MainContent>
    <template v-slot:content>
      <aside class="aside" :aria-label="$t('ariaAbsenteeInfo')">
        <div class="aside__container--text">
          <select-state />
          <cv-checkbox
            :label="$t('absenteeRequested')"
            value="checked-requested"
            :checked="requested"
            @change="onRequested"
          >
          </cv-checkbox>

          <h2 class="aside__header" style="margin-top: 2rem">{{ $t('absenteeTitle') }}</h2>
          <p class="aside__paragraph">
            {{ $t('absenteeDesc') }}
          </p>

          <territory-info v-if="info.mail_in.territory" />

          <!-- Request deadline -->
          <div class="register-info-deadline" v-if="info.mail_in.request_deadline">
            {{ $t('registrationDeadline') }}
            <span>{{ niceDate(info.mail_in.request_deadline) }}, </span>
            <span class="days-left">{{ daysLeft(info.mail_in.request_deadline) }}</span>
          </div>

          <!-- link request ballot -->
          <div class="register-info" v-if="!info.mail_in.territory">
            <mark-down
              v-if="info.mail_in.request_link"
              :content="$t('absenteeRequest', { url: info.mail_in.request_link })"
            />
            <cv-link
              v-else
              href="https://www.vote.org/absentee-ballot/"
              :inline="true"
              target="_blank"
            >
              {{ $t('absenteeRequest') }} &rarr;
            </cv-link>
          </div>

          <!-- State link -->
          <div v-if="info.mail_in.more_link" class="register-info">
            <mark-down :content="$t('absenteeMoreInfo', { moreUlrl: info.mail_in.more_link })" />
          </div>

          <!-- Return deadline -->
          <div
            class="register-info-deadline"
            style="margin-top: 1rem"
            v-if="info.mail_in.return_deadline"
          >
            {{ $t('absenteeReturn') }}
            <span>{{ niceDate(info.mail_in.return_deadline) }}, </span>
            <span class="days-left">{{ daysLeft(info.mail_in.return_deadline) }}. </span>
          </div>

          <div class="register-faq-header">{{ $t('faq') }}</div>
          <!-- ID needed -->
          <div class="register-faq" v-if="'id_needed' in info.mail_in">
            <span>{{ $t('absenteeIdFaq') }}</span>
            <span>{{ info.mail_in.id_needed ? $t('yes') : $t('no') }}</span>
            <div>
              <mark-down
                style="display: inline-block"
                v-if="info.mail_in.id_explainer"
                :content="
                  `\u21b3 ` +
                  info.mail_in.id_explainer +
                  ` [${$t('absenteeMoreId')}](${info.mail_in.id_link})`
                "
              />
            </div>
          </div>

          <!-- drop-off -->
          <div class="register-faq" v-if="'dropoff' in info.mail_in">
            <span>{{ $t('absenteeDropFaq') }}</span
            ><span>{{ info.mail_in.dropoff ? $t('yes') : $t('no') }}</span>
            <div>
              <mark-down
                style="display: inline-block"
                v-if="info.mail_in.dropoff_explainer"
                :content="`\u21b3 ` + info.mail_in.dropoff_explainer"
              />
            </div>
          </div>
          <div class="register-faq" v-if="'any_reason' in info.mail_in">
            <span>{{ $t('absenteeReasonFaq') }}</span
            ><span>{{ !info.mail_in.any_reason ? $t('yes') : $t('no') }}</span>
          </div>
          <div class="register-faq" v-if="'without_notary' in info.mail_in">
            <span>{{ $t('absenteeWitnessFaq') }}</span
            ><span>{{ !info.mail_in.without_notary ? $t('yes') : $t('no') }}</span>
          </div>
        </div>
      </aside>
    </template>
    <template v-slot:image>
      <aside class="aside__container--img" :aria-label="$t('ariaSupportingImage')">
        <img
          class="aside__img"
          src="../../assets/absentee-page-group-friends-laptop-image-1.jpg"
          :alt="$t('absenteeImageAlt')"
        />
      </aside>
    </template>
  </MainContent>
</template>

<script>
import MainContent from '@/components/MainContent';
import SelectState from './SelectState';
import electionInfo from '@/data/usa-2022-midterms-info.json';
import { mapState } from 'vuex';
import MarkDown from '@/components/MarkDown/MarkDown';
import dateFormatter from '@/api/dateFormatter';
import TerritoryInfo from './TerritoryInfo';

export default {
  name: 'absentee',
  components: { TerritoryInfo, MarkDown, MainContent, SelectState },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      usaState: (state) => state.user.info?.location?.region,
      usaCode: (state) => state.user.info?.location?.region_code,
      requested: (state) => Boolean(state.user.info?.requested_early === 'midterm-2022'),
    }),
    info() {
      const code = this.usaCode?.toLowerCase() || 'unknown';
      return electionInfo[code] || { mail_in: { territory: true } };
    },
  },
  created() {},
  methods: {
    daysLeft: (dateStr) => dateFormatter.daysLeft(dateStr),
    niceDate: (dateStr) => dateFormatter.niceDate(dateStr),
    onRequested(val) {
      this.$store.commit('setRequested', val);
    },
  },
};
</script>
<style lang="scss">
@import './register';
@import 'carbon-components/scss/components/checkbox/checkbox';
</style>
