<script setup>
import navBallotReturnUrl from "~/assets/images/ballot-return-image-1.jpg";
import navRegisterUrl from "~/assets/images/journey/elderly-lady-glasses.jpg";
import navMailUrl from "~/assets/images/journey/absentee-page-group-friends-laptop.jpg";
import navInformedUrl from "~/assets/images/vote-now-black-man-red-flower-1515201899114-98ba64d41df7.jpeg";
import navVoteUrl from "~/assets/images/journey/grandpa-grandson.jpeg";

const isRegistered = useLocalStorage(LOCAL_STORAGE_KEYS.VOTER_REGISTERED, false);
const requestedBallot = useLocalStorage(LOCAL_STORAGE_KEYS.VOTER_REQUESTED_BALLOT, false);

</script>

<template>
  <div class="mt-16 flex flex-row items-center justify-center">
    <div>
      <div class="grid grid-cols-2 justify-center gap-4 md:grid-cols-3">
        <NavCard
            :title="$t('journeyPageRegisteredLabel')"
            :image-src="navRegisterUrl"
            to="/journey/register"
            :checked="isRegistered"
        />
        <NavCard
            :title="$t('journeyPageBallotLabel')"
            :image-src="navMailUrl"
            to="/journey/mailInBallot"
            :checked="requestedBallot"
        />
        <NavCard
            :title="$t('journeyPageGetInformedLabel')"
            :image-src="navInformedUrl"
            to="/journey/getInformed"
        />
        <NavCard
            :title="$t('journeyPageDeliverLabel')"
            :image-src="navBallotReturnUrl"
            image-class="object-[0_39%]"
            to="/journey/ballotReturn"
            class="md:translate-x-[calc((100%+16px)/2)]"
        />
            <NavCard
                :title="$t('journeyPageVoteNowLabel')"
                :image-src="navVoteUrl"
                to="/journey/voteInPerson"
                class="translate-x-1/2 md:translate-x-[calc((100%+16px)/2)]"
            />
      </div>
    </div>
  </div>
</template>
