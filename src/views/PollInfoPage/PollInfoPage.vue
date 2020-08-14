<template>
  <cv-content id="#main-content">
    <div class="bx--grid bx--grid--full-width landing-page">
      <div class="bx--row landing-page__r2">
        <div class="bx--col-lg-16">
          <section class="main main--polls">
            <aside class="poll-info">
              <h1 class="heading--lg">
                candidates, and deadlines and signups, oh my!
              </h1>
              <h4 class="heading--sm">
                we understand, voting isn't always cut and dry.
              </h4>
              <p>
                First things first:
                <br />
                <br />three things you need to know.
                <br />
                <br />Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                ullamco laboris nisi ut aliquip ex ea commodo consequat.orem
                ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. orem ipsum dolor sit
                amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat.
              </p>
            </aside>
            <div id="_vit"></div>
          </section>
        </div>
      </div>
    </div>
  </cv-content>
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
