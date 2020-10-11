<template>
  <MainContent>
    <template v-slot:content>
      <aside class="aside">
        <div class="aside__container--text">
          <h2 class="aside__header">Vote like it's hot</h2>
          <p class="aside__paragraph">
            voting is the future for your neighbors, your friends, your family,
            and yourself.
          </p>
          <cv-link
            href="https://verify.vote.org/?partner=111111&campaign=free-tools"
            target="_blank"
          >
            Check voting status -> </cv-link
          ><br />
          <cv-link
            href="https://register.vote.org/?partner=111111&campaign=free-tools"
            target="_blank"
          >
            Register to vote ->
          </cv-link>
        </div>
      </aside>
    </template>
    <template v-slot:image>
      <aside class="aside__container--img">
        <img
          class="aside__image"
          src="../../assets/support-page-father-baby-image-1.jpg"
          alt="Black man holds newborn baby"
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
