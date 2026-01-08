<script setup>
import navBallotReturnUrl from "~/assets/images/journey/ballot-return.jpg";
import navRegisterUrl from "~/assets/images/journey/register.jpg";
import navMailUrl from "~/assets/images/journey/absentee.jpg";
import navInformedUrl from "~/assets/images/journey/get-informed.jpg";
import navVoteUrl from "~/assets/images/journey/vote-in-person.jpg";

const deliveredBallot = useLocalStorage(LOCAL_STORAGE_KEYS.VOTER_DELIVERED_BALLOT, false);
const isInformed = useLocalStorage(LOCAL_STORAGE_KEYS.VOTER_INFORMED, false);
const requestedBallot = useLocalStorage(LOCAL_STORAGE_KEYS.VOTER_REQUESTED_BALLOT, false);
const isRegistered = useLocalStorage(LOCAL_STORAGE_KEYS.VOTER_REGISTERED, false);
const iVoted = useLocalStorage(LOCAL_STORAGE_KEYS.VOTER_VOTED, false);

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
            :checked="isInformed"
        />
        <NavCard
            :title="$t('journeyPageDeliverLabel')"
            :image-src="navBallotReturnUrl"
            image-class="object-[0_39%]"
            to="/journey/ballotReturn"
            class="md:translate-x-[calc((100%+16px)/2)]"
            :checked="deliveredBallot"
        />
            <NavCard
                :title="$t('journeyPageVoteNowLabel')"
                :image-src="navVoteUrl"
                to="/journey/voteInPerson"
                class="translate-x-1/2 md:translate-x-[calc((100%+16px)/2)]"
                :checked="iVoted"
            />
      </div>
    </div>
  </div>
</template>
