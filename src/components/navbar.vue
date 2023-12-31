<template>
  <header class="header-wrapper">
    <nav>
      <div class="nav-mainmenu">
        <div class = "logo" v-on:click="this.$store.dispatch('toggleTheme')"></div>
        <router-link class="navlink h4" to="/discover">Discover</router-link>
        <router-link class="navlink h4" to="/feed">Feed</router-link>
        <router-link class="navlink h4" to="/you">Library</router-link>
      </div>
      <div class="wrapper-search h4">
        <div class="search-panel">
          <input class="search" type="text" placeholder="Search music" name="search" autocomplete="off">
          <i class="fa fa-search"></i>
        </div>
      </div>
      <usermenu style="margin-left:auto"/>
    </nav>
  </header>
</template>


  <script>

  import usermenu from "@/components/usermenu.vue"

  export default
  {
    name: 'navbar',
    components:{ usermenu }
  }
  </script>

  <style>

  .header-wrapper
  {
    width:100%;
    display:flex;
    justify-content: center;
    background-color: var(--nav-color);
  }

  .header-wrapper nav
  {
    width:1240px;
    min-height:48px;
    height: 48px;
    max-height:48px;
  }

  .logo
  {
    background: url('/src/assets/img/pixelated logo.png') center center no-repeat;
    width:100px;
    background-size:contain;
    height:100%;
    background-color: var(--soft-black);
  }

  .nav-mainmenu
  {
    display:flex;
  }

  .nav-mainmenu > *
  {
    border-right:1px solid var(--soft-black);
  }

  .navlink
  {
    color: var(--light-gray);
    height:100%;
    box-sizing:border-box;
    transition: all 0.2s;
    text-decoration: none;
    white-space: nowrap;
    padding:0px 20px 0px 20px;
    display:flex;
    align-items: center;
  }

  .navlink:hover
  {
    color: var(--soft-white);
  }

  .navlink.router-link-active
  {
    color: var(--soft-white);
    background-color: var(--soft-black);
  }

  </style>
