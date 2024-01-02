<template>
<div class="nav-loginmenu">
  <template v-if="!this.user">
    <button v-on:click="$router.push({path: $route.fullPath,query:{action:'signup'}})" class="button-secondary dark hoverable h5 ">Sign up</button>
    <button v-on:click="$router.push({path: $route.fullPath,query:{action:'login'}})" class="button-primary hoverable h5">Log in</button>
  </template>
  <template v-else>
    <router-link to="/upload" class="navlink">Upload</router-link>
    <div class="user-panel" @click="this.show=!this.show" v-bind:style="this.show?{'background-color':'var(--soft-black)'}:{}">
      <img class = "user-image s36x36" :src="picturesrc" v-if="imageAvailable" @error="imageAvailable=false"/>
      <div class = "user-image s36x36 bi bi-person-fill" v-else/>
      <span class="bi-caret-down-fill user-panel-carets" v-bind:style="{'color':'var(--light-gray)'}"></span>
      <panel v-if="this.show" style="position:absolute;top:100%;left:0; z-index:999;width:150px">
        <template v-slot:content>
          <div class = "usermenu">
            <router-link :to="{ name: 'User', params: { login: this.user }}" class="usermenu-button">
              <span class="bi-person-fill usermenu-button-icon"></span>
              <span>Profile</span>
            </router-link>
            <button class ="usermenu-button" v-on:click="this.$store.dispatch('toggleTheme')">
              <span class="bi bi-palette usermenu-button-icon"></span>
              <span>Mode</span>
            </button>
            <button class ="usermenu-button" v-on:click="this.$store.dispatch('logOut'); this.$router.push({name: 'Discover'});">
              <span class="bi bi-box-arrow-right usermenu-button-icon"></span>
              <span>Sign out</span>
            </button>
          </div>
        </template>
      </panel>
    </div>
  </template>
</div>
</template>

<script>

import panel from "@/components/containers/panel.vue"
import API from "@/axios/API";

export default {
  name: 'usermenu',
  components:{ panel },
  data()
  {
    return {
      show:false,
      user:undefined,

      imageAvailable: true
    }
  },
  computed:
  {
    picturesrc() { return API.defaults.baseURL+`users/`+this.user+`/picture` }
  },
  async created()
  {
    const userByToken = await API.get('me');
    if (userByToken.error)
    {
      this.user=undefined;
      this.$store.state.loggedIn = false;
    }
    else
    {
      this.user=userByToken.login;
      this.$store.state.loggedIn = true;
    }
  },
  watch:
  {
    async '$store.state.authJWT'(playlistSong)
    {
      const userByToken = await API.get('me');
      if (userByToken.error)
      {
        this.user=undefined;
        this.$store.state.loggedIn = false;
      }
      else
      {
        this.user=userByToken.login;
        this.$store.state.loggedIn = true;
      }
    }
  },
  mounted()
  {
    document.addEventListener('click', this.close);
  },
  beforeDestroy()
  {
    document.removeEventListener('click',this.close);
  },
  methods:
  {
    close(e)
    {
      if (!this.$el.contains(e.target)) this.show = false;
    }
  }
}
</script>

<style scoped>

.usermenu
{
  display:flex;
  flex-direction: column;
  gap:3px;
}

.usermenu-button
{
  background:none;
  color:var(--text-color-primary);
  text-align: left;
  border:none;
  cursor:pointer;
  align-items: center;
  gap:10px;
  border-radius:10px;
  padding: 5px 5px 5px 5px;
}

.usermenu-button:hover
{
  background-color:var(--selected-item-background-color);
}

.usermenu-button-icon
{
  color:var(--accent-color);
  padding-right:7px;
}

.nav-loginmenu
{
  display:flex;
  align-items:center;
  gap:10px;
  position:relative;
  height:100%;
  float:right;
}

.user-panel
{
  position:relative;
  display:flex;
  align-items: center;
  margin-left:auto;
  gap:10px;
  padding-left:10px;
  padding-right:10px;
  height:100%;
}

.user-panel:hover
{
  background-color:var(--soft-black);
}

</style>