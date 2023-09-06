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
      <div class="nav-usermenu sidebar-width">
        <div class="wrapper-button-main"><button class="button-signup">Sign up</button></div>
        <div class="wrapper-button-main"><button class="button-main">Log in</button></div>
      </div>

    </nav>
  </template>


  <script>
  export default {}
  </script>

  <style>

  nav
  {
    height: 44px;
    min-height:44px;
    display:flex;
    align-items: center;
    gap:10px;
    user-select: none;
  }

  .sidebar-width
  {
    min-width:400px;
    width:400px;
    max-width:400px;
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
    font-size:18px;
    font-family: "Kanit semibold", sans-serif;
    cursor:pointer;
    transition: all 0.2s;
    position:relative;
    text-decoration: none;
    white-space: nowrap;
  }

  .navlink:hover
  {
    color: var(--text-color-primary);
  }

  .router-link-active
  {
    color: var(--text-color-primary);
    background:none;
  }

  .router-link-active::after
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
    font-size:16px;
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
    width:97%;
    background-color: transparent;
    color: var(--text-color-primary);
    border-style:none;
    font-size:16px;
    font-family: "Kanit regular", sans-serif;

  }

  .search:focus
  {
    outline:none;
  }

  .search:not(:placeholder-shown) + i
  {
    color: var(--text-color-primary);
  }

  .nav-usermenu
  {
    display:flex;
    justify-content: right;
    align-items: center;
    height:100%;
    margin-left:auto;
  }

  .wrapper-button-main
  {
    display:inline-flex;
    height:100%;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    min-width:120px;
  }

  .button-signup
  {
    color: var(--text-color-secondary);
    border: none;
    background-color: transparent;
    font-size:16px;
    font-family: "Kanit semibold", sans-serif;
    cursor:pointer;
  }

  .button-signup:hover
  {
    font-size:18px;
    color: var(--text-color-primary);
  }

  .button-signup:active
  {
    font-size:18px;
    color: var(--text-color-secondary);
  }

  .button-main
  {
    background-color: var(--text-color-primary);
    color: var(--main-background-color);
    font-size:16px;
    font-family: "Kanit semibold", sans-serif;
    height:min-content;
    width:min-content;
    padding:5px 30px 5px 30px;
    border-radius: 50vh;
    cursor:pointer;
    border: none;
  }

  .button-main:hover
  {
    font-size:18px;
  }

  .button-main:active
  {
    font-size:16px;
    background-color: var(--text-color-secondary);
  }

  </style>