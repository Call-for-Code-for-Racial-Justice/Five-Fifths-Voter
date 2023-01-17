<template>
  <div>
    <cv-button :icon="info" @click="actionShow">{{ $t('getInformedCong') }}</cv-button>
    <div ref="popup">
      <cv-modal
        close-aria-label="close popup"
        :visible="modalVisible"
        @modal-hidden="actionHidden"
        :auto-hide-off="false"
        size="small"
      >
        <template v-slot:title>{{ $t('getInformedCongFind') }}</template>
        <template v-slot:content>
          <div style="display: flex">
            <mark-down :content="district.instructions" />
            <img :src="district.image" :alt="$t('getInformedCongFind')" />
          </div>
        </template>
      </cv-modal>
    </div>
  </div>
</template>

<script>
import { Information16 } from '@carbon/icons-vue';
import { MarkDown } from '@/components/MarkDown';

export default {
  name: 'FindCong',
  props: { district: { type: Object, default: () => {} } },
  components: { MarkDown },
  data() {
    return {
      info: Information16,
      modalVisible: false,
      modalEl: null,
    };
  },
  methods: {
    actionShow() {
      // move popup out to body to ensure it behaves nicely
      if (!this.modalEl) {
        this.modalEl = document.body.appendChild(this.$refs.popup);
        setTimeout(() => {
          this.modalVisible = true;
        }, 1);
      } else this.modalVisible = true;
    },
    actionHidden() {
      this.modalVisible = false;
    },
  },
};
</script>

<style lang="scss">
@import 'get-informed';
</style>
