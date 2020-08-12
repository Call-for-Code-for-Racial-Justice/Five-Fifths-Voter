<template>
  <cv-content id="#main-content">
    <iframe
      v-resize="{ log: true }"
      src="https://register.vote.org/?partner=111111&campaign=free-tools"
      width="100%"
      marginheight="0"
      frameborder="0"
      id="frame1"
      scrollable="no"
    ></iframe>
  </cv-content>
</template>

<script>
import router from '../../router';

export default {
  name: 'reg',
  data() {
    return {
      regData: {},
    };
  },
  created() {
    this.regData = this.$route.params.regData;
  },
  methods: {
    navigate() {
      router.go(-1);
    },
  },
};
</script>