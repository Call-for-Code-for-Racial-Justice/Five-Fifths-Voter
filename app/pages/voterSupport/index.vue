<script setup>
</script>

<template>
  <page-inset class="text-start md:text-end">
    <page-title>
      {{ $t("supportTitle") }}
    </page-title>
    <cv-grid :full-width="true">
      <cv-row>
        <cv-column
          :sm="4"
          :lg="8"
        >
          <voter-support-link
            href="https://www.empowerline.org/services/transportation-options/"
          >
            {{ $t("supportSeniors") }} &rarr;
          </voter-support-link>
          <voter-support-link
            href="https://www.ymca.org/find-your-y?distance=175&lat=26.0517448&lng=-80.13727569999999&geolocation_geocoder_address=33004&type=branch"
          >
            {{ $t("supportChildCare") }} &rarr;
          </voter-support-link>
          <voter-support-link
            href="https://www.npr.org/2020/08/07/900210406/the-most-important-mail-youll-ever-send-a-ballot"
          >
            {{ $t("supportMailVoting") }} &rarr;
          </voter-support-link>
          <voter-support-link
            href="https://www.ncsl.org/research/elections-and-campaigns/felon-voting-rights.aspx"
          >
            {{ $t("supportFelons") }} &rarr;
          </voter-support-link>
          <voter-support-link
            href="https://sos.ga.gov/index.php/elections/voters_with_disabilities"
          >
            {{ $t("supportDisabled") }} &rarr;
          </voter-support-link>
          <h4>
            {{ $t("voterJourneyLAResources") }}
          </h4>
          <voter-support-link
            href="https://www.lavote.net/home/voting-elections/current-elections/upcoming-elections#"
          >
            {{ $t("supportLA_1") }} &rarr;
          </voter-support-link>
          <voter-support-link
            href="https://clerk.lacity.org/clerk-services/elections"
          >
            {{ $t("supportLA_2") }} &rarr;
          </voter-support-link>
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
  </page-inset>
</template>
