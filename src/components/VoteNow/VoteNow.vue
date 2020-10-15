<template>
  <MainContent>
    <template v-slot:content>
      <aside class="aside">
        <div class="aside__container--text">
          <h2 class="aside__header">Candidates, Deadlines and Resources</h2>
          <cv-dropdown
            class="cv-dropdown"
            placeholder="Choose your state for information"
            @change="onChange($event)"
          >
            <cv-dropdown-item value="alabama">Alabama</cv-dropdown-item>
            <cv-dropdown-item value="alaska">Alaska</cv-dropdown-item>
            <cv-dropdown-item value="arizona">Arizona</cv-dropdown-item>
            <cv-dropdown-item value="arkansas">Arkansas</cv-dropdown-item>
            <cv-dropdown-item value="california">California</cv-dropdown-item>
            <cv-dropdown-item value="colorado">Colorado</cv-dropdown-item>
            <cv-dropdown-item value="connecticut">Connecticut</cv-dropdown-item>
            <cv-dropdown-item value="delaware">Delaware</cv-dropdown-item>
            <cv-dropdown-item value="district-of-columbia"
              >District of Columbia</cv-dropdown-item
            >
            <cv-dropdown-item value="florida">Florida</cv-dropdown-item>
            <cv-dropdown-item value="georgia">Georgia</cv-dropdown-item>
            <cv-dropdown-item value="hawaii">Hawaii</cv-dropdown-item>
            <cv-dropdown-item value="idaho">Idaho</cv-dropdown-item>
            <cv-dropdown-item value="illinois">Illinois</cv-dropdown-item>
            <cv-dropdown-item value="indiana">Indiana</cv-dropdown-item>
            <cv-dropdown-item value="iowa">Iowa</cv-dropdown-item>
            <cv-dropdown-item value="kansas">Kansas</cv-dropdown-item>
            <cv-dropdown-item value="kentucky">Kentucky</cv-dropdown-item>
            <cv-dropdown-item value="louisiana">Louisiana</cv-dropdown-item>
            <cv-dropdown-item value="maine">Maine</cv-dropdown-item>
            <cv-dropdown-item value="maryland">Maryland</cv-dropdown-item>
            <cv-dropdown-item value="massachusetts"
              >Massachusetts</cv-dropdown-item
            >
            <cv-dropdown-item value="michigan">Michigan</cv-dropdown-item>
            <cv-dropdown-item value="minnesota">Minnesota</cv-dropdown-item>
            <cv-dropdown-item value="mississippi">Mississippi</cv-dropdown-item>
            <cv-dropdown-item value="missouri">Missouri</cv-dropdown-item>
            <cv-dropdown-item value="montana">Montana</cv-dropdown-item>
            <cv-dropdown-item value="nebraska">Nebraska</cv-dropdown-item>
            <cv-dropdown-item value="nevada">Nevada</cv-dropdown-item>
            <cv-dropdown-item value="new-hampshire"
              >New Hampshire</cv-dropdown-item
            >
            <cv-dropdown-item value="new-jersey">New Jersey</cv-dropdown-item>
            <cv-dropdown-item value="new-mexico">New Mexico</cv-dropdown-item>
            <cv-dropdown-item value="new-york">New York</cv-dropdown-item>
            <cv-dropdown-item value="north-carolina"
              >North Carolina</cv-dropdown-item
            >
            <cv-dropdown-item value="north-dakota"
              >North Dakota</cv-dropdown-item
            >
            <cv-dropdown-item value="ohio">Ohio</cv-dropdown-item>
            <cv-dropdown-item value="oklahoma">Oklahoma</cv-dropdown-item>
            <cv-dropdown-item value="oregon">Oregon</cv-dropdown-item>
            <cv-dropdown-item value="pennsylvania"
              >Pennsylvania</cv-dropdown-item
            >
            <cv-dropdown-item value="rhode-island"
              >Rhode Island</cv-dropdown-item
            >
            <cv-dropdown-item value="south-carolina"
              >South Carolina</cv-dropdown-item
            >
            <cv-dropdown-item value="south-dakota"
              >South Dekota</cv-dropdown-item
            >
            <cv-dropdown-item value="tennessee">Tennessee</cv-dropdown-item>
            <cv-dropdown-item value="texas">Texas</cv-dropdown-item>
            <cv-dropdown-item value="utah">Utah</cv-dropdown-item>
            <cv-dropdown-item value="vermont">Vermont</cv-dropdown-item>
            <cv-dropdown-item value="virginia">Virginia</cv-dropdown-item>
            <cv-dropdown-item value="washington">Washington</cv-dropdown-item>
            >
            <cv-dropdown-item value="west-virginia"
              >West Virginia</cv-dropdown-item
            >
            <cv-dropdown-item value="wisconsin">Wisconsin</cv-dropdown-item>
            <cv-dropdown-item value="wyoming">Wyoming</cv-dropdown-item>
          </cv-dropdown>
          <div v-if="displayDialog" class="bx--modal-container">
            <div tabindex="0" class="cv-modal__before-content"></div>
            <div class="bx--modal-header">
              Acceptable IDs
            </div>
            <div class="bx--modal-content">
              <p style>
                <cv-list style="padding-left: 30px" class="list">
                  <cv-list-item class="list-item"
                    >Any valid state or federal government issued photo ID,
                    including a free ID Card issued by your county registrar's
                    office or the Department of Driver Services (DDS)
                  </cv-list-item>
                  <cv-list-item class="list-item"
                    >A state issued driver's license, even if expired
                  </cv-list-item>
                  <cv-list-item class="list-item"
                    >Valid employee photo ID from any branch, department,
                    agency, or entity of the U.S. Government, state, or any
                    county, municipality, board, authority or other entity of
                    this state
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
                    >Many student IDs are also acceptable
                  </cv-list-item>
                </cv-list>
              </p>
            </div>
            <div class="bx--modal-footer">
              <button
                role="button"
                class="cv-button bx--btn bx--btn--primary"
                type="button"
                @click="showSofSSite"
              >
                State Specific Voting Info
              </button>
              <!--
              <button
                role="button"
                class="cv-button bx--btn bx--btn--secondary"
                type="button"
                @click="showTool"
              >
                Show Polling Location
              </button>-->
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
import router from '../../router';

export default {
  name: 'votenow',
  components: { MainContent },
  data() {
    return {
      stateName: '',
      //links: links,
      displayDialog: false
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
      window.open('https://www.vote411.org/' + this.stateName, '_blank');
    },
    showTool() {
      window.open('https://tool.votinginfoproject.org', '_blank');
    }
  },
  mounted() {},
  updated() {}
};
</script>
