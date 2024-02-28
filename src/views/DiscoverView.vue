<template>
  <div class="content row">
    <div class="column column-main">
      <panel>
        <template v-slot:header>All playlists</template>
        <template v-slot:content>
          <carousel>
            <template v-slot:content>
              <playlistContainer :type="'row gap-10'"
                :playlists="this.playlists"
                :dynamicComponent="'playlistCarouselCard'">
              </playlistContainer>
            </template>
          </carousel>
        </template>
      </panel>
      <panel>
        <template v-slot:header>All songs</template>
        <template v-slot:content>
          <songContainer :type="'ul-list'" :dynamicComponent="'songExtended'" :playlist="playlist"></songContainer>
        </template>
      </panel>
    </div>
    <div class="column-side">
      <TransitionGroup name="panelFade" tag="div" class="column" style="position:sticky; top:5px;">
        <template v-if="this.$store.getters.getCurrentUser">
          <panel style="height:238px; width:100%" :key="'recommendedUsersPanel'">
            <template v-slot:header>
              <span class="icon-text">
                <span class="bi bi-people-fill"></span><span>Artists you should follow</span>
              </span>
            </template>
            <template v-slot:menu>
              <button class="button button-secondary icon-text" v-on:click="this.refreshRecommendations()">
                <span class="bi bi-arrow-repeat"></span><span>Refresh</span></button>
              </template>
            <template v-slot:content>
              <userContainer :type="'ul-list'" :dynamicComponent="'userItemSmall'" :users="this.recommendedUsers" :key="userContainerKey"></userContainer>
            </template>
          </panel>
          <panel v-if="this.songLikesPlaylist?.songs?.length" :key="'songLikesPanel'">
            <template v-slot:header>
              <span class="icon-text">
                <span class="bi bi-suit-heart-fill"></span><span>{{ abbreviateNumber(this.songLikesPlaylist.songs.length) }} like{{this.songLikesPlaylist.songs.length==1?'':'s'}}</span>
              </span>
            </template>
            <template v-slot:menu>
              <router-link :to="{ name: 'UserLikes', params: { login: this.$store.getters.getCurrentUser.login }}" class="button button-secondary">View all</router-link>
            </template>
            <template v-slot:content>
              <songContainer :type="'ul-list'" :dynamicComponent="'songExtended'" :playlist="songLikesPlaylist" max-display="3"></songContainer>
            </template>
          </panel>
          <panel v-if="this.historyPlaylist?.songs?.length" :key="'historyPlaylistPanel'">
            <template v-slot:header>
              <span class="icon-text">
                <span class="bi bi-clock-history"></span><span>Listening history</span>
              </span>
            </template>
            <template v-slot:menu>
              <router-link :to="{ name: 'YourHistory' }" class="button button-secondary">View all</router-link>
            </template>
            <template v-slot:content>
              <songContainer :type="'ul-list'" :dynamicComponent="'songExtended'" :playlist="historyPlaylist" max-display="3"></songContainer>
            </template>
          </panel>
        </template>
        <article class="project-info" :key="'projectInfo'">
          <p>
            <span>About website</span><br>
            Non-commercial project created solely for demonstration purposes. I do not own the copyrights to the posted content.
          </p>
          <p>
            <span>Technologies used</span><br>
            Frontend: HTML, CSS (PostCSS), Vue.js, Axios;<br>
            Backend: Express.js, MySQL, REST API, Multer, JSON Web Token.
          </p>
          <p style="white-space:nowrap">Created by <a href="https://github.com/sleeping-slopes" class="accent-text alink" target=”_blank” rel="noopener noreferrer">@sleeping-slopes</a></p>
          <p style="white-space:nowrap"><span class="accent-text">Language:&nbsp</span>English (US)</p>
        </article>
      </TransitionGroup>
    </div>
  </div>
</template>

<script>

import API from '@/axios/API';

import panel from '@/components/containers/panel.vue';
import carousel from '@/components/containers/carousel.vue';
import songContainer from '@/components/containers/songContainer.vue';
import playlistContainer from '@/components/containers/playlistContainer.vue';
import userContainer from '@/components/containers/userContainer.vue';

import { abbreviateNumber } from "@/functions.js"


export default {
  name: 'DiscoverView',
  components: { panel, carousel, songContainer, playlistContainer, userContainer },
  data()
  {
    return {
      playlists: undefined,
      playlist: undefined,
      recommendedUsers: undefined,
      userContainerKey:Date.now(),
      songLikesPlaylist: undefined,
      historyPlaylist:
      {
        id:'[]RENAME',
        songs:JSON.parse(JSON.stringify(this.$store.getters.getSongHistory)),
        ...(JSON.parse(JSON.stringify(this.$store.getters.getSongHistory)).length<1) && {error:{"status":404,"message":"No HISTORY songs"}}
      }
    }
  },
  methods:
  {
    async refreshRecommendations()
    {
      this.recommendedUsers = undefined;
      this.recommendedUsers = (await API.get('me/recommendations'));
      this.userContainerKey=Date.now();
    },
    abbreviateNumber: abbreviateNumber
  },
  async created()
  {
    this.playlists = await API.get('playlists');
    this.playlist = (await API.get('songs')).songList;
  },
  watch:
  {
    '$store.getters.getCurrentUser':
    {
      handler: async function(value)
      {
        if (value)
        {
          this.recommendedUsers = (await API.get('me/recommendations'));
          this.songLikesPlaylist = (await API.get('users/'+value.login+'/songs/likes')).songList;
        }
      },
      immediate: true
    }
  }
}

</script>