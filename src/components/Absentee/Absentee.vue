<template>
  <MainContent>
    <template v-slot:content>
      <aside class="aside">
        <div class="aside__container--text">
          <h2 class="aside__header">
            Can't be there? you don't have to be a square.
          </h2>
          <p class="aside__paragraph">
            absentee voting is as easy as signing up before your state's
            deadline.
          </p>
          <cv-link
            href="https://absentee.vote.org/?partner=111111&campaign=free-tools"
            target="_blank"
          >
            Request an absentee ballot ->
          </cv-link>
        </div>
      </aside>
    </template>
    <template v-slot:image>
      <aside class="aside__container--img">
        <img
          class="aside__img"
          src="../../assets/vote-absentee-1.jpg"
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
  created() {},
  methods: {}
};
</script>

