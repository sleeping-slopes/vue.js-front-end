<template>
    <teleport to=".app">
    <div class="modal-shade" style="background-color:rgba(0,0,0,0.5)">
      <div class="modal">
        <div class="panel" style="width:400px;">
            <div class ="panel-content" style="height:200px;font-size:2.5em;color:var(--text-color-primary)">
                Log in to SSS
            </div>
            <div class ="panel-content">
                <label>
                    Email or username
                    <input type="text"/>
                </label>
                <label>
                    Password
                    <input type="password"/>
                    Remember me
                </label>

                <div class = "wrapper-button-main">
                    <button class = "button-main">test</button>
                </div>

            </div>
            <hr />
            <div class ="panel-content" style="color:var(--text-color-primary)">
                <span>Don't have an account? <router-link to="signup" class="button-link">Sign up</router-link></span>
            </div>
        </div>
        <button class="bi bi-x modal-close-button" v-on:click="$router.back(-1)"/>
      </div>
    </div>
  </teleport>
  </template>

  <script>

  export default {
    name: 'logInModal',
  }
  </script>

<style>

label
{
  display:flex;
  flex-direction: column;
  color: var(--text-color-primary);
  width:100%;
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
  </style>