<template>
  <div class="share-list">
    <cv-loading :active="loading" :overlay="true"></cv-loading>
    <div class="share-list__code">Have a code from a friend? You can load it here.</div>
    <cv-text-input
      class="share-list__input"
      lable="Code"
      v-model.trim="sharedCode"
      placeholder="Shared code (i.e. ac1B2)"
      :light="true"
    >
    </cv-text-input>
    <cv-button class="share-list__btn" :icon="iconAdd" @click="actionApply">
      Apply
    </cv-button>
    <div class="share-list__pub">
      <div class="share-list__friend">Want to share your list and tags with a friend?</div>
      <cv-icon-button
        class="share-list__share"
        :icon="iconShare"
        small
        kind="ghost"
        @click="actionShare"
        label="Share"
        :tip-position="'top'"
      />
      <div class="share-list__code" v-if="shared._id">Send this code to your friend:</div>
      <div class="share-list__copy-code" v-if="shared._id">
        <cv-code-snippet>{{ shared._id }}</cv-code-snippet>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { ShareKnowledge16, Share16 } from '@carbon/icons-vue';

export default {
  name: 'ShareList',
  components: {},
  props: {},
  data: () => ({
    iconAdd: ShareKnowledge16,
    iconShare: Share16,
    modalVisible: false,
    modalEl: null,
    loading: false,

    // inputs
    sharedCode: ''
  }),
  computed: {
    ...mapState({
      currentTeam: state => state.teams.current,
      shared: state => state.shared.shared
    })
  },
  async created() {
    this.$store.commit('loadShared');
  },
  methods: {
    async actionApply() {
      this.loading = true;
      await this.$store.dispatch('applyId', this.sharedCode);
      this.$store.commit('loadLocal');
      this.loading = false;
    },
    async actionShare() {
      this.loading = true;
      await this.$store.dispatch('shareId');
      this.loading = false;
    }
  }
};
</script>

<style lang="scss">
@import '~@/styles/theme';
@import 'carbon-components/scss/components/button/button';
@import 'carbon-components/scss/components/text-input/text-input';
@import 'carbon-components/scss/components/code-snippet/code-snippet';

.share-list {
  display: flex;
  flex-wrap: wrap;
  max-width: 30%;
  margin-top: 1rem;
  margin-bottom: 1rem;
  &__input {
    max-width: 7rem;
  }
  &__copy-code {
    max-width: 7rem;
    .bx--snippet-container {
      @include carbon--type-style('body-long-02');
    }
  }
  &__code {
    @include carbon--type-style('body-long-01');
    width: 100%;
  }
  &__pub {
    width: 100%;
  }
  &__friend {
    @include carbon--type-style('body-long-01');
    display: inline-block;
    margin-top: 1rem;
  }
  &__btn {
    margin-left: 1rem !important;
  }
  &__share {
    margin-left: 0 !important;
    margin-top: 0.5rem !important;
    .bx--assistive-text {
      transform: translate(-50%, -100%) !important;
    }
  }
}
</style>
