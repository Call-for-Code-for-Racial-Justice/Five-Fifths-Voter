<template>
  <cv-content id="#main-content">
    <AppHeader />
    <div class="page__details">
      <h2 class="aside__header">{{ $t('notfoundTitle') }}</h2>
    </div>
    <div class="bx--grid bx--grid--full-width landing-page">
      <div class="bx--row landing-page__r2">
        <div class="bx--col-lg-16">
          <section>
            <aside class="content--register">
              <p>{{ $t('notfoundDesc') }}</p>
            </aside>
          </section>
        </div>
      </div>
    </div>
  </cv-content>
</template>

<script>
import AppHeader from '../../components/AppHeader';
import router from '../../router';
export default {
  name: 'notfound',
  components: { AppHeader },
  data() {
    return {};
  },
  created() {
    setTimeout(() => router.push('/'), 2000);
  },
  methods: {}
};
</script>
