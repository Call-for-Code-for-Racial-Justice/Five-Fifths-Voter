<template>
  <div class="page__title">{{ $t("voteTitle") }}</div>
  <cv-grid :full-width="true">
    <cv-row>
      <cv-column :sm="4" :lg="8">
        <!-- this appears after user enter their address -->
        <div v-if="hasVoterInfo" class="journey-info__section">
          <journey-location-list />
          <journey-civic-data />
        </div>

        <div class="mt-4">
          <cv-select v-model="electionId" :label="$t('voteSelectElection')">
            <cv-select-option
              value=""
              :selected="true"
              :disabled="true"
              :hidden="true"
              >{{ $t("voteChooseElection") }}</cv-select-option
            >
            <cv-select-option
              v-for="elec in filteredElections"
              :key="elec.id"
              :value="elec.id"
            >
              {{ elec.name }} {{ elec.electionDay }}
            </cv-select-option>
          </cv-select>
        </div>

        <!-- address -->
        <div class="mb-2 mt-4">
          <cv-text-input
            v-model="addressValue"
            :label="$t('voteAddressLabel')"
            :hide-label="disabledAddress"
            :placeholder="placeholder"
            :disabled="disabledAddress"
          >
          </cv-text-input>
        </div>
        <cv-button
          class="bg-black"
          kind="primary"
          :disabled="buttonDisabled"
          @click="showPollingLocation"
        >
          {{ $t("votePollingLocationBtn") }}
        </cv-button>
      </cv-column>

      <!-- side image -->
      <cv-column :sm="4" :lg="8">
        <img
          class="side-image"
          src="@/assets/images/holder-atlanta-map.png"
          alt=""
        />
      </cv-column>
    </cv-row>
  </cv-grid>
</template>

<!--          <div class="journey-info__collapsable" ref="generalInfo">-->
<!--            <territory-info v-if="info.register.territory" />-->

<!--            &lt;!&ndash; Early voting start &ndash;&gt;-->
<!--            <mark-down-->
<!--              v-if="hasEarlyVotingDate"-->
<!--              class="journey-info__deadline"-->
<!--              :content="-->
<!--                $t('voteEarlyStart', {-->
<!--                  date: niceDate(info.early_voting.start_date),-->
<!--                  days: daysLeft(info.early_voting.start_date),-->
<!--                })-->
<!--              "-->
<!--            />-->
<!--            &lt;!&ndash; Early voting end &ndash;&gt;-->
<!--            <mark-down-->
<!--              v-if="hasEarlyVotingEndDate"-->
<!--              class="journey-info__deadline"-->
<!--              :content="-->
<!--                $t('voteEarlyEnd', {-->
<!--                  date: niceDate(info.early_voting.last_date),-->
<!--                  days: daysLeft(info.early_voting.last_date),-->
<!--                })-->
<!--              "-->
<!--            />-->

<!--            &lt;!&ndash; info link &ndash;&gt;-->
<!--            <mark-down-->
<!--              class="journey-info__more"-->
<!--              v-if="info.early_voting.more_link"-->
<!--              :content="`\u21b3 ` + $t('voteEarlyMore', { link: info.early_voting.more_link })"-->
<!--            />-->

<!--            &lt;!&ndash; Election day voting &ndash;&gt;-->
<!--            <mark-down-->
<!--              class="journey-info__deadline"-->
<!--              :content="-->
<!--                $t('voteElectionDay', {-->
<!--                  date: niceIsoDate(info.election_start || '2022-11-08T12:00:00.000Z'),-->
<!--                  days: daysLeftIso(info.election_start || '2022-11-08T12:00:00.000Z'),-->
<!--                })-->
<!--              "-->
<!--            />-->
<!--            <mark-down-->
<!--              v-if="showEnd"-->
<!--              class="journey-info__deadline"-->
<!--              :content="-->
<!--                $t('voteElectionDayEnd', {-->
<!--                  date: niceIsoDate(info.election_end || '2022-11-08T12:00:00.000Z'),-->
<!--                  days: daysLeftIso(info.election_end || '2022-11-08T12:00:00.000Z'),-->
<!--                })-->
<!--              "-->
<!--            />-->
<!--            <span class="register-faq" v-if="'election_day_info' in info">{{-->
<!--              `\u21b3 ` + info.election_day_info-->
<!--            }}</span>-->

