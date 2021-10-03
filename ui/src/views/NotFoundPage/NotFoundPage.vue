<template>
  <cv-content id="#main-content">
    <div class="page__details">
      <h2 class="aside__header">Page Not Found</h2>
    </div>
    <div class="bx--grid bx--grid--full-width landing-page">
      <div class="bx--row landing-page__r2">
        <div class="bx--col-lg-16">
          <section>
            <aside class="content--register">
              <p>Redirecting...</p>
            </aside>
          </section>
        </div>
      </div>
    </div>
  </cv-content>
</template>

<script>
import router from '../../router';
export default {
  name: 'notfound',
  components: {},
  data() {
    return {};
  },
  created() {
    setTimeout(() => router.push('/'), 2000);
  },
  methods: {}
};
</script>
