<template>
  <header class="header-wrapper" v-bind:class="{'dark': this.$store.state.darkTheme}">
    <nav>
      <div class="nav-mainmenu">
        <router-link class="logo" to="/discover">
          <img src="@/assets/images/logo.png" class = "logo" v-on:click="this.$store.dispatch('toggleTheme')">
        </router-link>
        <router-link class="navlink h4" to="/discover">Discover</router-link>
        <router-link class="navlink h4" to="/feed">Feed</router-link>
        <router-link class="navlink h4" to="/you">Library</router-link>
      </div>
      <div class="wrapper-search h4">
        <div class="search-panel">
          <input class="search" type="text" placeholder="Search music" name="search" autocomplete="off">
          <i class="fa fa-search"></i>
        </div>
      </div>
      <usermenu style="margin-left:auto"/>
    </nav>
  </header>
  <main v-bind:class="{'dark': this.$store.state.darkTheme}">
    <router-view :key="this.$route.params.login"/>
  </main>
  <footer style = "width:100%; z-index:1;" v-bind:class="{'dark': this.$store.state.darkTheme}"><player/> </footer>

  <div v-bind:class="{'dark': this.$store.state.darkTheme}">
    <ModalPlaylistView  v-if="this.$route.query.playlist" :id="this.$route.query.playlist"/>
    <ModalLogInView  v-if="this.$route.query.action=='login'"/>
    <ModalSignUpView  v-if="this.$route.query.action=='signup'"/>
  </div>

</template>

<script>


import usermenu from "@/components/usermenu.vue"
import player from "@/components/player.vue"

import ModalPlaylistView from "@/views/ModalPlaylistView.vue";
import ModalLogInView from "./views/ModalLogInView.vue";
import ModalSignUpView from "./views/ModalSignUpView.vue";

export default
{
  name: 'app',
  components:
  {
    usermenu, player, ModalPlaylistView, ModalLogInView, ModalSignUpView
  }
}

</script>

<style scoped>

.header-wrapper
  {
    width:100%;
    display:flex;
    justify-content: center;
    background-color: var(--nav-color);
  }

  .header-wrapper nav
  {
    width:1240px;
    height: 48px;
  }

  .logo
  {
    width:100px;
    height:100%;
    object-fit: scale-down;
    background-color: var(--soft-black);
  }

  .nav-mainmenu
  {
    display:flex;
  }

  .nav-mainmenu > *
  {
    border-right:1px solid var(--soft-black);
  }

  .navlink.router-link-active
  {
    color: var(--soft-white);
    background-color: var(--soft-black);
  }

</style>