<template>
<div class="content column">
    <nav class="nav-tab">
      <ul>
        <li><router-link :to="{ name: 'YourSongs'}">Songs</router-link></li>
        <li><router-link :to="{ name: 'YourPlaylists'}">Playlists</router-link></li>
        <li><router-link :to="{ name: 'YourFollowing'}">Following</router-link></li>
        <li><router-link :to="{ name: 'YourHistory'}">History</router-link></li>
      </ul>
    </nav>
    <router-view :login="this.login" v-if="this.login !== null"></router-view>
</div>
</template>

<script>

import API from '@/axios/API';

export default
{
  name: 'YouView',
  async created()
  {
    const user = await API.get('me');
    this.login = user.login;
  },
  data()
  {
    return{
      login: null
    }
  }
}
</script>