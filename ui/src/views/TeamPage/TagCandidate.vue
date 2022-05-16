<template>
  <div class="add-tags">
    <div class="add-tags__tags">
      <cv-tag
        v-for="tag in tags"
        :key="`tag-${tag}`"
        filter
        :kind="tag | tagColor"
        :label="tag"
        @remove="actionRemoveTag(tag)"
      ></cv-tag>
    </div>
    <cv-icon-button
      class="add-tags__btn"
      :icon="iconAdd"
      small
      kind="ghost"
      @click="actionShow"
      label="Add tags"
      :tip-position="'top'"
    />
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
        <template slot="label">Add tags</template>
        <template slot="title">Tag this candidate</template>
        <template slot="content">
          <cv-text-input
            v-model.trim="tagInput"
            placeholder="Type tags seperated by ,"
            @input="parseTags"
            @keyup.enter="parseTags((tagInput += ','))"
            ref="tagInput"
          >
          </cv-text-input>
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
    ballotItem: { type: Object, required: true }
  },
  data: () => ({
    iconAdd: Tag16,
    modalVisible: false,
    modalEl: null,
    loading: false,

    // inputs
    tagInput: ''
  }),
  computed: {
    ...mapState({
      currentTeam: state => state.teams.current,
      allTags: state => state.teams.local.tags
    }),
    tags() {
      return this.allTags
        .filter(tag => tag.candidate.id === this.candidate.id)
        .map(tag => tag.label);
    }
  },
  mounted() {},
  async created() {},
  beforeDestroy() {
    // move back to where it came from
    if (this.modalEl) {
      this.$el.appendChild(this.modalEl);
    }
  },
  filters: {
    tagColor(val) {
      const colors = [
        'red',
        'magenta',
        'purple',
        'blue',
        'cyan',
        'teal',
        'green',
        'gray',
        'cool-gray',
        'warm-gray',
        'high-contrast'
      ];
      let index = val.charCodeAt(0) % colors.length;
      return colors[index];
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
      this.$refs?.tagInput?.focus();
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
    },
    parseTags(val) {
      const tags = val.split(',');
      if (tags.length > 1) {
        tags.forEach(tag => {
          if (tag) this.$store.dispatch('addTag', { label: tag.trim(), candidate: this.candidate });
        });
        this.tagInput = '';
      }
    },
    actionRemoveTag(ev) {
      const list = this.allTags.filter(tag => tag.candidate.id === this.candidate.id);
      const tag = list.find(tag => tag.label === ev);
      if (tag) this.$store.dispatch('removeTag', tag);
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
  &__btn {
    .bx--assistive-text {
      transform: translate(-50%, -100%) !important;
    }
  }
  &__tags {
    display: flex;
    flex-wrap: wrap;
    max-width: 20rem;
  }
}
</style>
