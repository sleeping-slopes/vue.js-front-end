<template>
  <div class="app" v-bind:class="{'dark': this.$store.state.darkTheme}">
      <navbar/>

        <router-view/>
      <!-- </div> -->
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

.main
{
  padding:10px 0px 10px 0px;
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
}

.button-secondary:hover
{
  color: var(--text-color-primary);
  border-color: var(--text-color-primary);
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

</style>