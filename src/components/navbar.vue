<template>
  <div class="nav-wrapper">
    <nav>
      <div class="nav-mainmenu">
        <div class = "logo" v-on:click="this.$store.dispatch('toggleTheme')"></div>
        <router-link class="navlink" to="/discover">Home</router-link>
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
  </div>
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

  .nav-wrapper
  {
    width:100%;
    display:flex;
    justify-content: center;
    background-color: #1d232f;
    /* border-bottom:2px solid var(--panel-border-color); */
    box-shadow: 0 -6px 14px 0 rgba(0,0,0,.2);
  }

  nav
  {
    width:1240px;
    max-height:48px;
    height: 48px;
    min-height:48px;
    display:flex;
    gap:15px;
  }

  .logo
  {
    background: url('/src/assets/img/pixelated logo.png') center center no-repeat;
    width:100px;
    background-size:contain;
    height:100%;
    background-color: #111111;
  }

  .nav-mainmenu
  {
    /* width:100%; */
    height:100%;
    display:flex;
    /* justify-content: space-around; */
    /* gap:10px; */
    align-items: center;
    /* background-color:red; */
  }

  .navlink
  {
    color: #808080;
    height:100%;
    border-right:1px solid #111111;
    box-sizing:border-box;
    cursor:pointer;
    transition: all 0.2s;
    position:relative;
    text-decoration: none;
    white-space: nowrap;

    padding:0px 20px 0px 20px;
    display:flex;
    align-items: center;
  }

  .navlink:hover
  {
    color: #ffffff;
  }

  .navlink.router-link-active
  {
    color: #ffffff;
    background-color: #111111;
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
    color: #808080;
    transition: color 0.2s;
  }

  .search-panel
  {
    height:32px;
    background-color: #e5e5e5;
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
    color: #808080;
  }

  .search
  {
    height:100%;
    width:100%;
    background-color: transparent;
    color: #404040;
    border-style:none;
  }

  .search:focus
  {
    outline:none;
  }

  .search:not(:placeholder-shown) + i
  {
    color: #404040;
  }

  </style>