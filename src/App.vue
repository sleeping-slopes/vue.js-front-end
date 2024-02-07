<template>
  <header v-bind:class="{'dark': this.$store.state.darkTheme}">
    <nav class="nav-header">
      <ul class="nav-menu nav-main-menu h4">
        <li class = "logo"><router-link :to="{ name: 'Discover'}"><img src="@/assets/images/logo.png"></router-link></li>
        <li><router-link :to="{ name: 'Discover'}">Discover</router-link></li>
        <li><router-link :to="{ name: 'Feed'}">Feed</router-link></li>
        <li><router-link :to="{ name: 'You'}">Library</router-link></li>
      </ul>
      <form @submit.prevent="this.search()">
        <label class="label-search-input dark h4">
          <input type="text" v-model="this.searchQuery" placeholder="Search music" autocomplete="off">
          <i class="fa fa-search"></i>
        </label>
      </form>
      <template v-if="user !== null">
        <ul class="nav-menu right gap-10 h5" v-if="!this.user">
          <li><button v-on:click="$router.push({path: $route.fullPath,query:{action:'signup'}})" class="button button-secondary dark">Sign up</button></li>
          <li><button v-on:click="$router.push({path: $route.fullPath,query:{action:'login'}})" class="button button-primary hoverable">Log in</button></li>
        </ul>
        <ul class="nav-menu right h4" v-else>
          <li><router-link to="/upload">Upload</router-link></li>
          <li>
            <contextMenuNav>
              <template v-slot:header>
                <button class="button">
                  <span class="icon-text gap-10">
                    <div>
                      <img class = "user-image s36x36" :src="picturesrc" v-if="imageAvailable" @error="imageAvailable=false"/>
                      <div class = "user-image s36x36 bi bi-person-fill" v-else></div>
                    </div>
                    <span class = "bi bi-caret-down-fill" ></span>
                  </span>
                </button>
              </template>
              <template v-slot:options>
                <li>
                  <button v-on:click="$router.push({ name: 'User', params: { login: this.user }})" class = "button h5">
                    <span class="icon-text">
                      <span class="accent-text bi bi-person-fill"></span>
                      <span>Profile</span>
                    </span>
                  </button>
                </li>
                <li>
                  <button v-on:click="$router.push({ name: 'Settings' })" class = "button h5">
                    <span class="icon-text">
                      <span class="accent-text bi bi-gear-fill"></span>
                      <span>Settings</span>
                    </span>
                  </button>
                </li>
                <li>
                  <button v-on:click="this.$store.dispatch('logOut'); this.$router.push({name: 'Root'});" class = "button h5">
                    <span class="icon-text">
                      <span class="accent-text bi bi-box-arrow-right"></span>
                      <span>Sign out</span>
                    </span>
                  </button>
                </li>
              </template>
            </contextMenuNav>
          </li>
        </ul>
      </template>
    </nav>
  </header>

  <main id="main" v-bind:class="{'dark': this.$store.state.darkTheme}">
    <router-view :key="JSON.stringify(this.$route.params)"/>
  </main>

  <footer v-bind:class="{'dark': this.$store.state.darkTheme}">
    <player/>
  </footer>

  <div v-bind:class="{'dark': this.$store.state.darkTheme}">
    <playlistModal  v-if="this.$route.query.playlist" :id="this.$route.query.playlist"/>
    <logInModal  v-if="this.$route.query.action=='login'"/>
    <signUpModal  v-if="this.$route.query.action=='signup'"/>
  </div>

</template>

<script>


import API from "@/axios/API";

import contextMenuNav from "@/components/containers/contextMenuNav.vue"
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
      searchQuery:"",
      user: null,
      imageAvailable: true
    }
  },
  computed:
  {
    picturesrc() { return API.defaults.baseURL+`users/`+this.user+`/picture` }
  },
  watch:
  {
    '$store.state.authJWT':
    {
      handler: async function(value)
      {
        const userByToken = await API.get('me');
        this.user = userByToken.login;
        this.$store.state.loggedIn = !!this.user;
      },
      immediate: true
    }
  },
  methods:
  {
    search()
    {
      if (!this.searchQuery.trim()) return;
      if (this.$route.matched.some(route => route.name == "Search")) return this.$router.push({name: this.$route.name, query: { q: this.searchQuery.trim() } });
      return this.$router.push({ name: 'Search', query: { q: this.searchQuery.trim() } });
    }
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
  z-index:2;
}

header .logo { background-color: var(--soft-black); }

header .logo a { padding:0px; }

header .logo img
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
  z-index:2;
}

</style>