<!--            <div class="register-faq-header">{{ $t('faq') }}</div>-->
<!--            &lt;!&ndash; Vote early &ndash;&gt;-->
<!--            <div class="register-faq" v-if="'available' in info.early_voting">-->
<!--              <span>{{ $t('voteEarlyAvailable') }}</span-->
<!--              ><span>{{ info.early_voting.available ? $t('yes') : $t('no') }}</span>-->
<!--            </div>-->

<!--            &lt;!&ndash; ID needed &ndash;&gt;-->
<!--            <div class="register-faq" v-if="'id_needed' in info.mail_in">-->
<!--              <span>{{ $t('voteEarlyIdNeeded') }}</span>-->
<!--              <span>{{ info.early_voting.id_needed ? $t('yes') : $t('no') }}</span>-->
<!--            </div>-->
<!--          </div>-->

<!--          <div class="wrapper wrapper&#45;&#45;address">-->

<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </aside>-->
<!--    </template>-->
<!--    <template v-slot:image>-->
<!--      <aside-->
<!--        v-if="placeholderMap"-->
<!--        class="aside__container&#45;&#45;img"-->
<!--        :aria-label="$t('ariaSupportingImage')"-->
<!--      >-->
<!--        <img class="aside__image" src="../../assets/holder-atlanta-map.png" alt="google map img" />-->
<!--      </aside>-->
<!--      <aside v-else>-->
<!--        <GoogleMap-->
<!--          class="side-map"-->
<!--          :markers="mapMarkers"-->
<!--          :home="normalizedAddressValue"-->
<!--          :key="normalizedAddressValue"-->
<!--          ref="earlyMap"-->
<!--        />-->
<!--      </aside>-->
<!--    </template>-->
<!--  </MainContent>-->
<!--</template>-->

<script setup>
// import GoogleMap from "../../components/Maps/GoogleMap";
// import electionInfo from "@/data/usa-2024.json";
// import dateFormatter from "@/api/dateFormatter";
// import MarkDown from "@/components/MarkDown/MarkDown";
// import { DateTime } from "luxon";
// import readableId from "@/api/base58id";

// import electionInfo from "assets/data/usa-2024.json";
import { useVoterInfoStore } from "~/stores/voterInfo";
import { setVotingAddress } from "~/composables/user";

const voterInfo = useVoterInfoStore();

const user = useUser();
// const usaCode = computed(() => user.value.info?.location?.region_code);

// const info = computed(() => {
//   const code = usaCode.value?.toLowerCase() || "unknown";
//   return electionInfo[code] || { register: { territory: true } };
// });

const addressValue = ref("");
const placeholder = ref("123 Main St GA 30076");
const votingAddress = computed(() => user.value.info?.voting_address);
onMounted(() => {
  addressValue.value = votingAddress.value;
});
watch(
  () => votingAddress,
  () => {
    addressValue.value = votingAddress.value;
  },
);
const normalizedAddress = computed(() => {
  if (voterInfo.info?.normalizedInput) {
    const normalized = voterInfo.info.normalizedInput;
    return (
      `${normalized.line1 || ""} ${normalized.line2 || ""}`.trim() +
      ` ${normalized.city} ${normalized.state} ${normalized.zip}`
    );
  } else return "";
});
watch(normalizedAddress, () => {
  if (normalizedAddress) {
    addressValue.value = normalizedAddress.value;
    setVotingAddress(normalizedAddress.value);
  }
});
const disabledAddress = computed(() => {
  return !electionId.value;
});

// Election selection
/**
 *
 * @type {Ref<UnwrapRef<string>>}
 */
const electionId = ref("");
const buttonDisabled = computed(() => {
  return !electionId.value || addressValue.value.length < 10;
});

