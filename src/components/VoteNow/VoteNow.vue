<template>
  <MainContent>
    <template v-slot:content>
      <aside class="aside">
        <div class="aside__container--text">
          <h2 class="aside__header">
            Candidates, deadlines and signups, oh my!
          </h2>
          <h4>What IDs are Acceptable in Georgia</h4>
          <cv-list class="list">
            <cv-list-item class="list-item"
              >Any valid state or federal government issued photo ID, including
              a free ID Card issued by your county registrar's office or the
              Georgia Department of Driver Services (DDS)
            </cv-list-item>
            <cv-list-item class="list-item"
              >A Georgia Driver's License, even if expired
            </cv-list-item>
            <cv-list-item class="list-item"
              >Valid employee photo ID from any branch, department, agency, or
              entity of the U.S. Government, Georgia, or any county,
              municipality, board, authority or other entity of this state
            </cv-list-item>
            <cv-list-item class="list-item"
              >Valid U.S. passport ID
            </cv-list-item>
            <cv-list-item class="list-item"
              >Valid U.S. military photo ID
            </cv-list-item>
            <cv-list-item class="list-item"
              >Valid tribal photo ID
            </cv-list-item>
            <cv-list-item class="list-item"
              >Many student IDs are also acceptable. (visit the GA Secretary of
              State site for details)
            </cv-list-item>
          </cv-list>
          <cv-link
            href="https://sos.ga.gov/index.php/elections/georgia_voter_identification_requirements2"
          >
            GA Secretary of State site
          </cv-link>
          <cv-button v-if="showButton" @click="showtool">
            Show Polling Location
          </cv-button>
        </div>
      </aside>
    </template>
    <template v-slot:image>
      <aside class="aside__container--img">
        <img
          class="aside__image"
          src="../../assets/vote-now-page-man-stoic-image-1.jpeg"
          alt="Man looking stoicly away from the camera"
        />
      </aside>
    </template>
  </MainContent>
</template>

<script>
import MainContent from '../../components/MainContent';
import Vue from 'vue';
import router from '../../router';
import LoadScript from 'vue-plugin-load-script';
Vue.use(LoadScript);

export default {
  name: 'votenow',
  components: { MainContent },
  data() {
    return {
      showButton: true
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
          this.showButton = false;
          eval(`
	        		console.log("loading");
							vit.load({
							    modal: true,
							    officialOnly: false,
							    title: 'five/fifths voter - Go Vote',						
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
    //this.showtool();
  },
  updated() {
    //this.showtool();
  }
};
</script>
