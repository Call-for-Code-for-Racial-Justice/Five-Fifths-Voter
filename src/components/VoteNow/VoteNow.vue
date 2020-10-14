<template>
  <MainContent>
    <template v-slot:content>
      <aside class="aside">
        <div class="aside__container--text">
          <h2 class="aside__header">
            Candidates, deadlines and signups, oh my!
          </h2>
          <cv-dropdown
            class="cv-dropdown"
            placeholder="Choose your state"
            @change="onChange($event)"
          >
            <cv-dropdown-item value="California">California</cv-dropdown-item>
            <cv-dropdown-item value="Georgia">Georgia</cv-dropdown-item>
            <cv-dropdown-item value="Texas">Texas</cv-dropdown-item>
          </cv-dropdown>
          <div
            v-if="displayDialog"
            style="margin-top: 40px; width: 100%"
            class="bx--modal-container"
          >
            <div tabindex="0" class="cv-modal__before-content"></div>
            <div class="bx--modal-header">Acceptable IDs</div>
            <div class="bx--modal-content">
              <p style>
                <cv-list style="padding-left: 30px" class="list">
                  <cv-list-item class="list-item"
                    >Any valid state or federal government issued photo ID,
                    including a free ID Card issued by your county registrar's
                    office or the {{ stateName }} Department of Driver Services
                    (DDS)
                  </cv-list-item>
                  <cv-list-item class="list-item"
                    >A {{ stateName }} Driver's License, even if expired
                  </cv-list-item>
                  <cv-list-item class="list-item"
                    >Valid employee photo ID from any branch, department,
                    agency, or entity of the U.S. Government, {{ stateName }},
                    or any county, municipality, board, authority or other
                    entity of this state
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
                    >Many student IDs are also acceptable. (visit the
                    {{ stateName }}
                    Secretary of State site for details)
                  </cv-list-item>
                </cv-list>
              </p>
            </div>
            <div class="bx--modal-footer">
              <button
                role="button"
                class="cv-button bx--btn bx--btn--secondary"
                type="button"
                @click="showSofSSite"
              >
                Secretary of State Site</button
              ><button
                role="button"
                class="cv-button bx--btn bx--btn--primary"
                type="button"
                @click="showTool"
              >
                Show Polling Location
              </button>
            </div>
            <div tabindex="0" class="cv-modal__after-content"></div>
          </div>
        </div>
      </aside>
    </template>
    <template v-slot:image>
      <aside class="aside__container--img">
        <img
          class="aside__image"
          src="../../assets/vote-now-black-man-red-flower-1515201899114-98ba64d41df7.jpeg"
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

var links = {
  Georgia:
    'https://sos.ga.gov/index.php/elections/georgia_voter_identification_requirements2',
  Texas:
    'https://www.sos.state.tx.us/elections/forms/id/poster-11x17-aw-voter.pdf',
  California:
    'https://www.sos.ca.gov/elections/voting-resources/voting-california/what-bring',
};
Vue.use(LoadScript);
export default {
  name: 'votenow',
  components: { MainContent },
  data() {
    return {
      stateName: '',
      links: links,
      displayDialog: false,
    };
  },
  
  created() {
    this.regData = this.$route.params.regData;
  },
  methods: {
    navigate() {
      router.go(-1);
    },
    onChange(event) {
      this.stateName = event;
      this.displayDialog = true;
    },
    showSofSSite() {
      window.open(this.links[this.stateName], '_blank');
    },
    showTool() {
      window.open('https://tool.votinginfoproject.org', '_blank');
      /*      Vue.loadScript('https://tool.votinginfoproject.org/app.js')
        .then(() => {
          // Script is loaded, show the tool
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
      */
    },
  },
  mounted() {
    //this.showtool();
  },
  updated() {
    //this.showtool();
  },
};
</script>
