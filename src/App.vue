<template>
  <header v-bind:class="{'dark': this.$store.state.darkTheme}">
    <nav>
      <div class="nav-mainmenu">
        <router-link :to="{ name: 'Discover'}">
          <img src="@/assets/images/logo.png" class = "logo" v-on:click="this.$store.dispatch('toggleTheme')">
        </router-link>
        <router-link :to="{ name: 'Discover'}" class="navlink h4">Discover</router-link>
        <router-link :to="{ name: 'Feed'}" class="navlink h4">Feed</router-link>
        <router-link :to="{ name: 'You'}" class="navlink h4">Library</router-link>
      </div>
      <div class="wrapper-search h4">
        <div class="search-panel">
          <input class="search" type="text" placeholder="Search music" name="search" autocomplete="off">
          <i class="fa fa-search"></i>
        </div>
      </div>
      <usermenu class="right"/>
    </nav>
  </header>
  <main v-bind:class="{'dark': this.$store.state.darkTheme}">
    <router-view :key="this.$route.params.login"/>
  </main>
  <footer v-bind:class="{'dark': this.$store.state.darkTheme}"><player/> </footer>

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

header
{
  width:100%;
  display:flex;
  justify-content: center;
  background-color: var(--nav-color);
}

header nav
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

footer
{
  width:100%;
  position:sticky;
  bottom:0px;
}

</style>