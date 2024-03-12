<template>
  <div class="page__inset blue-bg">
    <div class="page__title">{{ $t("whyVotePageTitle") }}</div>
    <cv-grid :full-width="true">
      <cv-row>
        <cv-column :sm="4" :lg="8">
          <div class="page__subtitle">{{ $t("whyVotePageSubTitle") }}</div>
          <p class="aside__paragraph">
            {{ $t("whyVotePageParagraph_1") }}
            <br /><br />
            {{ $t("whyVotePageParagraph_2") }}
            <br /><br />
            {{ $t("whyVotePageParagraph_3", ["Five Fifths Voter"]) }}
            <br /><br />
            <MarkDown :content="$t('whyVotePageQuote')" />
          </p>
        </cv-column>
        <cv-column :sm="4" :lg="8">
          <img
            class="side-image"
            alt=""
            src="@/assets/images/why-vote-page-father-daughter-image-1.jpg"
          />
        </cv-column>
      </cv-row>
    </cv-grid>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/theme";
@import "@/assets/scss/pages";
</style>
