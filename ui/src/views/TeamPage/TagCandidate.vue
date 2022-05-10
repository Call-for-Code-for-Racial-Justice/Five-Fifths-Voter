<template>
  <div class="add-tags">
    <cv-icon-button :icon="iconAdd" small kind="ghost" @click="actionShow" />
    <div ref="popup">
      <cv-modal
        class="add-tags__modal"
        close-aria-label="cancel delete"
        :visible="modalVisible"
        @modal-shown="actionShown"
        @modal-hidden="actionHidden"
        @modal-hide-request="actionHideRequest"
        @after-modal-hidden="actionAfterHidden"
        @primary-click="actionAdd"
        :auto-hide-off="false"
        size="xs"
      >
        <template slot="label">Add candidate</template>
        <template slot="title">Add candidate to this election</template>
        <template slot="content">
          Hello
        </template>
        <template slot="primary-button">Close</template>
      </cv-modal>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { Tag16 } from '@carbon/icons-vue';

export default {
  name: 'TagCandidate',
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
    contest: { type: Object, required: true },
    office: { type: String, required: true },
    index: { type: Number, default: -1 }
  },
  data: () => ({
    iconAdd: Tag16,
    modalVisible: false,
    modalEl: null,
    loading: false,

    // inputs
    tags: [],
    tagInput: ''
  }),
  computed: {
    ...mapState({
      currentTeam: state => state.teams.current
    })
  },
  async created() {},
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
    actionAfterHidden() {},
    async actionAdd() {
      this.loading = true;

      let resp = true;

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

.add-tags {
  &__modal {
    padding-bottom: 2rem;
  }
}
</style>
