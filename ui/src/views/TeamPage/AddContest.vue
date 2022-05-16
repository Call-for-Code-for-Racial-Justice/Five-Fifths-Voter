<template>
  <div class="add-candidate">
    <cv-button
      v-if="contest.referendumTitle || contest.office"
      :icon="iconEdit"
      small
      kind="tertiary"
      @click="actionShow"
    >
      Edit contest
    </cv-button>
    <cv-button v-else :icon="iconAdd" small kind="primary" @click="actionShow"
      >Add Contest</cv-button
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
        size="sm"
      >
        <template slot="label">Add referendum</template>
        <template slot="title">Add referendum to this election</template>
        <template slot="content">
          <cv-radio-group :vertical="false" v-if="modalVisible">
            <cv-radio-button
              name="contestType"
              label="General"
              value="General"
              :checked="contestType === 'General'"
              :hide-label="false"
              :label-left="true"
              v-model="contestType"
            />
            <cv-radio-button
              name="contestType"
              label="Primary"
              value="Primary"
              :checked="contestType === 'Primary'"
              :hide-label="false"
              :label-left="true"
              v-model="contestType"
            />
            <cv-radio-button
              name="contestType"
              label="Referendum"
              value="Referendum"
              :checked="contestType === 'Referendum'"
              :hide-label="false"
              :label-left="true"
              v-model="contestType"
            />
          </cv-radio-group>
          <cv-text-input
            v-if="contestType === 'General' || contestType === 'Primary'"
            label="Office"
            v-model.trim="office"
            placeholder="Office title. i.e. Governor"
            ref="firstInput"
          >
          </cv-text-input>
          <cv-text-input
            v-if="contestType === 'Referendum'"
            label="Title"
            v-model.trim="referendumTitle"
            placeholder="i.e. Proposed amendment 1"
          >
          </cv-text-input>
          <cv-text-input
            v-if="contestType === 'Referendum'"
            label="Subtitle"
            v-model.trim="referendumSubtitle"
            placeholder="A longer description i.e. Shall citizens be required to ..."
          >
          </cv-text-input>
          <cv-text-input
            v-if="contestType === 'Referendum'"
            label="Url"
            v-model.trim="referendumUrl"
            placeholder="https://example.gov/Proposed-amendment-1.pdf"
          >
          </cv-text-input>
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
  name: 'AddReferendum',
  components: {},
  props: {
    contest: {
      type: Object,
      default: () => {
        return {
          type: 'General',
          office: '',
          referendumTitle: '',
          referendumSubtitle: '',
          referendumUrl: ''
        };
      }
    }
  },
  data: () => ({
    iconAdd: AddAlt16,
    iconEdit: Edit16,
    modalVisible: false,
    modalEl: null,
    loading: false,

    // inputs
    contestType: 'General',
    office: '',
    referendumTitle: '',
    referendumSubtitle: '',
    referendumUrl: ''
  }),
  computed: {
    ...mapState({
      currentTeam: state => state.teams.current
    })
  },
  async created() {
    this.syncContest();
  },
  beforeDestroy() {
    // move back to where it came from
    if (this.modalEl) {
      this.$el.appendChild(this.modalEl);
    }
  },
  methods: {
    actionShow() {
      this.syncContest();

      // move popup out to body to ensure it behaves nicely
      if (!this.modalEl) {
        this.modalEl = document.body.appendChild(this.$refs.popup);
        setTimeout(() => (this.modalVisible = true), 100);
      } else this.modalVisible = true;
    },
    actionShown() {
      this.modalVisible = true;
      this.$refs?.firstInput?.focus();
    },
    actionHidden() {
      this.modalVisible = false;
    },
    actionHideRequest() {
      // console.log('actionHideRequest')
    },
    actionAfterHidden() {
      if (!this.contest.id) {
        this.contestType = 'General';
        this.office = '';
        this.referendumTitle = '';
        this.referendumSubtitle = '';
        this.referendumUrl = '';
      }
    },
    async actionAdd() {
      this.loading = true;
      let contest;

      if (this.contestType === 'General')
        contest = {
          id: this.contest.id || readableId(5),
          type: 'General',
          office: this.office,
          candidates: this.contest.candidates || []
        };
      else
        contest = {
          id: this.contest.id || readableId(5),
          type: 'Referendum',
          referendumTitle: this.referendumTitle,
          referendumSubtitle: this.referendumSubtitle,
          referendumUrl: this.referendumUrl
        };
      await this.$store.dispatch('addContestInfo', contest);

      this.loading = false;

      this.modalVisible = false;
    },
    syncContest() {
      this.contestType = this.contest.type;
      this.office = this.contest.office;
      this.referendumTitle = this.contest.referendumTitle;
      this.referendumSubtitle = this.contest.referendumSubtitle;
      this.referendumUrl = this.contest.referendumUrl;
    }
  }
};
</script>

<style lang="scss">
@import '~@/styles/theme';
@import 'carbon-components/scss/components/button/button';
@import 'carbon-components/scss/components/modal/modal';
@import 'carbon-components/scss/components/text-input/text-input';
@import 'carbon-components/scss/components/radio-button/radio-button';
@import 'carbon-components/scss/components/tooltip/tooltip';

.add-candidate {
  &__modal {
    padding-bottom: 2rem;
  }
}
</style>
