<template>
<div class="content column">
    <nav class="navtab" style="margin:20px 0px 20px 0px;">
      <div class="nav-menu">
        <router-link :to="{ name: 'YourSongs'}" class="tablink h3">Songs</router-link>
        <router-link :to="{ name: 'YourPlaylists'}" class="tablink h3">Playlists</router-link>
        <router-link :to="{ name: 'YourFollowing'}" class="tablink h3">Following</router-link>
        <router-link :to="{ name: 'YourHistory'}" class="tablink h3">History</router-link>
      </div>
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