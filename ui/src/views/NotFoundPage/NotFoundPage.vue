<template>
  <div>
    <div class="page__details">
      <h2 class="aside__header">{{ $t('notfoundTitle') }}</h2>
    </div>
    <div class="bx--grid bx--grid--full-width landing-page">
      <div class="bx--row landing-page__r2">
        <div class="bx--col-lg-16">
          <section>
            <aside class="content--register" :aria-label="$t('notfoundDesc')">
              <p>{{ $t('notfoundDesc') }}</p>
            </aside>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  data() {
    return {};
  },
  created() {
    setTimeout(() => this.$router.push('/'), 2000);
  },
  methods: {},
};
</script>
