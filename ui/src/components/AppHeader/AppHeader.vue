<template>
  <cv-header aria-label="Carbon header">
    <cv-header-menu-button aria-label="Header menu" aria-controls="side-nav" />
    <cv-skip-to-content href="#main-content">
      Skip to content
    </cv-skip-to-content>
    <cv-header-name :to="{ name: 'landing-page' }" prefix="">
      Five Fifths Voter
    </cv-header-name>
    <cv-header-nav aria-label="main menu">
      <cv-header-menu-item :to="{ name: 'why-page' }">
        {{ $t('appHeaderWhyVote') }}
      </cv-header-menu-item>
      <cv-header-menu-item :to="{ name: 'journey-page' }">
        {{ $t('appHeaderVoterJourney') }}
      </cv-header-menu-item>
      <cv-header-menu-item :to="{ name: 'connect-page' }">
        {{ $t('appHeaderGetConnected') }}
      </cv-header-menu-item>
      <cv-header-menu-item :to="{ name: 'support-page' }">
        {{ $t('appHeaderVoterSupport') }}
      </cv-header-menu-item>
    </cv-header-nav>
    <template v-slot:header-global>
      <cv-header-global-action aria-label="User avatar">
        <UserAvatar20 />
      </cv-header-global-action>
    </template>
  </cv-header>
</template>

<script>
import UserAvatar20 from '@carbon/icons-vue/lib/user--avatar/20';

export default {
  name: 'AppHeader',
  components: { UserAvatar20 },
  data() {
    return {};
  }
};
</script>

<style lang="scss">
@import './appheader.scss';
</style>
