

<template>
    <panel v-if="this.playlists.length==0">
        <template v-slot:header>Playlists by oxxymiron</template>
        <template v-slot:content>
            <errorMessage  >
                <template v-slot:errorIcon><span class="bi bi-music-note-list"></span></template>
                <template v-slot:message>No playlists here yet</template>
            </errorMessage>
        </template>
    </panel>
    <ul class="column">
        <li v-for="playlist in this.playlists">
            <playlistExpansible :id="playlist.id" :key="playlist.id"/>
        </li>
    </ul>
</template>

    <script>

    import panel from '@/components/containers/panel.vue';
    import playlistExpansible from '@/components/playlists/playlistExpansible.vue';

    import { getUserUsername } from '@/axios/getters';
    import { getUserCreatedPlaylists } from '@/axios/getters'
import errorMessage from '@/components/containers/errorMessage.vue';

    export default {
      name: 'UserPlaylistsView',
      components:
      {
    panel, playlistExpansible,
    errorMessage
},
      props:
      {
        login:
        {
          default: -1,
        },
      },
      data()
      {
        return{
          playlists:[],
          user:{}
        }
      },
      async created()
      {
        this.user = await getUserUsername(this.login);
        this.playlists = await getUserCreatedPlaylists(this.login);
      },
    }
    </script>

    <style>

    </style>