/** @type Ref<UnwrapRef<CivicElectionsData>> */
const electionData = useElectionData();
const filteredElections = computed(() => {
  // TODO: filter based on name instead. Exclude "test"
  // return elections.value.filter((item) => item.id !== "2000");
  return electionData.value.elections;
});
watch(filteredElections, () => {
  if (filteredElections.value?.length === 1)
    electionId.value = filteredElections.value[0].id;
});
function showPollingLocation() {
  document.activeElement.blur();
  // loadVoterData(addressValue.value, electionId.value);
  voterInfo.fetch(addressValue.value, electionId.value);
}
const hasVoterInfo = computed(() => !!voterInfo.info?.state);

// created() {
//   this.loading = true;
//   this.axiosInstance = axios.create({
//     baseURL: window.location.hostname === "localhost" ? "/services" : "/",
//   });
//   this.axiosInstance
//     .get("/elections")
//     .then((response) => {
//       this.elections = response.data.elections;
//     })
//     .catch((error) => {
//       /* eslint no-console: 0 */
//       console.error(error);
//     })
//     .finally(() => {
//       this.loading = false;
//     });
//   this.actionUsaState();
// },
// watch: {
//   usaCode() {
//     this.actionUsaState();
//   },
//   elections() {
//     this.actionUsaState();
//   },

// },
// computed: {
//
//   electionRegistrationUrl() {
//     try {
//       return this.voterData.state[0].electionAdministrationBody
//         .electionRegistrationUrl;
//     } catch (error) {
//       return "";
//     }
//   },
//   electionRegistrationConfirmationUrl() {
//     try {
//       return this.voterData.state[0].electionAdministrationBody
//         .electionRegistrationConfirmationUrl;
//     } catch (error) {
//       return "";
//     }
//   },
//
//   votingLocationFinderUrl() {
//     try {
//       return this.voterData.state[0].electionAdministrationBody
//         .votingLocationFinderUrl;
//     } catch (error) {
//       return "";
//     }
//   },
//   ballotInfoUrl() {
//     try {
//       return this.voterData.state[0].electionAdministrationBody.ballotInfoUrl;
//     } catch (error) {
//       return "";
//     }
//   },
//   placeholderMap() {
//     return this.mapMarkers.length === 0;
//   },
//
//   locationList() {
//     try {
//       const electionDate = DateTime.fromISO(
//         this.info.election_start || "2022-11-08T12:00:00.000Z",
//       );
//       const preferEarly = Date.now() < electionDate.toMillis();
//
//       let locations = [];
//       if (preferEarly && "earlyVoteSites" in this.voterData)
//         locations = this.voterData.earlyVoteSites;
//       else if ("pollingLocations" in this.voterData)
//         locations = this.voterData.pollingLocations;
//       else if ("dropOffLocations" in this.voterData)
//         locations = this.voterData.dropOffLocations;
//
//       return locations.filter((item) => {
//         return (
//           !item.address.electionName ||
//           item.address.electionName === this.electionName
//         );
//       });
//     } catch (error) {
// console.error(error);
// return null;
// }
// },
// mapMarkers() {
//   const list = [];
//   try {
//     let index = 0;
//     const locations = this.locationList;
//
//     while (index < locations.length) {
//       const item = locations[index];
//       let dir_address = "";
//
//       if (!item.latitude || !item.longitude) {
//         if (item.address.line1) dir_address += item.address.line1;
//         if (item.address.line2) dir_address += " " + item.address.line2;
//         if (item.address.line3) dir_address += " " + item.address.line3;
//         if (item.address.city) dir_address += " " + item.address.city;
//         if (item.address.state) dir_address += " " + item.address.state;
//       }
//
//       let id;
//       if (item.latitude && item.longitude)
//         id = `${item.latitude}/${item.longitude}`;
//       else id = readableId(6);
//
//       list.push({
//         id: id,
//         position: {
//           lat: item.latitude,
//           lng: item.longitude,
//           address: dir_address,
//         },
//         info: this.locationInfo(item),
//         title: item.address.locationName || "Polling Place",
//       });
//       index++;
//     }
//     return list;
//   } catch (error) {
//     console.error(error);
//     return list;
//   }
// },

