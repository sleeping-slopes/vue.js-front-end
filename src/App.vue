<template>
  <header v-bind:class="{'dark': this.$store.state.darkTheme}">
    <nav>
      <ul class="nav-mainmenu h4">
        <li class = "logo"><router-link :to="{ name: 'Discover'}"><img src="@/assets/images/logo.png" v-on:click="this.$store.dispatch('toggleTheme')"></router-link></li>
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
      <usermenu class="right"/>
    </nav>
  </header>
  <main id="main" v-bind:class="{'dark': this.$store.state.darkTheme}">
    <router-view :key="JSON.stringify(this.$route.params)"/>
  </main>
  <footer v-bind:class="{'dark': this.$store.state.darkTheme}"><player/></footer>

  <div v-bind:class="{'dark': this.$store.state.darkTheme}">
    <playlistModal  v-if="this.$route.query.playlist" :id="this.$route.query.playlist"/>
    <logInModal  v-if="this.$route.query.action=='login'"/>
    <signUpModal  v-if="this.$route.query.action=='signup'"/>
  </div>

</template>

<script>


import usermenu from "@/components/usermenu.vue"
import player from "@/components/player.vue"

import playlistModal from "@/components/modals/playlistModal.vue";
import logInModal from "@/components/modals/logInModal.vue";
import signUpModal from "@/components/modals/signUpModal.vue";

export default
{
  name: 'app',
  components: { usermenu, player, playlistModal, signUpModal, logInModal },
  data()
  {
    return {
      searchQuery:""
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