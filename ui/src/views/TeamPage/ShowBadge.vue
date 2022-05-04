<template>
  <div class="show-badge">
    <cv-button
      kind="ghost"
      @click="actionShow"
      class="show-badge__button"
      v-bind:class="{ 'show-badge--new': forceShow }"
    >
      <img :src="badge.image" :alt="badge.name" />
      {{ badge.name }}
    </cv-button>
    <div ref="popup">
      <cv-modal
        close-aria-label="close"
        kind="danger"
        :visible="modalVisible"
        @modal-shown="actionShown"
        @modal-hidden="actionHidden"
        @modal-hide-request="actionHideRequest"
        @after-modal-hidden="actionAfterHidden"
        :auto-hide-off="false"
        size="xs"
      >
        <template slot="label">{{ badge.name }}</template>
        <template slot="title"
          ><span v-if="!badge.seen">You earned a new badge!</span
          ><span v-else>Congratulations!</span></template
        >
        <template slot="content">
          <img :src="badge.image" :alt="badge.name" width="32" />
          <p>{{ badge.description }}</p>
        </template>
      </cv-modal>
    </div>
  </div>
</template>

<script>
import { Badge32 } from '@carbon/icons-vue';
export default {
  name: 'ShowBadge',
  components: {},
  props: {
    badge: { type: Object, required: true },
    forceShow: { type: Boolean, default: false }
  },
  data: () => ({
    iconDefault: Badge32,
    modalVisible: false,

    modalEl: null
  }),
  mounted() {
    if (this.forceShow) this.actionShow();
  },
  beforeDestroy() {
    // move back to where it came from
    if (this.modalEl) {
      this.$el.appendChild(this.modalEl);
    }
  },
  computed: {},
  methods: {
    actionShow() {
      setTimeout(() => (this.modalVisible = true), 100);
      // move popup out to body to ensure it behaves nicely
      if (!this.modalEl) {
        this.modalEl = document.body.appendChild(this.$refs.popup);
      }
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
      if (!this.badge.seen) this.$store.dispatch('badgeSeen', this.badge);
    }
  },
  watch: {
    forceShow() {
      if (this.forceShow) this.actionShow();
    }
  }
};
</script>

<style lang="scss">
@import '@/styles/theme';
@import 'carbon-components/scss/components/button/button';
@import 'carbon-components/scss/components/modal/modal';

@keyframes animated_badge {
  0% {
    transform: rotate(0deg);
    left: 0px;
  }
  25% {
    transform: rotate(20deg);
    left: 0px;
  }
  50% {
    transform: rotate(0deg);
    left: 500px;
  }
  55% {
    transform: rotate(0deg);
    left: 500px;
  }
  70% {
    transform: rotate(0deg);
    left: 500px;
    background-color: $link-inverse;
  }
  100% {
    transform: rotate(-360deg);
    left: 0px;
  }
}
.show-badge {
  zoom: 1;
  &__button {
    img {
      width: 100px;
    }
  }
  &--new {
    animation-name: animated_badge;
    animation-duration: 4s;
  }
}
</style>
