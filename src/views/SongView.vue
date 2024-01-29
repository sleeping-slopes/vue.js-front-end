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
      :dynamicComponent="'songBanner'" :type="'banner hidden-scroll'">
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
            <router-link :to="{ name: 'SongRelated', params: { id: this.id }}" class="button button-secondary h5">View all</router-link>
          </template>
          <template v-slot:content>
            <songContainer :type="'ul-list hidden-scroll'" :dynamicComponent="'songExtended'" :playlist="this.relatedPlaylist"/>
          </template>
        </panel>
      </div>
      <div class="column" style="width:360px">
        <panel>
          <template v-slot:header>In playlists</template>
          <template v-slot:menu>
            <router-link :to="{ name: 'SongPlaylists', params: { id: this.id }}" class="button button-secondary h5">View all</router-link>
          </template>
          <template v-slot:content>
            <playlistContainer :type="'ul-list'" :playlists="this.playlists" :dynamicComponent="'playlistItem'" :maxDisplay="3"/>
          </template>
        </panel>
        <panel v-if="this.users?.length">
          <template v-slot:header>
            <span class="icon-text">
              <span class="bi bi-suit-heart-fill"></span><span>{{ abbreviateNumber(this.users.length) }} like{{this.users.length==1?'':'s'}}</span>
            </span>
          </template>
          <template v-slot:menu>
            <router-link :to="{ name: 'SongLikes', params: { id: this.id }}" class="button button-secondary h5">View all</router-link>
          </template>
          <template v-slot:content>
            <userContainer :type="'row gap-0'" :dynamicComponent="'userIcon'" :users="this.users" :maxDisplay="13"></userContainer>
          </template>
        </panel>
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
        id: { default: "noid" }
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
      this.relatedPlaylist = await API.get('songs/'+this.id+"/related");
      this.playlists = await API.get('songs/'+this.id+'/playlists');
      this.users = await API.get('songs/'+this.id+'/likes');
    }
}

</script>


