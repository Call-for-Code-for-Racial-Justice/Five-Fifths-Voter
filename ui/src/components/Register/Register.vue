<template>
  <MainContent>
    <template v-slot:content>
      <aside class="aside">
        <div class="aside__container--text">
          <h2 class="aside__header">Voting is the future</h2>
          <p class="aside__paragraph">
            Voting is the perfect way for you to unite and implement change in your communities,
            state-wide and nationally.
          </p>
          <cv-link href="https://www.vote.org/am-i-registered-to-vote/" target="_blank">
            Check voting status &rarr;</cv-link
          ><br /><br />
          <cv-link href="https://www.vote.org/register-to-vote/" target="_blank">
            Register to vote &rarr;</cv-link
          ><br />
        </div>
      </aside>
    </template>
    <template v-slot:image>
      <aside class="aside__container--img">
        <img
          class="aside__image"
          src="../../assets/register-page-woman-in-sun-image-1.jpeg"
          alt="Black woman with large afro smiles and looks off camera with the sun on her."
        />
      </aside>
    </template>
  </MainContent>
</template>

<script>
import MainContent from '../../components/MainContent';

export default {
  name: 'reg',
  components: { MainContent },
  data() {
    return {};
  },
  created() {},
  methods: {}
};
</script>

<style lang="scss">
@import './register.scss';
</style>
