<template>
<div class="scr">
  <div class="main" style="gap:30px">
    <nav class="navtab" style="margin:30px 0px 0px 0px;">
      <div class="nav-menu">
        <router-link class="tablink h3" :to="{ name: 'YourSongs'}">Songs</router-link>
        <router-link class="tablink h3" :to="{ name: 'YourPlaylists'}">Playlists</router-link>
        <router-link class="tablink h3" :to="{ name: 'YourFollowing'}">Following</router-link>
        <router-link class="tablink h3" :to="{ name: 'YourHistory'}">History</router-link>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</div>
</template>

<script>

export default
{
  name: 'YouView'
}
</script>

<style>

</style>