<template>
	<div>
	<cv-combo-box 
	ref="r_combo"
	 v-model.trim="screenname"
  label="Enter candidate Twitter screen name"
  auto-filter="false"
  filterable="false"
  :options="options"
  @filter="actionFilter">
	</cv-combo-box>

	    <cv-button @click="checkChatter">Check</cv-button>
	    <div class="tweet__list" v-html="twitter_chatter"></div>
	    </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'twitterchatter',
  data() {
    return {
      twitter_chatter: "What are candidates saying",
      options: [
              {
                value: 'BarackObama',
                label: 'Barack Obama',
                name: 'BarackObama',
              },
              {
                value: 'TheBushCenter',
                label: 'George W. Bush',
                name: 'GeorgeWBush',
              },
              {
                value: 'BillClinton',
                label: 'Bill Clinton',
                name: 'BillClinton',
              },
              {
                value: 'Bush41Library',
                label: 'George Bush',
                name: 'Bush41Library',
              },
              {
                value: 'RonaldReagan',
                label: 'Ronald Reagan',
                name: 'RonaldReagan',
              },
              {
                value: 'Someone',
                label: 'Someone',
                name: 'Someone',
              },
            ]
    };
  },
  mounted() {},
  methods: {
    checkChatter: function () {
    	eval('console.log(this.$refs.r_combo)');
          axios
            .get('/twitter/chatter', {
              baseURL: process.env.VUE_APP_SERVICE_API_HOST,
              params: {
                screenname: this.screenname,
              },
            })
            .then((response) => {
            	this.twitter_chatter = '<ul>' + response.data.dom + '</ul>';
            })
            .catch((error) => {
              error;
              this.twitter_chatter = 'No tweets available';
            });
        },
		actionFilter: function(evt) {
			this.options.pop();
			this.options.push({value: evt, label: evt});
			evt;
			eval('console.log(evt)');
		}       
  }
};
</script>
