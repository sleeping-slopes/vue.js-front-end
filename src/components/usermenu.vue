<template>
<div class="nav-loginmenu">
  <template v-if="!this.user">
    <router-link to="/signup" class="button-secondary">Sign up</router-link>
    <router-link to="/login" class="button-primary">Log in</router-link>
  </template>
  <template v-else>
    <div class="user-panel"
      @click="this.show=!this.show"
      v-bind:style= "[this.show ? {'background-color':'#111111'} : {}]"
    >
      <div class = "user-profile-picture-dark bi bi-person-fill"/>
      <span class="bi-caret-down-fill" style="color:#808080"></span>
    </div>
    <panel v-if="this.show" style="position:absolute;top:100%;right:0px; z-index:999">
      <template v-slot:content>
        <div class="usercard">
          <div class = "user-profile-picture bi bi-person-fill"/>
          <div class="userdata">
            <span class="primary-text">{{ this.user.username }}</span>
            <span class="primary-text">{{ this.user.email }}</span>
          </div>
        </div>
        <div class = "usermenu">
          <button class ="usermenu-button">
            <span class="bi bi-gear usermenu-button-icon"></span>
            <span>Settings</span>
          </button>
          <button class ="usermenu-button" v-on:click="this.$store.dispatch('toggleTheme')">
            <span class="bi bi-palette usermenu-button-icon"></span>
            <span>Mode</span>
          </button>
          <button class ="usermenu-button" v-on:click="this.$store.dispatch('logOut')">
            <span class="bi bi-box-arrow-right usermenu-button-icon"></span>
            <span>Sign out</span>
          </button>
        </div>
      </template>
    </panel>
  </template>
</div>
</template>

<script>

import {getUser} from "@/axios/getters.js"

import panel from "@/components/panel.vue"

export default {
  name: 'usermenu',
  components:{ panel },
  data()
  {
    return {
      show:false,
      user:undefined,
    }
  },
  async created()
  {
    const r = await getUser();
    if (r.status===200) this.user=r.values;
    else this.user=undefined;
  },
  watch:
  {
    async '$store.state.authJWT'(playlistSong)
    {
      const r = await getUser();
      if (r.status===200) this.user=r.values;
      else this.user=undefined;
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

<style>

.usermenu
{
  display:flex;
  flex-direction: column;
  gap:5px;
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
  padding-top:5px;
  padding-bottom:5px;
}

.usermenu-button:hover
{
  background-color:var(--selected-item-background-color);
}

.usermenu-button-icon
{
  color:cornflowerblue;
  padding-right:5px;
}

.primary-text
{
  color:var(--text-color-primary);
  white-space: nowrap;
}

.usercard
{

  padding:10px;
  background-color:var(--selected-item-background-color);
  border-radius: 10px;
  display:flex;
  flex-direction: row;
  gap:10px;
}

.userdata
{

  display:flex;
  width:100%;
  flex-direction: column;
}

.user-profile-picture
{
  height:44px;
  width:44px;
  flex-shrink: 0;
  border-radius: 50%;
  background-color:var(--panel-border-color);
  color:var(--text-color-secondary);
  align-items: center;
  display:flex;
  justify-content:center;
  font-size:2em;
}

.user-profile-picture-dark
{
  height:44px;
  width:44px;
  flex-shrink: 0;
  border-radius: 50%;
  /* background-color:#1d232f; */
  color:#808080;
  align-items: center;
  display:flex;
  justify-content:center;
  font-size:2em;
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
  background-color:#111111;
}

</style>