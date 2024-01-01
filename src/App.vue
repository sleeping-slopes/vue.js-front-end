<template>

  <div class="app" v-bind:class="{'dark': this.$store.state.darkTheme}">
    <ModalPlaylistView v-if="this.$route.query.playlist" :id="this.$route.query.playlist"></ModalPlaylistView>
    <ModalLogInView v-if="this.$route.query.action=='login'"></ModalLogInView>
    <ModalSignUpView v-if="this.$route.query.action=='signup'"></ModalSignUpView>
    <navbar/>
    <main>
      <router-view :key="this.$route.params.login"/>
    </main>
    <player/>
  </div>
</template>

<script>

import navbar from "@/components/navbar.vue"
import player from "@/components/player.vue"

import ModalPlaylistView from "@/views/ModalPlaylistView.vue";
import ModalLogInView from "./views/ModalLogInView.vue";
import ModalSignUpView from "./views/ModalSignUpView.vue";

export default
{
  name: 'app',
  components:
  {
    navbar, player, ModalPlaylistView, ModalLogInView, ModalSignUpView
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