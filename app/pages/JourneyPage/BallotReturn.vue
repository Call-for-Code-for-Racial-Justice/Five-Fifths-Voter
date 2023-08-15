<template>
  <MainContent>
    <template v-slot:content>
      <aside class="aside" :aria-label="$t('ariaWhere')">
        <div class="aside__container--text">
          <select-state />

          <h2 class="aside__header">{{ $t('ballotTitle') }}</h2>

          <!-- Return deadline -->
          <div
            class="journey-info__deadline"
            style="margin-top: 1rem"
            v-if="info.mail_in.return_deadline"
          >
            <mark-down
              :content="
                $t('absenteeReturn', {
                  date: niceDate(info.mail_in.return_deadline),
                  days: daysLeft(info.mail_in.return_deadline),
                })
              "
            />
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

          <!-- State link -->
          <div v-if="info.mail_in.track_link" class="register-info">
            <mark-down :content="$t('absenteeTrack', { trackUrl: info.mail_in.track_link })" />
          </div>

          <!-- State link -->
          <div v-if="info.mail_in.more_link" class="register-info">
            <mark-down :content="$t('absenteeMoreInfo', { moreUlrl: info.mail_in.more_link })" />
          </div>
        </div>
      </aside>
    </template>
    <template v-slot:image>
      <aside class="aside__container--img" :aria-label="$t('ariaSupportingImage')">
        <img class="aside__image" src="../../assets/ballot-return-image-1.jpg" alt="Sideimage" />
      </aside>
    </template>
  </MainContent>
</template>

<script>
import MainContent from '../../components/MainContent';
import SelectState from '@/views/JourneyPage/SelectState';
import MarkDown from '@/components/MarkDown/MarkDown';
import electionInfo from '@/data/usa-2024.json';
import { mapState } from 'vuex';
import dateFormatter from '@/api/dateFormatter';

export default {
  name: 'BallotReturn',
  components: { MainContent, SelectState, MarkDown },
  data() {
    return {};
  },
  created() {},
  computed: {
    ...mapState({
      usaState: (state) => state.user.info?.location?.region,
      usaCode: (state) => state.user.info?.location?.region_code,
      requested: (state) => Boolean(state.user.info?.requested_early === 'presidential-2024'),
    }),
    info() {
      const code = this.usaCode?.toLowerCase() || 'unknown';
      return electionInfo[code] || { mail_in: { territory: true } };
    },
  },
  mounted() {},
  methods: {
    daysLeft: (dateStr) => dateFormatter.daysLeft(dateStr),
    niceDate: (dateStr) => dateFormatter.niceDate(dateStr),
  },
};
</script>
<style lang="scss">
@import './ballotreturn';
</style>
