<template>
<div class="content">
  <div class="column">
    <nav class="navtab" style="margin:20px 0px 20px 0px;">
      <div class="nav-menu">
        <router-link class="tablink h3" :to="{ name: 'YourSongs'}">Songs</router-link>
        <router-link class="tablink h3" :to="{ name: 'YourPlaylists'}">Playlists</router-link>
        <router-link class="tablink h3" :to="{ name: 'YourFollowing'}">Following</router-link>
        <router-link class="tablink h3" :to="{ name: 'YourHistory'}">History</router-link>
      </div>
    </nav>
    <router-view :login="login" :key="login"></router-view>
  </div>
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