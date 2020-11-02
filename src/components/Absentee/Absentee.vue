<template>
  <MainContent>
    <template v-slot:content>
      <aside class="aside">
        <div class="aside__container--text">
          <h2 class="aside__header">Can't be there? Let us help you connect</h2>
          <p class="aside__paragraph">
            Absentee voting is as easy as signing up before your state's deadline.
          </p>
          <cv-link href="https://www.vote.org/absentee-ballot/" target="_blank">
            Request an absentee ballot &rarr;
          </cv-link>
        </div>
      </aside>
    </template>
    <template v-slot:image>
      <aside class="aside__container--img">
        <img
          class="aside__img"
          src="../../assets/absentee-page-group-friends-laptop-image-1.jpg"
          alt="stock image of voters at a voting poll"
        />
      </aside>
    </template>
  </MainContent>
</template>

<script>
import MainContent from '../../components/MainContent';

export default {
  name: 'absentee',
  components: { MainContent },
  data() {
    return {};
  },
  created() {
    this.$amplitude
      .getInstance()
      .logEvent('Page Visit', { page: 'Journey Page', component: 'Absentee' });
  }
};
</script>
<style lang="scss">
.aside__img {
  max-width: 100%;
}
</style>
