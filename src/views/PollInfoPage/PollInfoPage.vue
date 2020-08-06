<template>
  <div class="bx--grid bx--grid--full-width landing-page">
    <div class="bx--row landing-page__r2">
      <div class="bx--col-lg-16">
        <div id="_vit"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import router from '../../router';
import LoadScript from 'vue-plugin-load-script';
Vue.use(LoadScript);

export default {
  name: 'reg',
  data() {
    return {
      regData: {}
    };
  },
  created() {
    this.regData = this.$route.params.regData;
  },
  methods: {
    navigate() {
      router.go(-1);
    },
    showtool() {
      Vue.loadScript('https://tool.votinginfoproject.org/app.js')
        .then(() => {
          // Script is loaded, show the tool
          eval(`
	        		console.log("loading");
							vit.load({
							    modal: true,
							    officialOnly: false,
							    title: 'EmbRACE The Vote - Go Vote',						
							    logo: 'https://vit-logos.votinginfoproject.org/seals/ga.png',
							    colors: {
							      'header': '#9ccc66',
							      'landscapeBackgroundHeader': '#7caa66'
							    },
							    language: 'en',
							});    			
	    			`);
        })
        .catch(() => {
          // Failed to fetch script
        });
    }
  },
  mounted() {
    this.showtool();
  },
  updated() {
    this.showtool();
  }
};
</script>
