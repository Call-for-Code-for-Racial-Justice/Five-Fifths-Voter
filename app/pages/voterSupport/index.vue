<script setup lang="ts">
</script>

<template>
  <div>
    <PageTitle>
      {{ $t("supportTitle") }}
    </PageTitle>
    <div class="flex items-center justify-center p-4">
      <div class="card bg-base-200 card-lg md:max-w-1/2 shadow-sm">
        <div class="card-body">
          <h2 class="card-title">General Resources</h2>
          <VoterSupportLink
              href="https://www.empowerline.org/services/transportation-options/"
          >
            {{ $t("supportSeniors") }}
          </VoterSupportLink>
          <VoterSupportLink
              href="https://www.ymca.org/find-your-y?distance=175&lat=26.0517448&lng=-80.13727569999999&geolocation_geocoder_address=33004&type=branch"
          >
            {{ $t("supportChildCare") }}
          </VoterSupportLink>
          <VoterSupportLink
              href="https://www.npr.org/2020/08/07/900210406/the-most-important-mail-youll-ever-send-a-ballot"
          >
            {{ $t("supportMailVoting") }}
          </VoterSupportLink>
          <VoterSupportLink
              href="https://www.ncsl.org/research/elections-and-campaigns/felon-voting-rights.aspx"
          >
            {{ $t("supportFelons") }}
          </VoterSupportLink>
          <VoterSupportLink
              href="https://sos.ga.gov/index.php/elections/voters_with_disabilities"
          >
            {{ $t("supportDisabled") }}
          </VoterSupportLink>
          <h2 class="card-title">
            {{ $t("voterJourneyLAResources") }}
          </h2>
          <VoterSupportLink
              href="https://www.lavote.net/home/voting-elections/current-elections/upcoming-elections#"
          >
            {{ $t("supportLA_1") }}
          </VoterSupportLink>
          <VoterSupportLink
              href="https://clerk.lacity.org/clerk-services/elections"
          >
            {{ $t("supportLA_2") }}
          </VoterSupportLink>
        </div>
        <figure>
          <img
              src="../../assets/images/support-page-father-baby-image-1.jpg"
              alt="">
        </figure>
      </div>
    </div>
  </div>
</template>
