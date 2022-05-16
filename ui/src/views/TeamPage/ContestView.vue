<template>
  <div class="contest-view">
    <cv-inline-loading
      v-if="loading"
      ending-text="..."
      error-text="could not load election details"
      loading-text="loading election details"
      loaded-text="loaded election details"
      :state="'loading'"
    ></cv-inline-loading>
    <cv-accordion @change="actionChange" ref="acc" v-else>
      <cv-accordion-item
        v-for="(ballotItem, index) in contests"
        :key="`${ballotItem.id}`"
        :open="open[index]"
      >
        <template slot="title">
          <span
            class="contest-view__office"
            v-bind:class="{ 'contest-view--office-voted': officeVoted(ballotItem) }"
            v-if="ballotItem.type === 'Referendum'"
            >{{ ballotItem.referendumTitle }}</span
          >

          <span
            v-else
            class="contest-view__office"
            v-bind:class="{ 'contest-view--office-voted': officeVoted(ballotItem) }"
            >{{ ballotItem.office }}</span
          >
        </template>
        <template slot="content" v-if="ballotItem.type !== 'Referendum'">
          <cv-data-table
            :staticWidth="true"
            :zebra="true"
            v-if="!loading"
            class="contest-view__candidates"
          >
            <template slot="headings">
              <cv-data-table-heading heading="Name" />
              <cv-data-table-heading heading="Party" />
              <cv-data-table-heading heading="Url" />
              <cv-data-table-heading heading="Phone" />
              <cv-data-table-heading heading="Email" />
              <cv-data-table-heading />
              <cv-data-table-heading />
              <cv-data-table-heading v-if="isUserEditor" />
              <cv-data-table-heading v-if="isUserEditor" />
            </template>
            <template slot="actions" v-if="isUserEditor">
              <add-contest :contest="ballotItem" />
              <add-candidate :contest="ballotItem" />
            </template>
            <template slot="data">
              <cv-data-table-row
                v-for="candidate in ballotItem.candidates"
                :key="`${candidate.id}`"
                :value="`${candidate.id}`"
              >
                <cv-data-table-cell>{{ candidate.name }}</cv-data-table-cell>
                <cv-data-table-cell>{{ candidate.party }}</cv-data-table-cell>
                <cv-data-table-cell>
                  <div class="contest-view__icons">
                    <cv-link
                      :href="candidate.candidateUrl"
                      :inline="true"
                      v-if="candidate.candidateUrl"
                      target="_blank"
                    >
                      <Link16 />
                    </cv-link>
                    <cv-link
                      v-if="twitter(candidate)"
                      :href="twitter(candidate)"
                      :inline="true"
                      target="_blank"
                    >
                      <LogoTwitter16 />
                    </cv-link>
                    <cv-link
                      v-if="facebook(candidate)"
                      :href="facebook(candidate)"
                      :inline="true"
                      target="_blank"
                    >
                      <LogoFacebook16 />
                    </cv-link>
                    <cv-interactive-tooltip>
                      <template slot="content">
                        It would be great to have an AI analysis of this candidate based on their
                        social media, campaign web site, and any other public source. How would we
                        do that? What sort of score would we show here?
                      </template>
                      <template slot="trigger">
                        <Watson16 />
                      </template>
                    </cv-interactive-tooltip>
                  </div>
                </cv-data-table-cell>
                <cv-data-table-cell>{{ candidate.phone }}</cv-data-table-cell>
                <cv-data-table-cell>{{ candidate.email }}</cv-data-table-cell>
                <cv-data-table-cell>
                  <tag-candidate :candidate="candidate" :ballotItem="ballotItem" />
                </cv-data-table-cell>
                <cv-data-table-cell>
                  <cv-icon-button
                    class="contest-view__left"
                    :kind="'ghost'"
                    :size="'sm'"
                    :icon="voted(ballotItem, candidate.id) ? iconVoted : iconVote"
                    :label="
                      voted(ballotItem, candidate.id) ? 'Remove from my list' : 'Add to my list'
                    "
                    :tip-position="'top'"
                    @click="actionVote(ballotItem, candidate)"
                  />
                </cv-data-table-cell>
                <cv-data-table-cell v-if="isUserEditor">
                  <add-candidate :candidate="candidate" :contest="ballotItem" />
                </cv-data-table-cell>
                <cv-data-table-cell v-if="isUserEditor"
                  ><cv-icon-button
                    class="contest-view__left"
                    :kind="'danger--ghost'"
                    :size="'sm'"
                    :icon="iconDelete"
                    :label="'Delete'"
                    :tip-position="'top'"
                    :disabled="false"
                /></cv-data-table-cell>
              </cv-data-table-row>
            </template>
          </cv-data-table>
          <cv-button
            v-if="isUserEditor"
            :kind="'danger--ghost'"
            @click="actionDeleteBallotItem(ballotItem)"
          >
            Delete this contest
          </cv-button>
        </template>
        <template slot="content" v-else>
          <cv-tile kind="standard" :light="true">
            <add-contest :contest="ballotItem" />
            <div class="contest-view__subtitle">{{ ballotItem.referendumSubtitle }}</div>
            <cv-link :href="ballotItem.referendumUrl" :inline="false" target="blank">
              More information
            </cv-link>

            <div class="contest-view__icons">
              <cv-icon-button
                class="contest-view__left"
                :kind="'ghost'"
                :size="'sm'"
                :icon="voted(ballotItem, 'Yes') ? iconChosenYes : iconYes"
                :label="'Yes'"
                :tip-position="'top'"
                @click="actionReferendumVote(ballotItem, 'Yes')"
              />
              <cv-icon-button
                class="contest-view__left"
                :kind="'ghost'"
                :size="'sm'"
                :icon="voted(ballotItem, 'No') ? iconChosenNo : iconNo"
                :label="'No'"
                :tip-position="'top'"
                @click="actionReferendumVote(ballotItem, 'No')"
              />
            </div>
          </cv-tile>

          <cv-button
            v-if="isUserEditor"
            :kind="'danger--ghost'"
            @click="actionDeleteBallotItem(ballotItem)"
          >
            Delete this referendum
          </cv-button>
        </template>
      </cv-accordion-item>
    </cv-accordion>

    <div v-if="election">
      <add-contest />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import {
  TrashCan16,
  Favorite16,
  FavoriteFilled16,
  Edit16,
  Save16,
  Link16,
  LogoTwitter16,
  LogoFacebook16,
  Watson16,
  ThumbsUp32,
  ThumbsDown32,
  ThumbsUpFilled32,
  ThumbsDownFilled32
} from '@carbon/icons-vue';
import AddCandidate from '@/views/TeamPage/AddCandidate';
import AddContest from '@/views/TeamPage/AddContest';
import TagCandidate from '@/views/TeamPage/TagCandidate';

