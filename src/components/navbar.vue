<template>
    <nav>
      <div class = "logo sidebar-width" v-on:click="this.$store.dispatch('toggleTheme')"></div>
      <div class="nav-mainmenu">
        <router-link class="navlink" to="/discover">Discover</router-link>
        <router-link class="navlink" to="/library">My library</router-link>
        <div class="wrapper-search">
          <div class="search-panel">
            <input class="search" type="text" placeholder="Search music" name="search" autocomplete="off">
            <i class="fa fa-search"></i>
          </div>
        </div>
      </div>
      <usermenu/>
    </nav>
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

  nav
  {
    height: 44px;
    min-height:44px;
    display:flex;
    align-items: center;
    gap:10px;
  }

  .sidebar-width
  {
    min-width:360px;
    width:360px;
    max-width:360px;
  }

  .logo
  {
    /* background: url('img/pixelated logo.png') center center no-repeat; */
    background-size:contain;
    height:100%;
    background-color: cornflowerblue;
  }

  .nav-mainmenu
  {
    width:100%;
    height:100%;
    display:flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }

  .navlink
  {
    color: var(--text-color-secondary);
    border: none;
    background-color: transparent;
    cursor:pointer;
    transition: all 0.2s;
    position:relative;
    text-decoration: none;
    white-space: nowrap;

    font-size:1.25rem;
    font-weight:bold;
  }

  .navlink:hover
  {
    color: var(--text-color-primary);
  }

  .navlink.router-link-active
  {
    color: var(--text-color-primary);
    background:none;
  }

  .navlink.router-link-active::after
  {
    content:"";
    position:absolute;
    width:100%;
    height:2px;
    background-color:cornflowerblue;
    left:0;
    right:0;
    border-radius:50vh;
    margin-left: auto;
    margin-right: auto;
    bottom:-3px;
  }

  .wrapper-search
  {
    display:inline-flex;
    height:100%;
  }

  .wrapper-search i
  {
    padding-left: 12px;
    padding-right: 6px;
    color: var(--text-color-secondary);
    transition: color 0.2s;
  }

  .search-panel
  {
    height:32px;
    background-color: var(--panel-background-color);
    border-radius: 32px;
    overflow:hidden;
    width:100%;
    min-width:200px;
    max-width:400px;
    white-space: nowrap;
    margin:auto;
    display:flex;
    flex-direction: row-reverse;
    align-items: center;
  }

  ::placeholder
  {
    color: var(--text-color-secondary);
  }

  .search
  {
    height:100%;
    background-color: transparent;
    color: var(--text-color-primary);
    border-style:none;
  }

  .search:focus
  {
    outline:none;
  }

  .search:not(:placeholder-shown) + i
  {
    color: var(--text-color-primary);
  }

  </style>