<template>
  <header class="header-wrapper">
    <nav>
      <div class="nav-mainmenu">
        <div class = "logo" v-on:click="this.$store.dispatch('toggleTheme')"></div>
        <router-link class="navlink" to="/discover">Discover</router-link>
        <router-link class="navlink" to="/feed">Feed</router-link>
        <router-link class="navlink" to="/library">Library</router-link>
      </div>
      <div class="wrapper-search">
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
    /* box-shadow: 0 2px 4px 0 rgba(0,0,0,.2); */
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
    /* height:100%; */
    display:flex;
    align-items: center;
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
    cursor:pointer;
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

  .wrapper-search
  {
    display:inline-flex;
    height:100%;
  }

  .wrapper-search i
  {
    padding-left: 12px;
    padding-right: 6px;
    color: var(--light-gray);
    transition: color 0.2s;
  }

  .search-panel
  {
    height:32px;
    background-color: var(--soft-white);
    border-radius: 8px;
    overflow:hidden;
    width:300px;
    min-width:200px;
    max-width:400px;
    white-space: nowrap;
    margin:auto;
    display:flex;
    justify-content:left;
    flex-direction: row-reverse;
    align-items: center;
  }

  ::placeholder
  {
    color: var(--light-gray);
  }

  .search
  {
    height:100%;
    width:100%;
    background-color: transparent;
    color: var(--dark-gray);
    border-style:none;
  }

  .search:focus
  {
    outline-color: transparent;
  }

  .search:not(:placeholder-shown) + i
  {
    color: var(--light-gray);
  }

  </style>
