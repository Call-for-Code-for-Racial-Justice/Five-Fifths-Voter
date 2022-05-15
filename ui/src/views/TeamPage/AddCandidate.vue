<template>
  <div class="add-candidate">
    <cv-icon-button v-if="candidate.name" :icon="iconEdit" small kind="ghost" @click="actionShow" />
    <cv-button v-else :icon="iconAdd" small kind="primary" @click="actionShow"
      >Add Candidate</cv-button
    >
    <div ref="popup">
      <cv-modal
        class="add-candidate__modal"
        close-aria-label="cancel delete"
        :visible="modalVisible"
        @modal-shown="actionShown"
        @modal-hidden="actionHidden"
        @modal-hide-request="actionHideRequest"
        @after-modal-hidden="actionAfterHidden"
        @primary-click="actionAdd"
        :auto-hide-off="false"
        size="large"
      >
        <template slot="label">Add candidate</template>
        <template slot="title">Add candidate to this election</template>
        <template slot="content">
          <cv-radio-group :vertical="false">
            <cv-radio-button
              name="party"
              label="Democrat"
              value="Democrat"
              :checked="party === 'Democrat'"
              :hide-label="false"
              :label-left="true"
              v-model="party"
            />
            <cv-radio-button
              name="party"
              label="Republican"
              value="Republican"
              :checked="party === 'Republican'"
              :hide-label="false"
              :label-left="true"
              v-model="party"
            />
            <cv-radio-button
              name="party"
              label="Independent"
              value="Independent"
              :checked="party === 'Independent'"
              :hide-label="false"
              :label-left="true"
              v-model="party"
            />
          </cv-radio-group>
          <cv-text-input label="Name" v-model.trim="name"> </cv-text-input>
          <cv-text-input label="Party" v-model.trim="party"> </cv-text-input>
          <cv-text-input label="Url" v-model.trim="candidateUrl"> </cv-text-input>
          <cv-text-input label="Twitter" v-model.trim="twitter"> </cv-text-input>
          <cv-text-input label="Facebook" v-model.trim="facebook"> </cv-text-input>
          <cv-text-input label="Phone" v-model.trim="phone"> </cv-text-input>
          <cv-text-input label="Email" v-model.trim="email"> </cv-text-input>
        </template>
        <template slot="secondary-button">Cancel</template>
        <template slot="primary-button">Save</template>
      </cv-modal>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { AddAlt16, Edit16 } from '@carbon/icons-vue';
import readableId from '@/api/base58id';

export default {
  name: 'AddCandidate',
  components: {},
  props: {
    candidate: {
      type: Object,
      default: () => {
        return {
          name: '',
          party: '',
          candidateUrl: '',
          twitter: '',
          facebook: '',
          phone: '',
          email: ''
        };
      }
    },
    contest: { type: Object, required: true }
  },
  data: () => ({
    iconAdd: AddAlt16,
    iconEdit: Edit16,
    modalVisible: false,
    modalEl: null,
    loading: false,

    // inputs
    name: '',
    party: '',
    candidateUrl: '',
    twitter: '',
    facebook: '',
    phone: '',
    email: ''
  }),
  computed: {
    ...mapState({
      currentTeam: state => state.teams.current
    })
  },
  async created() {
    this.name = this.candidate.name;
    this.party = this.candidate.party;
    this.candidateUrl = this.candidate.candidateUrl;
    this.twitter = this.candidate.twitter || '';
    this.facebook = this.candidate.facebook || '';
    this.phone = this.candidate.phone;
    this.email = this.candidate.email;
  },
  beforeDestroy() {
    // move back to where it came from
    if (this.modalEl) {
      this.$el.appendChild(this.modalEl);
    }
  },
  methods: {
    actionShow() {
      // move popup out to body to ensure it behaves nicely
      if (!this.modalEl) {
        this.modalEl = document.body.appendChild(this.$refs.popup);
        setTimeout(() => (this.modalVisible = true), 100);
      } else this.modalVisible = true;
    },
    actionShown() {
      this.modalVisible = true;
    },
    actionHidden() {
      this.modalVisible = false;
    },
    actionHideRequest() {
      // console.log('actionHideRequest')
    },
    actionAfterHidden() {
      if (!this.candidate.id) {
        this.name = '';
        this.party = '';
        this.candidateUrl = '';
        this.twitter = '';
        this.facebook = '';
        this.phone = '';
        this.email = '';
      }
    },
    async actionAdd() {
      this.loading = true;

      let payload = {
        contest: this.contest,
        candidate: {
          id: this.candidate.id || readableId(5),
          name: this.name,
          party: this.party,
          candidateUrl: this.candidateUrl,
          twitter: this.twitter,
          facebook: this.facebook,
          phone: this.phone,
          email: this.email
        }
      };
      const resp = await this.$store.dispatch('addCandidateContest', payload);

      this.loading = false;

      if (resp) this.modalVisible = false;
    }
  }
};
</script>

<style lang="scss">
@import '~@/styles/theme';
@import 'carbon-components/scss/components/button/button';
@import 'carbon-components/scss/components/modal/modal';
@import 'carbon-components/scss/components/text-input/text-input';

.add-candidate {
  &__modal {
    padding-bottom: 2rem;
  }
}
</style>
