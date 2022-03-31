topic
<template>
  <div class="create-team">
    <cv-button small kind="tertiary" @click="actionShow">Create Team</cv-button>
    <div ref="popup">
      <cv-modal
        close-aria-label="cancel"
        :visible="modalVisible"
        :primary-button-disabled="!ready"
        @modal-shown="actionShown"
        @modal-hidden="actionHidden"
        @primary-click="actionCreate"
        :auto-hide-off="false"
      >
        <template slot="label">A space where you can collaborate with your election team</template>
        <template slot="title">Create new team</template>
        <template slot="content">
          <cv-text-input label="Title" v-model.trim="title" @input="pathTitle"> </cv-text-input>
          <cv-text-input label="Description" v-model.trim="description"> </cv-text-input>
          <cv-text-input
            label="Path"
            v-model.trim="path"
            @input="validatePath"
            :invalid-message="invalidPath"
          >
          </cv-text-input>
          <div>{{ displayPath }}</div>
        </template>
        <template slot="secondary-button">Cancel</template>
        <template slot="primary-button">Create</template>
      </cv-modal>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import teamApi from '../../api/team-api';

export default {
  name: 'CreateTeam',
  components: {},
  props: {
    team: { type: Object, required: false }
  },
  data: () => ({
    modalVisible: false,
    modalEl: null,

    // inputs
    title: '',
    description: '',
    path: '',

    // validation messages
    invalidPath: ''
  }),
  beforeDestroy() {
    // move back to where it came from
    if (this.modalEl) {
      this.$el.appendChild(this.modalEl);
    }
  },
  computed: {
    ...mapState({
      userName: state => state.user.info.name
    }),
    displayPath() {
      var loc = window.location;
      var path = this.path || '(enter a path)';
      return `${loc.protocol}//${loc.host}/#/team/${path}`;
    },
    ready() {
      return this.title && this.description && this.path;
    }
  },
  methods: {
    actionShow() {
      // reset form
      this.title = '';
      this.description = '';
      this.path = '';

      // move popup out to body to ensure it behaves nicely
      if (!this.modalEl) {
        this.modalEl = document.body.appendChild(this.$refs.popup);
      }
      this.modalVisible = true;
    },
    actionShown() {
      this.modalVisible = true;
    },
    actionHidden() {
      this.modalVisible = false;
    },
    async actionCreate() {
      let available = await teamApi.isAvailable(this.path);
      if (!available) this.invalidPath = 'that path is taken. Choose something else.';
      else {
        this.invalidPath = '';
        let result = await teamApi.create({
          display_name: this.title,
          description: this.description,
          slug: this.path
        });

        if (result && result.ok) {
          this.modalVisible = false;
          this.$router.push({ name: 'team', params: { teamId: result.doc._id } });
        }
      }
    },

    /**
     * @param title: string
     */
    pathTitle(title) {
      this.validatePath(title);
    },

    /**
     * @param title: string
     */
    validatePath(path) {
      this.path = path
        .trim()
        .toLowerCase()
        .replaceAll(/[^a-zA-Z0-9-]/g, '-')
        .replaceAll(/[-]+/g, '-')
        .replaceAll(/[^a-zA-Z0-9]+$/g, '');
    }
  }
};
</script>

<style lang="scss">
@import '@/styles/theme';
@import 'carbon-components/scss/components/button/button';
@import 'carbon-components/scss/components/modal/modal';
// .create-team {
// }
</style>
