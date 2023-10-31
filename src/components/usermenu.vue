<template>
    <div :key="this.user">
      <div class="nav-loginmenu sidebar-width" v-if="this.user">
        <div class="user-panel"
          @click="this.show=!this.show"
          v-bind:style= "[this.show ? {'background-color':'var(--panel-background-color)'} : {}]"
          >
          <img class = "user-profile-picture" v-if="this.user.profile_picture"
          :src="require(`../assets/profile pictures/${this.user.profile_picture}`)"/>
          <div class = "user-profile-picture bi bi-person-fill" v-else/>
          <span class="bi-caret-down-fill primary-text"></span>

        </div>
        <div class="panel"
        style="position:absolute;z-index:1;width:400px;top:100%;right:0px;padding:10px;gap:20px;box-shadow: 0px 48px 20px 10px rgba(255, 255, 255, 0.2);"
        v-show="show"
        @blur="close"
        >
          <div class="usercard">
            <img class = "user-profile-picture" v-if="this.user.profile_picture" :src="require(`../assets/profile pictures/${this.user.profile_picture}`)"/>
            <div class = "user-profile-picture bi bi-person-fill" v-else/>
            <div class="userdata">
              <span class="primary-text">{{ this.user.username }}</span>
              <span class="primary-text">{{ this.user.email }}</span>
            </div>
          </div>
          <div class = "usermenu">
            <button class ="usermenu-button"><span class="bi bi-gear usermenu-button-icon"></span><span>Settings</span></button>
            <button class ="usermenu-button" v-on:click="this.$store.dispatch('toggleTheme')">
              <span class="bi bi-palette usermenu-button-icon"></span><span>Mode</span>
            </button>
            <button class ="usermenu-button" v-on:click="this.$store.dispatch('logOut')">
              <span class="bi bi-box-arrow-right usermenu-button-icon"></span><span>Sign out</span>
            </button>
          </div>
        </div>
      </div>
      <div class="nav-loginmenu sidebar-width" v-else>
          <router-link to="/signup" class="button-signup">Sign up</router-link>
          <router-link to="/login" class="button-main">Log in</router-link>
      </div>

    </div>
</template>


<script>

import {getUser} from "@/axios/getters.js"


export default {
  name: 'usermenu',
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
    // console.log(r);
    // this.user = this.$store.getters.getJWT;
  },
  watch:
  {
    async '$store.getters.getJWT'(playlistSong)
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
  beforeDestroy ()
  {
    document.removeEventListener('click',this.close)
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
justify-content: right;
align-items: center;

margin-left:auto;
gap:10px;
position:relative;
}

.user-panel
{
  display:flex;
  justify-content: right;
  align-items: center;
  height:100%;
  margin-left:auto;
  gap:10px;
  position:relative;
  color:var(--text-color-primary);
  padding-left:10px;
  padding-right:10px;
}

.user-panel:hover
{
background-color:var(--panel-background-color);
}

.button-signup
{
color: var(--text-color-secondary);
border: none;
background-color: transparent;
text-decoration: none;
cursor:pointer;
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