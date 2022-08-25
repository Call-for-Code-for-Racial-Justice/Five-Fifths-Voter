<template>
  <MainContent>
    <template v-slot:content>
      <aside class="aside" :aria-label="$t('ariaRegister')">
        <div class="aside__container--text">
          <select-state />
          <cv-checkbox
            label="Already registered?"
            value="checked-registered"
            :checked="registered"
            @change="onRegistered"
          >
          </cv-checkbox>
          <!-- Check your registration -->
          <span class="register-info">
            <span>Not sure? </span>
            <cv-link :href="checkRegLink" target="_blank">check here</cv-link>
          </span>

          <h2 class="aside__header">{{ $t('registerTitle') }}</h2>

          <p class="aside__paragraph">
            {{ $t('registerDesc') }}
          </p>

          <div v-if="info.register.territory" class="register-info">
            <span
              >Do you live is a US territory? Check with your local election officials about
              voting.</span
            >
            <cv-link href="https://www.usa.gov/who-can-vote" target="_blank"
              >U.S. citizens residing in U.S. territories</cv-link
            >
            <cv-link
              href="https://en.wikipedia.org/wiki/Federal_voting_rights_in_Puerto_Rico"
              target="_blank"
              >Residents of U.S. territories do not have voting representation in the United States
              Congress</cv-link
            >
          </div>

          <!-- registration deadline -->
          <div class="register-info" v-if="info.register.deadline_in_person">
            <span
              >Registration deadline
              <span class="days-left">{{ daysLeft(info.register.deadline_in_person) }}</span>
              . ( {{ niceDate(info.register.deadline_in_person) }}) Act now!
            </span>
            <cv-link
              v-if="info.register.online_link"
              :href="info.register.online_link"
              target="_blank"
              >Register online</cv-link
            >
            or
            <cv-link v-if="info.register.mail_link" :href="info.register.mail_link" target="_blank"
              >Register by mail</cv-link
            >
          </div>

          <!-- Register day of voting -->
          <div class="register-faq" v-if="'election_day' in info.register">
            <span>Can I register to vote on election day?</span
            ><span>{{ info.register.election_day ? 'Yes' : 'No' }}</span>
          </div>

          <!-- Register online -->
          <div class="register-faq" v-if="'online' in info.register">
            <span>Can I register online?</span
            ><span>{{ info.register.online ? 'Yes' : 'No' }}</span>
          </div>

          <!-- Youth -->
          <CaliSpecial v-if="usaCode === 'ca'" />
          <div v-else-if="info.register.youth" class="register-info">
            <span>{{ info.register.youth }} </span>
            <cv-link :href="info.register.youth_link || info.register.online_link" target="_blank"
              >Register</cv-link
            >
          </div>
          <div v-else class="register-info">
            <div>Aged 17-18? You might be able to preregister to vote</div>
            <i18n path="registerYouth_3">
              <template v-slot:state>
                <cv-link
                  href="https://www.ncsl.org/research/elections-and-campaigns/preregistration-for-young-voters.aspx"
                  target="_blank"
                  >{{ $t('registerYouth_3a') }}</cv-link
                >
              </template>
            </i18n>
          </div>

          <!-- Formerly incarcerated-->
          <div class="register-info">
            <span>{{ felonText }} </span>
            <cv-link :href="felonLink" target="_blank">More information</cv-link>
          </div>
        </div>
      </aside>
    </template>
    <template v-slot:image>
      <aside class="aside__container--img" :aria-label="$t('ariaSupportingImage')">
        <img
          class="aside__image"
          src="../../assets/register-page-woman-in-sun-image-1.jpeg"
          alt="Black woman with large afro smiles and looks off camera with the sun on her."
        />
      </aside>
    </template>
  </MainContent>
</template>

<script>
import MainContent from '../../components/MainContent';
import { mapState } from 'vuex';
import SelectState from '@/views/JourneyPage/SelectState';
import CaliSpecial from '@/components/Register/CaliSpecial';
import electionInfo from '@/data/usa-2022-midterms-info.json';
import { DateTime } from 'luxon';

export default {
  name: 'reg',
  components: { SelectState, MainContent, CaliSpecial },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      usaState: (state) => state.user.info?.location?.region,
      usaCode: (state) => state.user.info?.location?.region_code,
      registered: (state) => Boolean(state.user.info?.registered === 'midterm-2022'),
    }),
    info() {
      const code = this.usaCode.toLowerCase();
      return electionInfo[code] || { register: { territory: true } };
    },
    checkRegLink() {
      return this.info?.register?.check_link || 'https://www.vote.org/am-i-registered-to-vote/';
    },
    felonText() {
      return this.info?.register?.felon || 'Formerly incarcerated? You may be able to vote.';
    },
    felonLink() {
      return (
        this.info?.register?.felon_link ||
        'https://www.ncsl.org/research/elections-and-campaigns/felon-voting-rights.aspx'
      );
    },
  },
  created() {
    this.$store.dispatch('getApproxLocation');
  },
  methods: {
    daysLeft(dateStr) {
      try {
        const dt = DateTime.fromFormat(dateStr, 'MM/dd/yy');
        return dt.toRelative({ unit: 'days' });
      } catch (e) {
        console.warn(e);
      }
      return dateStr;
    },
    niceDate(dateStr) {
      try {
        const dt = DateTime.fromFormat(dateStr, 'MM/dd/yy');
        return dt.toLocaleString(DateTime.DATE_MED);
      } catch (e) {
        console.warn(e);
      }
      return dateStr;
    },
    onRegistered(val) {
      this.$store.commit('setRegistered', val);
    },
  },
};
</script>

<style lang="scss">
@import './register.scss';
@import 'carbon-components/scss/components/checkbox/checkbox';
</style>
