<template>
  <div class="voter-support">
    <div class="voter-support__content">
      <div class="page__title">{{ $t("supportTitle") }}</div>
      <cv-grid :full-width="true">
        <cv-row>
          <cv-column :sm="4" :lg="8">
            <cv-link
              class="voter-support__link"
              href="https://www.empowerline.org/services/transportation-options/"
              target="_blank"
            >
              {{ $t("supportSeniors") }} &rarr;</cv-link
            >
            <cv-link
              class="voter-support__link"
              href="https://www.ymca.org/find-your-y?distance=175&lat=26.0517448&lng=-80.13727569999999&geolocation_geocoder_address=33004&type=branch"
              target="_blank"
            >
              {{ $t("supportChildCare") }} &rarr;</cv-link
            >
            <cv-link
              class="voter-support__link"
              href="https://www.npr.org/2020/08/07/900210406/the-most-important-mail-youll-ever-send-a-ballot"
              target="_blank"
            >
              {{ $t("supportMailVoting") }} &rarr;</cv-link
            >
            <cv-link
              class="voter-support__link"
              href="https://www.ncsl.org/research/elections-and-campaigns/felon-voting-rights.aspx"
              target="_blank"
              >{{ $t("supportFelons") }} &rarr;</cv-link
            >
            <cv-link
              class="voter-support__link"
              href="https://sos.ga.gov/index.php/elections/voters_with_disabilities"
              target="_blank"
            >
              {{ $t("supportDisabled") }} &rarr;</cv-link
            >
            <h4>
              {{ $t("voterJourneyLAResources") }}
            </h4>
            <cv-link
              class="voter-support__link"
              href="https://www.lavote.net/home/voting-elections/current-elections/upcoming-elections#"
              target="_blank"
            >
              {{ $t("supportLA_1") }} &rarr;</cv-link
            >
            <cv-link
              class="voter-support__link"
              href="https://clerk.lacity.org/clerk-services/elections"
              target="_blank"
            >
              {{ $t("supportLA_2") }} &rarr;</cv-link
            >
          </cv-column>
          <cv-column :sm="4" :lg="8">
            <img
              class="side-image"
              alt=""
              src="@/assets/images/support-page-father-baby-image-1.jpg"
            />
          </cv-column>
        </cv-row>
      </cv-grid>
    </div>
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
@import "@/assets/scss/theme";
.voter-support {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: calc(100vh - 96px);
  @include carbon--breakpoint-down(md) {
    margin-left: -1rem;
  }

  &__content {
    z-index: 20;
    width: 85%;
    max-width: 1346px;
    margin-left: auto;
    margin-right: auto;
    background-color: $ff-blue-03;
    text-align: end;
    @include carbon--breakpoint-down(md) {
      text-align: start;
    }
    .page__title {
      @include type-style("productive-heading-05");
      text-align: center;
      color: white;
      width: 100%;
      margin-bottom: 1.5rem;
    }
  }
  &__link {
    @include type-style("body-long-02");
    color: $ff-white-01;
    display: block;
    margin-bottom: 0.5rem;
    @include carbon--breakpoint-down(md) {
      @include type-style("body-long-01");
    }
    &.bx--link:visited {
      color: $ff-white-01;
    }
  }
  .side-image {
    max-width: 100%;
  }
}
</style>
