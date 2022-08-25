<template>
  <div class="register-info">
    {{ $t('registerYouth_1') }}
    <i18n path="registerYouth_2">
      <template v-slot:here>
        <a href="https://registertovote.ca.gov/" target="_blank"> {{ $t('registerYouth_2a') }}</a>
      </template>
      <template v-slot:ymca>
        <a href="https://www.ymcayag.org/vote/" target="_blank">{{ $t('registerYouth_2b') }}</a>
      </template>
    </i18n>
  </div>
</template>

<script>
export default {
  name: 'CaliSpecial',
};
</script>

<style scoped></style>
