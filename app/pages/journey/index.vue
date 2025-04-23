<script setup>
import { isUserRegistered, isUserRequestedBallot } from "~/composables/user";
import navBallotReturnUrl from "~/assets/images/ballot-return-image-1.jpg";
import navRegisterUrl from "~/assets/images/journey/elderly-lady-glasses.jpg";
import navMailUrl from "~/assets/images/journey/absentee-page-group-friends-laptop.jpg";
import navInformedUrl from "~/assets/images/vote-now-black-man-red-flower-1515201899114-98ba64d41df7.jpeg";
import navVoteUrl from "~/assets/images/journey/grandpa-grandson.jpeg";
const user = useUser();
onMounted(() => {
  loadApproxLocation();
});
</script>

<template>
  <div class="mt-32 flex flex-row items-center justify-center">
    <div>
      <div class="current-location">
        {{
          $t("journeyPageElectionState", {
            state: user?.info?.location?.region,
          })
        }}
      </div>
      <JourneySelectState />
      <cv-grid kind="wide">
        <cv-row class="my-8">
          <cv-column
            :lg="5"
            :sm="2"
          >
            <NavCard
              :title="$t('journeyPageRegisteredLabel')"
              :image-src="navRegisterUrl"
              to="/journey/register"
              :checked="isUserRegistered()"
            />
          </cv-column>
          <cv-column
            :lg="5"
            :sm="2"
          >
            <NavCard
              :title="$t('journeyPageBallotLabel')"
              :image-src="navMailUrl"
              to="/journey/mailInBallot"
              :checked="isUserRequestedBallot()"
            />
          </cv-column>
          <cv-column
            :lg="5"
            :sm="2"
          >
            <NavCard
              :title="$t('journeyPageGetInformedLabel')"
              :image-src="navInformedUrl"
              to="/journey/getInformed"
            />
          </cv-column>
          <cv-column
            :lg="0"
            :sm="2"
          >
            <NavCard
              :title="$t('journeyPageVoteNowLabel')"
              :image-src="navVoteUrl"
              to="/journey/voteInPerson"
            />
          </cv-column>
        </cv-row>
        <cv-row>
          <cv-column :lg="2" />
          <cv-column
            :lg="5"
            :sm="0"
          >
            <NavCard
              :title="$t('journeyPageVoteNowLabel')"
              :image-src="navVoteUrl"
              to="/journey/voteInPerson"
            />
          </cv-column>
          <cv-column
            :lg="5"
            :sm="2"
          >
            <NavCard
              :title="$t('journeyPageDeliverLabel')"
              :image-src="navBallotReturnUrl"
              image-class="object-[0_39%]"
              to="/journey/ballotReturn"
            />
          </cv-column>
        </cv-row>
      </cv-grid>
    </div>
  </div>
</template>
