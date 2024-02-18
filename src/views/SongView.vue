<template>
  <template v-if="this.song">
  <errorMessage v-if="this.song.error">
    <template v-slot:errorIcon><span class="bi bi-emoji-frown"></span></template>
    <template v-slot:status>{{ this.song.error.status }}</template>
    <template v-slot:message>{{ this.song.error.message }}</template>
  </errorMessage>
  <template v-else>
    <songContainer
      :playlist="{id:'songBanner '+this.song.id,songs:[{id:this.song.id,pos:0}]}"
      :dynamicComponent="'songBanner'">
    </songContainer>
    <div class="content row">
      <div class="column" style="width:810px">
        <panel>
          <template v-slot:header>
              <span class="icon-text">
                <span class="bi bi-soundwave"></span><span>Related songs</span>
              </span>
            </template>
          <template v-slot:menu>
            <router-link :to="{ name: 'SongRelated', params: { id: this.id }}" class="button button-secondary">View all</router-link>
          </template>
          <template v-slot:content>
            <songContainer :type="'ul-list'" :dynamicComponent="'songExtended'" :playlist="this.relatedPlaylist"></songContainer>
          </template>
        </panel>
      </div>
      <div class="column" style="width:360px">
        <panel>
          <template v-slot:header>In playlists</template>
          <template v-slot:menu>
            <router-link :to="{ name: 'SongPlaylists', params: { id: this.id }}" class="button button-secondary">View all</router-link>
          </template>
          <template v-slot:content>
            <playlistContainer :type="'ul-list'" :playlists="this.playlists" :dynamicComponent="'playlistItem'" :maxDisplay="3"></playlistContainer>
          </template>
        </panel>
        <panel v-if="this.users?.length">
          <template v-slot:header>
            <span class="icon-text">
              <span class="bi bi-suit-heart-fill"></span><span>{{ abbreviateNumber(this.users.length) }} like{{this.users.length==1?'':'s'}}</span>
            </span>
          </template>
          <template v-slot:menu>
            <router-link :to="{ name: 'SongLikes', params: { id: this.id }}" class="button button-secondary">View all</router-link>
          </template>
          <template v-slot:content>
            <userContainer :type="'row gap-0'" :dynamicComponent="'userIcon'" :users="this.users" :maxDisplay="13"></userContainer>
          </template>
        </panel>
        <article class="project-info">
          <p>
            <span>About website</span><br>
            Non-commercial project created solely for demonstration purposes. I do not own the copyrights to the posted content.
          </p>
          <p>
            <span>Technologies used</span><br>
            Frontend: HTML, CSS (PostCSS), Vue.js, Axios;<br>
            Backend: Express.js, MySQL, REST API, Multer, JSON Web Token.
          </p>
          <p>Created by <a href="https://github.com/sleeping-slopes" class="accent-text alink" target=”_blank” rel="noopener noreferrer">@sleeping-slopes</a></p>
          <p><span class="accent-text">Language:&nbsp</span>English (US)</p>
        </article>
      </div>
    </div>
  </template>
  </template>
</template>

<script>

import API from "@/axios/API";

import { abbreviateNumber } from "@/functions.js";

import panel from '@/components/containers/panel.vue';
import errorMessage from "@/components/containers/errorMessage.vue";
import songContainer from '@/components/containers/songContainer.vue';
import playlistContainer from "@/components/containers/playlistContainer.vue";
import userContainer from "@/components/containers/userContainer.vue";

export default
{
    name: 'SongView',
    components: { panel, errorMessage, songContainer, playlistContainer, userContainer },
    props:
    {
        id: { default: "route_param_id" }
    },
    data()
    {
      return {
          song: undefined,
          playlists: undefined,
          relatedPlaylist: undefined,
          users: undefined
      }
    },
    methods:
    {
      abbreviateNumber: abbreviateNumber
    },
    async created()
    {
      this.song = await API.get('songs/'+this.id);
      this.relatedPlaylist = (await API.get('songs/'+this.id+"/related")).songList;
      this.playlists = await API.get('songs/'+this.id+'/playlists');
      this.users = await API.get('songs/'+this.id+'/likes');
    }
}

</script>