export default {
  name: 'ContestView',
  components: {
    TagCandidate,
    AddContest,
    AddCandidate,
    Link16,
    LogoTwitter16,
    LogoFacebook16,
    Watson16
  },
  data: () => ({
    loading: true,
    iconDelete: TrashCan16,
    iconVote: Favorite16,
    iconVoted: FavoriteFilled16,
    iconYes: ThumbsUp32,
    iconNo: ThumbsDown32,
    iconChosenYes: ThumbsUpFilled32,
    iconChosenNo: ThumbsDownFilled32,
    iconEdit: Edit16,
    iconSave: Save16,
    newContest: '',
    editing: new Set(),
    open: []
  }),
  props: { election: String },
  async created() {
    this.loading = true;

    await this.$store.dispatch('loadTeamContests');
    this.$store.commit('loadLocal');

    this.loading = false;
  },
  computed: {
    ...mapState({
      given_name: state => state.user.info.given_name,
      currentTeam: state => state.teams.current,
      votes: state => state.teams.local.votes
    }),
    ...mapGetters({
      isUserEditor: 'isUserEditor',
      allContests: 'mergeContests'
    }),
    contests() {
      return this.allContests.filter(ballotItem => ballotItem.doc_election === this.election);
    }
  },
  methods: {
    facebook(candidate) {
      if (candidate.facebook) return candidate.facebook;
      const channels = candidate.channels || [];
      const channel = channels.find(channel => channel.type === 'Facebook');
      if (channel) return channel.id;
      return undefined;
    },
    twitter(candidate) {
      if (candidate.facebook) return candidate.twitter;
      const channels = candidate.channels || [];
      const channel = channels.find(channel => channel.type === 'Twitter');
      if (channel) return channel.id;
      return undefined;
    },

    officeVoted(ballotItem) {
      try {
        return Boolean(this.votes[ballotItem.id]);
      } catch (error) {
        return false;
      }
    },
    voted(ballotItem, id) {
      try {
        return this.votes[ballotItem.id].id === id;
      } catch (error) {
        return false;
      }
    },

    actionChange(ev) {
      // Directly update the CvAccordionItem open property
      this.open = this.$refs.acc.state.map((item, index) => index === ev.changedIndex);
    },
    async actionDeleteBallotItem(ballotItem) {
      this.loading = true;
      await this.$store.dispatch('removeContest', ballotItem);
      this.loading = false;
    },
    async actionVote(ballotItem, candidate) {
      if (!this.voted(ballotItem, candidate.id))
        await this.$store.dispatch('addVote', { contest: ballotItem, candidate });
      else await this.$store.dispatch('removeVote', ballotItem.id);
    },
    async actionReferendumVote(ballotItem, choice) {
      if (!this.voted(ballotItem, choice))
        await this.actionVote(ballotItem, {
          id: choice,
          office: ballotItem.referendumTitle,
          name: choice,
          party: 'Referendum'
        });
      else await this.$store.dispatch('removeVote', ballotItem.id);
    }
  }
};
</script>

<style lang="scss">
@import '~@/styles/theme';
@import 'carbon-components/scss/components/data-table/data-table';
@import 'carbon-components/scss/components/accordion/accordion';
@import 'carbon-components/scss/components/inline-loading/inline-loading';
@import 'carbon-components/scss/components/button/button';
@import 'carbon-components/scss/components/link/link';
@import 'carbon-components/scss/components/tooltip/tooltip';
@import 'carbon-components/scss/components/tile/tile';
@import 'carbon-components/scss/components/text-input/text-input';

.contest-view {
  &__candidates {
    .bx--data-table-container {
      .bx--table-toolbar {
        .bx--toolbar-content {
          flex-flow: row-reverse;
        }
      }
    }
  }
  &__left {
    .bx--assistive-text {
      transform: translate(-50%, -100%) !important;
    }
  }
  &__office {
    @include carbon--type-style('productive-heading-01');
    color: $support-info;
  }
  &--office-voted {
    color: $support-success;
  }
  &__icons {
    display: flex;
  }
  &__subtitle {
    @include carbon--type-style('body-long-02');
  }
}
</style>
