<template>
  <PageLayout childData="mother-daughter-hero.jpeg">
    <div class="page__details">
      <h2 class="page__title">Why vote?</h2>
    </div>
    <MainContent>
      <template v-slot:content>
        <aside class="aside">
          <div class="aside__container--text">
            <h2 class="aside__header">So what's the big deal?</h2>
            <p>
              It is through blood, sweat and tears that Black people earned the
              right to vote. Many Black people protested, marched, were arrested
              and even died as they fought the battle for voting equality. We
              implore you to not let these sacrifices be in vain but to cease
              the opportunity that your ancestors provided, that your voice can
              be heard in America.
              <br /><br />
              In 1868, the 14th Amendment gave Black people the rights of
              citizenship but it would be over 97 years before they could
              successfully execute their right to vote. During this time span
              poll taxes, literacy tests, and other tactics were used to
              undermine Black people&#x27;s right to vote.
              <br /><br />
              It was not until 1965 when Voting Rights Act was executed that
              provided a successful pathway for Black people to vote. Please
              exercise your right to vote. It was hard earned by your ancestors
              <br />
              <br />
              For my information on Black people’s journey to vote check out
              <cv-link
                href="https://www.loc.gov/teachers/classroommaterials/presentationsandactivities/presentations/elections/voting-rights-african-americans.html" target="_blank"
              >
                Library of Congress - Voting Rights for African Americans
              </cv-link>
            </p>
          </div>
        </aside>
      </template>
      <template v-slot:image>
        <aside class="aside__container--img">
          <img
            class="aside__image"
            src="../../assets/why-vote-page-father-daughter-image-1.jpg"
            alt="A young father holds his infant daughter on his shoulders"
          />
        </aside>
      </template>
    </MainContent>
  </PageLayout>
</template>

<script>
import PageLayout from '../../components/PageLayout';
import MainContent from '../../components/MainContent';

export default {
  name: 'connect',
  components: { PageLayout, MainContent },
  data() {
    return {};
  },
  created() {},
  methods: {}
};
</script>
