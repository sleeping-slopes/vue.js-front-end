<template>
  <header v-bind:class="{'dark': this.$store.state.darkTheme}">
    <nav>
      <ul class="nav-mainmenu h4">
        <li class = "logo"><router-link :to="{ name: 'Discover'}"><img src="@/assets/images/logo.png" v-on:click="this.$store.dispatch('toggleTheme')"></router-link></li>
        <li><router-link :to="{ name: 'Discover'}">Discover</router-link></li>
        <li><router-link :to="{ name: 'Feed'}">Feed</router-link></li>
        <li><router-link :to="{ name: 'You'}">Library</router-link></li>
      </ul>
      <label class="label-search-input dark h4">
        <input type="text" placeholder="Search music" autocomplete="off">
        <i class="fa fa-search"></i>
      </label>
      <usermenu class="right"/>
    </nav>
  </header>
  <main id="main" v-bind:class="{'dark': this.$store.state.darkTheme}">
    <router-view :key="JSON.stringify(this.$route.params)"/>
  </main>
  <footer v-bind:class="{'dark': this.$store.state.darkTheme}"><player/></footer>

  <div v-bind:class="{'dark': this.$store.state.darkTheme}">
    <ModalPlaylistView  v-if="this.$route.query.playlist" :id="this.$route.query.playlist"/>
    <ModalLogInView  v-if="this.$route.query.action=='login'"/>
    <ModalSignUpView  v-if="this.$route.query.action=='signup'"/>
  </div>

</template>

<script>


import usermenu from "@/components/usermenu.vue"
import player from "@/components/player.vue"
import songDropdown from "@/components/containers/songDropdown.vue"

import ModalPlaylistView from "@/views/ModalPlaylistView.vue";
import ModalLogInView from "./views/ModalLogInView.vue";
import ModalSignUpView from "./views/ModalSignUpView.vue";

export default
{
  name: 'app',
  components:
  {
    usermenu, player, ModalPlaylistView, ModalLogInView, ModalSignUpView,songDropdown
  },
}

</script>

<style scoped>

.logo
{
  background-color: var(--soft-black);
}

.logo a
{
  padding:0px;
}

.logo img
{
  height:100%;
  object-fit: scale-down;
  background-color: var(--soft-black);
}

footer
{
  width:100%;
  position:sticky;
  bottom:0px;
  border-top:2px solid var(--panel-border-color);
  z-index:1;
}

</style>