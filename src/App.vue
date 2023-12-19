<template>
  <div class="app" v-bind:class="{'dark': this.$store.state.darkTheme}">
      <navbar/>
      <!-- <main style="overflow:scroll; display:flex;"> -->
        <router-view :key="this.$route.params.login"/>
      <!-- </main> -->
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
    navbar, player
},
}

</script>

<style>

input[type=range][orient=vertical] {
    appearance: slider-vertical;
    width: 8px;
    height: 175px;
    padding: 0 5px;
}



ul
{
  list-style: none;
	padding:0px;
	margin:0px;
}

.ul-list
{
  width:100%;
  display:flex;
  flex-direction: column;
  height:100%;
  gap:5px;
}

.ul-grid
{
	gap:20px;
	display:flex;
	flex-wrap:wrap;
	width:100%;
}

.card
{
  display:flex;
  flex-direction: column;
  width:180px;
  padding:0px;
  gap:3px;
}

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
  height:100%;
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
  padding:0px 20px 0px 20px;
  border: none;
  border-radius:5px;
  text-decoration: none;
  cursor:pointer;
  white-space: nowrap;
}

.button-primary.hoverable:hover
{
  transform: scale(1.1);
}

.button-primary.hoverable:active
{
  transform: scale(1.0);
}

.button-secondary
{
  display:flex;
  align-items: center;
  color: var(--text-color-secondary);
  border: 1px solid var(--text-color-secondary);
  height:30px;
  padding:0px 20px 0px 20px;
  border-radius:5px;
  text-decoration: none;
  cursor:pointer;
  white-space:nowrap;
  background:none;
  box-sizing: border-box;
  transition: 0.2s all
}

.button-secondary.toggled
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
  transition:0.2s;
}

.round-button.toggled
{
    color: var(--accent-color);
}

.round-button.huge { font-size:60px; }

.round-button.large { font-size:44px; }

.round-button.medium { font-size:30px; }

.round-button.small { font-size:22px; }

.round-button.tiny { font-size:14px; }


/* /// */
.cover-wrapper
{
  display:flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  overflow:hidden;
  position:relative;
}

.cover
{
  position: absolute;
  height:100%;
  width:100%;
  background-color:var(--panel-border-color);
  color:var(--text-color-secondary);
  align-items: center;
  display:flex;
  justify-content:center;
}

.shade
{
  position:absolute;
  background-color: black;
  width:100%;
  height:100%;
  opacity:0.0;
  transition: 0.2s all;
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

.primary-text.hoverable:hover
{
	color:var(--text-color-primary-hover);
}

.secondary-text.hoverable:hover
{
	color:var(--text-color-primary);
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



.fixed-top
{
	display:flex;
	gap: 20px;
	padding-top:10px;
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
  width:max-content;
  gap:3px;
  align-items: center;
}

.icon-text > *
{
  display: inline-flex;
  align-items: center;
}

.gradient-bg
{
  background:
    linear-gradient(135deg, var(--panel-border-color) 10%, rgba(0,0,0,0) 45%, rgba(0,0,0,0) 55%, var(--panel-border-color) 90%),
    linear-gradient(180deg,var(--accent-color) -70%, var(--main-background-color) 90%);
}

.gradient-bg-reverse
{
  background:
    linear-gradient(315deg, var(--panel-border-color) 10%, rgba(0,0,0,0) 45%, rgba(0,0,0,0) 55%, var(--panel-border-color) 90%),
    linear-gradient(0deg,var(--accent-color) -70%, var(--main-background-color) 90%);
}

hr
{
  border: none;
  width:100%;
  border-top: 2px solid var(--panel-border-color);
  height: 0px;
  box-sizing: border-box;
  margin:0px;
}

.select-wrapper
{
  display:flex;
  justify-content: center;
  align-items: center;
  border:2px solid var(--accent-color);
  border-radius:10px;
  overflow:hidden;
  height:32px;
  box-sizing: border-box;
}

select
{
  background-color: var(--soft-white);
  color: var(--accent-color);
  height:100%;
  outline-color: transparent;
  padding-left:5px;
  padding-right:15px;
  border:none;
}

select:hover
{
  background-color:var(--accent-color);
  color:var(--soft-white);
}

option
{
  background-color: var(--soft-white);
  color:var(--soft-black);
}

option:checked
{
  background-color: var(--accent-color);
  color:var(--soft-white);
}

</style>