// showEnd() {
//   if (!this.info.election_end) return false;
//   return dateFormatter.tooLateIso(this.info.election_start);
// },
// hasEarlyVotingDate() {
//   return !!this.info?.early_voting?.start_date;
// },
// hasEarlyVotingEndDate() {
//   return !!this.info?.early_voting?.last_date;
// },
// },
// methods: {
//   daysLeft: (dateStr) => dateFormatter.daysLeft(dateStr),
//   daysLeftIso: (dateStr) => dateFormatter.daysLeftIso(dateStr),
//   niceDate: (dateStr) => dateFormatter.niceDate(dateStr),
//   niceIsoDate: (dateStr) => dateFormatter.niceIsoDate(dateStr),
//
//   actionUsaState() {
//     const found = this.elections.find((election) =>
//       election.ocdDivisionId?.endsWith(`state:${this.usaCode}`),
//     );
//     if (found) this.electionId = found.id;
//     else this.electionId = "";
//   },
//   showPollingLocation() {
//     this.loading = true;
//     this.axiosInstance
//       .post("/pollingplace", {
//         data: {
//           address: this.addressValue,
//           electionId: this.electionId,
//         },
//       })
//       .then((response) => {
//         try {
/**
 * @typedef VoterData
 * @property {object} VoterData.normalizedInput
 */
// this.voterData = response.data;

// Get a normalized address from the result
/*
 *   "normalizedInput": {
 *     "line1": "123 Main Street",
 *     "city": "Any Town",
 *     "state": "GA",
 *     "zip": "30000"
 *   },
 */
// const addressParts = Object.values(this.voterData?.normalizedInput);
// if (addressParts?.length > 0) this.normalizedAddressValue = "";
// else this.normalizedAddressValue = this.addressValue;
//
// addressParts.forEach((element) => {
//   this.normalizedAddressValue =
//     this.normalizedAddressValue + " " + element;
// });
// this.normalizedAddressValue = this.normalizedAddressValue.trim();
// this.$store.commit("setVotingAddress", this.normalizedAddressValue);

// if (
//   this.voterData.fivefifthsdata &&
//   this.voterData.fivefifthsdata.elections
// ) {
//   const elections = this.voterData.fivefifthsdata.elections;
//   this.electionName = elections[elections.length - 1];
// }
// } catch (error) {
//   console.error(error);
// }
// })
// .catch((error) => {
//   /* eslint no-console: 0 */
//   console.error(error);
//   this.voterData = { error: true };
// })
// .finally(() => {
//   this.loading = false;
// });
// },

/**
 * Create a Google link to directions
 */
// directionsLink(item) {
//   let dir_address = "";
//   if (item.address.line1) dir_address += item.address.line1;
//   if (item.address.line2) dir_address += " " + item.address.line2;
//   if (item.address.line3) dir_address += " " + item.address.line3;
//   if (item.address.city) dir_address += " " + item.address.city;
//   if (item.address.state) dir_address += " " + item.address.state;
//   const escapedValue = encodeURIComponent(dir_address).replaceAll(
//     "%20",
//     "+",
//   );
//   return "https://www.google.com/maps/search/?api=1&query=" + escapedValue;
// },

/**
 * This is used by the map to construct an info window for each marker. Styling is mostly
 * controlled by the map api but simple things should work ok.
 */
// locationInfo(item) {
//   let info =
//     "<div><b>" +
//     (item.address.locationName || "Polling Place") +
//     "</b></div>";
//   if (item.pollingHours)
//     info += "<div><b>" + item.pollingHours + "</b></div>";
//   if (item.address.line1) info += "<div>" + item.address.line1 + "</div>";
//   if (item.address.line2) info += "<div>" + item.address.line2 + "</div>";
//   if (item.address.line3) info += "<div>" + item.address.line3 + "</div>";
//   if (item.address.city) info += "<span>" + item.address.city + "</span>";
//   if (item.address.state)
//     info += "<span> " + item.address.state + "</span>";
//
//   const dir_link = this.directionsLink(item);
//
//   info +=
//     '<div><a target="_blank" href="' + dir_link + '">Directions</a></div>';
//   return info;
// },
// },
// };
</script>

<style scoped lang="scss">
@import "@/assets/scss/theme";
@import "@/assets/scss/pages";
@import "@/assets/scss/journey";
:deep(.bx--btn--primary) {
  background-color: $ff-blue-01;
}
:deep(.bx--btn--primary:hover) {
  background-color: $ff-green-01;
}
</style>
