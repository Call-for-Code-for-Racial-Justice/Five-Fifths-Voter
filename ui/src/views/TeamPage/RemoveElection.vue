<template>
  <div class="remove-member">
    <cv-button
      :icon="iconTrash"
      small
      kind="ghost"
      class="remove-member__danger"
      @click="actionShowDelete"
    ></cv-button>
    <div ref="popup">
      <cv-modal
        close-aria-label="cancel delete"
        kind="danger"
        :visible="modalVisible"
        @modal-shown="actionShown"
        @modal-hidden="actionHidden"
        @modal-hide-request="actionHideRequest"
        @after-modal-hidden="actionAfterHidden"
        @primary-click="actionRemove"
        :auto-hide-off="false"
        size="xs"
      >
        <template slot="label">{{ election.name }}</template>
        <template slot="title">Remove this election</template>
        <template slot="content"
          ><p>
            The election &quot;{{ election.name }}&quot; and all associated contests will be
            deleted. This cannot be undone
          </p>
        </template>
        <template slot="secondary-button">Cancel</template>
        <template slot="primary-button">Remove</template>
      </cv-modal>
    </div>
  </div>
</template>

<script>
import { TrashCan16 } from '@carbon/icons-vue';
export default {
  name: 'RemoveElection',
  components: {},
  props: {
    election: { type: Object, required: false }
  },
  data: () => ({
    iconTrash: TrashCan16,
    modalVisible: false,

    errorDetails: '',
    errorVisible: false,
    modalEl: null,

    deleted: false
  }),
  beforeDestroy() {
    // move back to where it came from
    if (this.modalEl) {
      this.$el.appendChild(this.modalEl);
    }
  },
  computed: {},
  methods: {
    actionShowDelete() {
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
    async actionAfterHidden() {
      // delete here so the modal does not get disrupted by the data getting removed while it is showing
      if (this.deleted) {
        await this.$store.dispatch('removeTeamElection', this.election);
      }
    },
    actionRemove() {
      this.deleted = true;
      this.modalVisible = false;
    }
  }
};
</script>

<style lang="scss">
@import '@/styles/theme';
@import 'carbon-components/scss/components/button/_button';
@import 'carbon-components/scss/components/modal/modal';
.remove-member {
  // danger--tertiary does not work correctly - not sure why
  &__danger {
    color: #da1e28 !important;
  }
  &__danger:hover {
    color: white !important;
    background-color: #da1e28 !important;
  }
}
</style>
