<template>
  <div class="app" v-if="this.$store.getters.getCurrentUser !== undefined"  v-bind:class="{'dark-theme': this.darkTheme}">

    <header>
      <nav class="nav-header">
        <ul class="nav-menu nav-main-menu">
          <li class="logo"><router-link :to="{ name: 'Discover'}"><img src="/assets/logo.png"></router-link></li>
          <li><router-link :to="{ name: 'Discover'}">Discover</router-link></li>
          <li><router-link :to="{ name: 'Feed'}">Feed</router-link></li>
          <li><router-link :to="{ name: 'You'}">Library</router-link></li>
        </ul>
        <form @submit.prevent="this.search()">
          <label class="label-search dark-theme">
            <input type="text" v-model="this.searchQuery" placeholder="Search music" autocomplete="off">
            <i class="fa fa-search"></i>
          </label>
        </form>
        <ul class="nav-menu right gap-10" v-if="!this.$store.getters.getCurrentUser">
          <li><button v-on:click="$router.push({path: $route.fullPath,query:{action:'signup'}})" class="button button-secondary dark-theme">Sign up</button></li>
          <li><button v-on:click="$router.push({path: $route.fullPath,query:{action:'login'}})" class="button button-primary hoverable">Log in</button></li>
        </ul>
        <ul class="nav-menu right" v-else>
          <li><router-link :to="{ name:'Upload'}">Upload</router-link></li>
          <li>
            <contextMenuNav style="width:64px;">
              <template v-slot:header>
                <button class="button">
                  <span class="icon-text gap-5">
                    <div>
                      <img class="user-image s36x36" v-if="this.$store.getters.getCurrentUser.profile_picture" :src="picturesrc"/>
                      <div class="user-image s36x36 bi bi-person-fill" v-else></div>
                    </div>
                    <span class="font-size-small bi bi-caret-down-fill" ></span>
                  </span>
                </button>
              </template>
              <template v-slot:options>
                <li>
                  <router-link :to="{ name: 'User', params: { login: this.$store.getters.getCurrentUser.login }}" class="button">
                    <span class="icon-text">
                      <span class="accent-text bi bi-person-fill"></span>
                      <span>Profile</span>
                    </span>
                  </router-link>
                </li>
                <li>
                  <router-link :to="{ name: 'Settings' }" class="button">
                    <span class="icon-text">
                      <span class="accent-text bi bi-gear-fill"></span>
                      <span>Settings</span>
                    </span>
                  </router-link>
                </li>
                <li>
                  <button v-on:click="this.$store.dispatch('logOut'); this.$router.push({name: 'Root'});" class="button">
                    <span class="icon-text">
                      <span class="accent-text bi bi-box-arrow-right"></span>
                      <span>Sign out</span>
                    </span>
                  </button>
                </li>
              </template>
            </contextMenuNav>
          </li>
          <li>
            <router-link :to="{ name: 'Notifications'}" class="bi bi-bell-fill"></router-link>
          </li>
          <li>
            <router-link :to="{ name: 'Messages'}" class="bi bi-envelope-fill"></router-link>
          </li>
        </ul>
      </nav>
    </header>

    <main id="main">
      <router-view :key="JSON.stringify(this.$route.params)"/>
    </main>

    <footer>
      <div style="background-color:var(--panel-background-color);width:100%;"></div>
      <player></player>
      <div style="background-color:var(--panel-background-color);width:100%;"></div>
    </footer>

    <playlistModal v-if="this.$route.query.playlist" :id="this.$route.query.playlist"></playlistModal>
    <logInModal v-if="this.$route.query.action=='login'"></logInModal>
    <signUpModal v-if="this.$route.query.action=='signup'"></signUpModal>
  </div>
</template>

<script>

import API from "@/axios/API";

import contextMenuNav from "@/components/containers/contextMenu/contextMenuNav.vue"
import player from "@/components/player.vue"

import playlistModal from "@/components/modals/playlistModal.vue";
import logInModal from "@/components/modals/logInModal.vue";
import signUpModal from "@/components/modals/signUpModal.vue";

export default
{
  name: 'app',
  components: { contextMenuNav, player, playlistModal, signUpModal, logInModal },
  data()
  {
    return {
      searchQuery:""
    }
  },
  computed:
  {
    picturesrc() { return API.defaults.baseURL+`users/`+this.$store.getters.getCurrentUser?.login+`/picture` },
    darkTheme()
    {
      if (this.$store.getters.getCurrentUser && this.$store.getters.getCurrentUser.custom_theme)
      {
        return this.$store.getters.getCurrentUser.theme;
      }
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
  },
  methods:
  {
    authJWTChangedHandler(event)
    {
      if (event.key == 'authJWT') this.$store.dispatch('setCurrentUserByToken');
    },
    search()
    {
      if (!this.searchQuery.trim()) return;
      if (this.$route.matched.some(route => route.name == "Search")) return this.$router.push({name: this.$route.name, query: { q: this.searchQuery.trim() } });
      return this.$router.push({ name: 'Search', query: { q: this.searchQuery.trim() } });
    }
  },
  created()
  {
    this.$store.dispatch('setCurrentUserByToken');
  },
  mounted()
  {
    window.addEventListener('storage', this.authJWTChangedHandler);
  },
  beforeUnmount()
  {
    document.removeEventListener('storage', this.authJWTChangedHandler);
  }
}

</script>

<style scoped>

.app
{
  width:100%;
  height:100%;
  display:flex;
  flex-direction: column;
}

header .logo { background-color: var(--soft-black); }

header .logo a { padding:0px; }

header .logo img { height:100%; }

</style>