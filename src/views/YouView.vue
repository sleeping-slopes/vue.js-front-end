<template>
<div class="content column">
    <nav class="navtab">
      <ul class="h3">
        <li><router-link :to="{ name: 'YourSongs'}">Songs</router-link></li>
        <li><router-link :to="{ name: 'YourPlaylists'}">Playlists</router-link></li>
        <li><router-link :to="{ name: 'YourFollowing'}">Following</router-link></li>
        <li><router-link :to="{ name: 'YourHistory'}">History</router-link></li>
      </ul>
    </nav>
    <router-view :login="login" :key="login"></router-view>
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
    if (!user.error) this.login = user.login;
  },
  data()
  {
    return{
      login:undefined
    }
  }
}
</script>