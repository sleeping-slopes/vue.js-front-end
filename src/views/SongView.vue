<template>
  <errorMessage v-if="this.song.error">
    <template v-slot:errorIcon><span class="bi bi-emoji-frown"></span></template>
    <template v-slot:status>{{ this.song.error.status }}</template>
    <template v-slot:message>{{ this.song.error.message }}</template>
  </errorMessage>
  <template v-else>
    <songBanner :id="this.id" />
    <div class="content row">
      <panel class="w-100">
        <template v-slot:header>Related songs</template>
        <template v-slot:menu>
          <router-link :to="{ name: 'SongRelated', params: { id: this.id }}" class="button button-secondary h5">View all</router-link>
        </template>
        <template v-slot:content>
          <songContainer class="ul-list hidden-scroll"
          :playlist="this.relatedPlaylist"
          :dynamicComponent="'songExtended'"
          />
        </template>
      </panel>
      <div class="column w-50">
        <panel>
          <template v-slot:header>In playlists</template>
          <template v-slot:menu>
            <router-link :to="{ name: 'SongPlaylists', params: { id: this.id }}" class="button button-secondary h5">View all</router-link>
          </template>
          <template v-slot:content>
            <songContainer class="ul-list hidden-scroll"
            :playlist="{id:'zalupa',songs:[{id:1,pos:0},{id:1,pos:1},{id:1,pos:2}]}"
            :dynamicComponent="'songExtended'"
            />
          </template>
        </panel>
        <panel>
          <template v-slot:header>Likes</template>
          <template v-slot:menu>
            <router-link :to="{ name: 'SongLikes', params: { id: this.id }}" class="button button-secondary h5">View all</router-link>
          </template>
          <template v-slot:content>
            <songContainer class="ul-list hidden-scroll"
            :playlist="{id:'zalupa',songs:[{id:1,pos:0}]}"
            :dynamicComponent="'songExtended'"
            />
          </template>
        </panel>
      </div>
    </div>
  </template>
  </template>

<script>

import API from "@/axios/API";

  import panel from '@/components/containers/panel.vue';
  import songBanner from "@/components/songs/songBanner.vue";
  import errorMessage from "@/components/containers/errorMessage.vue";
  import songContainer from '@/components/songContainer.vue';

  export default
  {
      name: 'SongView',
      components:{panel, songBanner, errorMessage, songContainer},
      props:
      {
          id: { default: "noid" },
      },
      data()
      {
        return {
            song:{},
            relatedPlaylist:{}
        }
      },
      async created()
      {
        this.song = await API.get('songs/'+this.id);
        this.relatedPlaylist = await API.get('songs/'+this.id+"/related");
      }
  }
  </script>


