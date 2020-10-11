<template>
  <div class="tweets">
    <cv-combo-box
      ref="r_combo"
      v-model.trim="screenname"
      label="Enter candidate Twitter screen name"
      :auto-filter="autoFilter"
      filterable="false"
      :options="options"
      @filter="actionFilter"
    >
    </cv-combo-box>

    <cv-button @click="checkChatter">Check</cv-button>
    <cv-loading :active="loadingChatter" :overlay="loadingOverlay"></cv-loading>
    <cv-list v-if="haveTweets">
      <cv-list-item v-for="item in twitter_chatter.items" :key="item.tweet">
        <span class="tweet-sentiment"> {{ item.sentiment }} </span>
        <p>{{ item.tweet }}</p>
      </cv-list-item>
    </cv-list>
    <p v-else-if="tweetError">No tweets available</p>
    <p v-else>here's what they're saying.</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'twitterchatter',
  data() {
    return {
      twitter_chatter: {},
      loadingChatter: false,
      loadingOverlay: true,
      haveTweets: false,
      tweetError: false,
      autoFilter: false,
      screenname: '',
      options: [
        {
          value: 'BarackObama',
          label: 'Barack Obama',
          name: 'BarackObama'
        },
        {
          value: 'TheBushCenter',
          label: 'George W. Bush',
          name: 'GeorgeWBush'
        },
        {
          value: 'BillClinton',
          label: 'Bill Clinton',
          name: 'BillClinton'
        },
        {
          value: 'Bush41Library',
          label: 'George Bush',
          name: 'Bush41Library'
        },
        {
          value: 'RonaldReagan',
          label: 'Ronald Reagan',
          name: 'RonaldReagan'
        },
        {
          value: 'Someone',
          label: 'Someone',
          name: 'Someone'
        }
      ]
    };
  },
  mounted() {},
  methods: {
    checkChatter: function() {
      eval('console.log(this.$refs.r_combo)');
      this.loadingChatter = true;
      axios
        .get('/twitter/chatter', {
          baseURL: process.env.VUE_APP_SERVICE_API_HOST,
          params: {
            screenname: this.screenname
          }
        })
        .then(response => {
          this.loadingChatter = false;
          this.twitter_chatter = response.data;
          this.haveTweets = this.twitter_chatter.items.length > 0;
        })
        .catch(error => {
          error;
          this.loadingChatter = false;
          this.tweetError = true;
        });
    },
    actionFilter: function(evt) {
      this.options.pop();
      this.options.push({ name: evt, value: evt, label: evt });
      //evt;
      //eval('console.log(evt)');
    }
  }
};
</script>
