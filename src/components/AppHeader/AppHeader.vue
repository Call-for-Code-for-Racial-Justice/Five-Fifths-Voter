<template>
  <cv-header aria-label="Carbon tutorial">
    <cv-skip-to-content href="#main-content"
      >Skip to content</cv-skip-to-content
    >

    <cv-header-name to="/">EmbRACE The Vote</cv-header-name>

    <cv-header-nav> </cv-header-nav>

    <template slot="header-global">
      <cv-header-global-action aria-label="Notifications">
        <notification-20 />
      </cv-header-global-action>
      <cv-header-global-action aria-label="User avatar">
        <user-avatar-20 />
      </cv-header-global-action>
      <cv-header-global-action aria-label="App switcher">
        <app-switcher-20 />
      </cv-header-global-action>
    </template>
  </cv-header>
</template>

<script>
import Notification20 from '@carbon/icons-vue/es/notification/20';
import UserAvatar20 from '@carbon/icons-vue/es/user--avatar/20';
import AppSwitcher20 from '@carbon/icons-vue/es/app-switcher/20';

export default {
  name: 'AppHeader',
  components: { Notification20, UserAvatar20, AppSwitcher20 }
};
</script>
