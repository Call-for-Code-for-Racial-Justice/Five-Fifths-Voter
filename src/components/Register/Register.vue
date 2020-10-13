<template>
  <MainContent>
    <template v-slot:content>
      <aside class="aside">
        <div class="aside__container--text">
          <h2 class="aside__header">Vote like it's hot</h2>
          <p class="aside__paragraph">
            Voting is the future for your neighbors, your friends, your family,
            and yourself.
          </p>
          <cv-link
            href="https://www.vote.org/am-i-registered-to-vote/"
            target="_blank"
          >
            Check voting status</cv-link
          ><br /><br />
          <cv-link
            href="https://www.vote.org/register-to-vote/"
            target="_blank"
          >
            Register to vote</cv-link
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
  methods: {},
};
</script>

<style lang="scss">
.aside__image {
  max-width: 100%;
}
</style>
