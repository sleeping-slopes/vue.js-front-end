<template>
<div class="nav-loginmenu">
  <template v-if="!this.user">
    <router-link to="/signup" class="button-signup">Sign up</router-link>
    <router-link to="/login" class="button-main">Log in</router-link>
  </template>
  <template v-else>
    <div class="user-panel"
      @click="this.show=!this.show"
      v-bind:style= "[this.show ? {'background-color':'var(--panel-border-color)'} : {}]"
    >
      <div class = "user-profile-picture bi bi-person-fill"/>
      <span class="bi-caret-down-fill primary-text"></span>
    </div>
    <panel v-if="this.show" style="position:absolute;top:100%;right:0px; z-index:1000">
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

.nav-loginmenu
{
  display:flex;
  align-items:center;
  gap:10px;
  position:relative;

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
}

.user-panel:hover
{
background-color:var(--panel-border-color);
}

.button-signup
{
color: var(--text-color-secondary);
border: none;
background-color: transparent;
text-decoration: none;
cursor:pointer;
white-space:nowrap;
}

.button-signup:hover
{
color: var(--text-color-primary);
}

.button-signup:active
{
color: var(--text-color-secondary);
}

.button-main
{
background-color: var(--text-color-primary);
color: var(--main-background-color);
height:min-content;
width:min-content;
padding:5px 20px 5px 20px;
border-radius: 50vh;
cursor:pointer;
border: none;
white-space: nowrap;
text-decoration: none;
}

.button-main:hover
{
transform: scale(1.1);
}

.button-main:active
{
background-color: var(--text-color-secondary);
transform: scale(1.0);
}

</style>