<template>
  <div class="app" v-bind:class="{'dark': this.$store.state.darkTheme}">
      <navbar/>
        <router-view :key="this.$route.params.login"/>
    <player/>
  </div>
</template>

<script>

import navbar from "@/components/navbar.vue"
import player from "@/components/player.vue"

export default
{
  name: 'app',
  components:
  {
    navbar,player
  },
  mounted()
  {

  },
  props:
  {

  }
}

</script>

<style>

.app
{
  height:100%;
  width:100%;
  background-color: var(--main-background-color);
  position:relative;
  display:flex;
  flex-direction: column;
  align-items:center;
  box-sizing: border-box;
  overflow:hidden;
}

a
{
  text-decoration: none;
}

.scr
{
  overflow-y:scroll;
  width:100%;
}

.scr
{
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scr::-webkit-scrollbar
{
  display: none;
}

.main
{
  padding:10px 0px 10px 0px;
  gap:20px;
  width:1180px;
  display:flex;
  flex-direction: column;
  margin-left:auto;
  margin-right:auto;
  overflow:hidden;
  z-index:1;
}

.row
{
  display:flex;
  flex-direction:row;
  overflow:hidden;
  gap:10px;
  height:100%;
}

.column
{
  display:flex;
  flex-direction:column;
  overflow:hidden;
  gap:10px;
  width:100%;
}

.display-none
{
  display:none;
}

nav
{
  display:flex;
  height:min-content;
  gap:10px;
  width:100%;
}

.button-primary
{
  display:flex;
  align-items: center;
  background-color: var(--accent-color);
  color: var(--soft-white);
  height:30px;
  font-size:14px;
  padding:0px 20px 0px 20px;
  border: none;
  border-radius:5px;
  text-decoration: none;
  cursor:pointer;
  white-space: nowrap;
}

.button-primary:hover
{
  transform: scale(1.1);
}

.button-primary:active
{
  transform: scale(1.0);
}

.button-secondary
{
  display:flex;
  align-items: center;
  background-color:none;
  color: var(--text-color-secondary);
  border: 1px solid var(--text-color-secondary);
  height:30px;
  font-size:14px;
  padding:0px 20px 0px 20px;
  border-radius:5px;
  text-decoration: none;
  cursor:pointer;
  white-space:nowrap;
  background:none;
  box-sizing: border-box;
  transition: 0.2s all
}

.toggled
{
  color:var(--accent-color);
  border-color:var(--accent-color);
}

.button-secondary:not(.toggled):hover
{
  color: var(--text-color-primary);
  border-color: var(--text-color-primary);
}

.button-link
{
  color: var(--text-color-primary);
  border: none;
  background-color: transparent;
  text-decoration: none;
  cursor:pointer;
  text-decoration: underline;
}

.button-link:active
{
  color: var(--text-color-secondary);
}

.round-button
{
  display:flex;
  justify-content:center;
  align-items: center;
  background:none;
  border:none;
  color: var(--text-color-primary);
  padding:0px;
  margin:0px;
  border-radius:50%;
  cursor:pointer;
}

.round-button.huge
{
  font-size:60px;
  height:58px;
  width:58px;
}

.round-button.large
{
  font-size:44px;
  height:42px;
  width:42px;
}

.round-button.medium
{
  font-size:30px;
  height:28px;
  width:28px;
}

.round-button.small
{
  font-size:22px;
  height:20px;
  width:20px;
}

.song-cover-wrapper
{
  display:flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;

  overflow:hidden;
  position:relative;
}

.playlist-cover-wrapper
{
  display:flex;
  justify-content: center;
  align-items: center;
  border-radius:10px;

  overflow:hidden;
  position:relative;

  box-sizing: border-box;
  border:2px solid var(--panel-border-color);
}

.user-image
{
  display:flex;
  justify-content:center;
  align-items: center;
  border-radius:50%;

  background-color: var(--panel-border-color);
  color:var(--text-color-secondary);
}

.s44x44
{
  width:44px;
  height:44px;
  flex-shrink:0;
  font-size:33px;
}

.s48x48
{
  width:48px;
  height:48px;
  flex-shrink:0;
  font-size:36px;
}

.s100x100
{
  width:100px;
  height:100px;
  flex-shrink:0;
  font-size:75px;
}

.s128x128
{
  width:128px;
  height:128px;
  font-size:64px;
  flex-shrink: 0;
}

.s160x160
{
  width:160px;
  height:160px;
  font-size:80px;
  flex-shrink: 0;
}

.s180x180
{
  width:180px;
  height:180px;
  flex-shrink:0;
  font-size:135px;
}

.s200x200
{
  width:200px;
  height:200px;
  flex-shrink:0;
  font-size:150px;
}



.primary-text
{
  color:var(--text-color-primary);
  display:inline;
  height:min-content;
}

.secondary-text
{
  color:var(--text-color-secondary);
  display:inline;
  height:min-content;
}

.primary-text-hoverable
{
	color:var(--text-color-primary);
  display:inline;
  height:min-content;
}

.primary-text-hoverable:hover
{
	color:var(--text-color-primary-hover);
}

.secondary-text-hoverable
{
	color:var(--text-color-secondary);
  display:inline;
  height:min-content;
}

.secondary-text-hoverable:hover
{
	color:var(--text-color-primary);
}

.fixed-top
{
	display:flex;
	font-size:32px;
	gap: 20px;
	color:var(--text-color-primary);
	padding-top:10px;
}

.user-list
{
	list-style: none;
	padding:0px;
	margin:0px;
	gap:20px;
	display:flex;
	flex-wrap:wrap;
	width:100%;
}

.user-banner
{
  position:relative;
  width:1240px;
  height:260px;
  background-color:green;
  padding:30px;
  box-sizing:border-box;
  flex-shrink:0;
  display:flex;
  background-image: url(https://i1.sndcdn.com/visuals-000754706119-8swAvk-t1240x260.jpg);
  gap:20px;
  margin-left:auto;
  margin-right:auto;
  border-bottom-left-radius:10px;
  border-bottom-right-radius:10px;
}

.user-banner-info
{
  display:flex;
  flex-direction:column;
  gap:10px;
}

.user-banner-info h2, .user-banner-info h3
{
  background-color:rgb(0,0,0,0.8);
  padding:5px;
  width:fit-content;
}

.user-banner-name
{
  color:var(--soft-white);
}

.user-banner-status
{
  color:var(--light-gray);
}

.nav-menu
{
  display:flex;
  gap:20px;
}

.navtab
{
  border-bottom:1px solid var(--panel-border-color);
}

.tablink
{
  display:flex;
  align-items: center;
  height:100%;
  color: var(--text-color-primary);
  cursor:pointer;
  text-decoration: none;
  white-space: nowrap;
  padding:0px 5px 0px 5px;
  font-size:18px;
}

.tablink:hover
{
  border-bottom:2px solid var(--text-color-primary);
}

.tablink.router-link-exact-active
{
  border-bottom:2px solid var(--accent-color);
  color: var(--accent-color);
}

.user-stats
{
  display:flex;
  gap:5px;
}


.user-stat
{
  width:100%;
  display:flex;
  flex-direction: column;
  justify-content:center;
  color: var(--text-color-secondary);
  cursor:pointer;
  text-decoration: none;
}

.user-stat:hover
{
  color: var(--text-color-primary);
}

.stat-value
{
  font-size:22px;
}

.user-link-list
{
  list-style: none;
  padding:0px;
  margin:0px;
}

.label
{
  display:flex;
  flex-direction: column;
  color: var(--text-color-primary);
  width:100%;
}

.my-input:focus
{
  border-color: var(--text-color-primary);
}

.error
{
  color:red;
}

.my-input
{
  outline-color: transparent;
  border: 2px solid var(--panel-border-color);
  box-sizing: border-box;
  background:none;
  color: var(--text-color-primary);
  border-radius:5px;
  transition:0.1s all;
}

.icon-text
{
  display:flex;
  gap:3px;
  align-items: center;
}

.icon-text > *
{
  display: inline-flex;
  align-items: center;
}

</style>