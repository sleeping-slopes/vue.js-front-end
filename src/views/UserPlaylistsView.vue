

<template>
    <panel v-if="this.playlists.length==0">
        <template v-slot:header>Playlists by {{ this.user.username || this.login }}</template>
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
    import errorMessage from '@/components/containers/errorMessage.vue';

    import API from '@/axios/API';


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
        this.user = await API.get('users/'+this.login+'/username');
        this.playlists = await API.get('users/'+this.login+'/playlists/created');
      },
    }
    </script>