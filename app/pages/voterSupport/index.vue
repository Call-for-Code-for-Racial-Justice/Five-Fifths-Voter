<script setup>
</script>

<template>
  <PageInset class="text-start md:text-end">
    <PageTitle>
      {{ $t("supportTitle") }}
    </PageTitle>
    <cv-grid :full-width="true">
      <cv-row>
        <cv-column
          :sm="4"
          :lg="8"
        >
          <VoterSupportLink
            href="https://www.empowerline.org/services/transportation-options/"
          >
            {{ $t("supportSeniors") }} &rarr;
          </VoterSupportLink>
          <VoterSupportLink
            href="https://www.ymca.org/find-your-y?distance=175&lat=26.0517448&lng=-80.13727569999999&geolocation_geocoder_address=33004&type=branch"
          >
            {{ $t("supportChildCare") }} &rarr;
          </VoterSupportLink>
          <VoterSupportLink
            href="https://www.npr.org/2020/08/07/900210406/the-most-important-mail-youll-ever-send-a-ballot"
          >
            {{ $t("supportMailVoting") }} &rarr;
          </VoterSupportLink>
          <VoterSupportLink
            href="https://www.ncsl.org/research/elections-and-campaigns/felon-voting-rights.aspx"
          >
            {{ $t("supportFelons") }} &rarr;
          </VoterSupportLink>
          <VoterSupportLink
            href="https://sos.ga.gov/index.php/elections/voters_with_disabilities"
          >
            {{ $t("supportDisabled") }} &rarr;
          </VoterSupportLink>
          <h4>
            {{ $t("voterJourneyLAResources") }}
          </h4>
          <VoterSupportLink
            href="https://www.lavote.net/home/voting-elections/current-elections/upcoming-elections#"
          >
            {{ $t("supportLA_1") }} &rarr;
          </VoterSupportLink>
          <VoterSupportLink
            href="https://clerk.lacity.org/clerk-services/elections"
          >
            {{ $t("supportLA_2") }} &rarr;
          </VoterSupportLink>
        </cv-column>
        <cv-column
          :sm="4"
          :lg="8"
        >
          <img
            class="side-image"
            alt=""
            src="../../assets/images/support-page-father-baby-image-1.jpg"
          >
        </cv-column>
      </cv-row>
    </cv-grid>
  </PageInset>
</template>
