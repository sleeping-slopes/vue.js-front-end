<template>
  <teleport to=".app">
  <div class="modal-shade" style="background-color:rgba(0,0,0,0.5)">
    <div class="modal">
      <div class="panel" style="width:400px;">
          <div class ="panel-content" style="height:200px;font-size:2.5em;color:var(--text-color-primary)">
              Log in to SSS
          </div>
          <form @submit.prevent="logIn" class ="panel-content" style="gap:10px">
              <label class = "label">
                  Email or username
                  <input class="my-input" type="text" v-bind:style="username.error?{'border-color':'red'}:{}"
                  placeholder="Enter email or username"
                  v-model="username.data"/>
                  <div class="error-message" v-if=username.error>
                    <span class="bi bi-exclamation-circle-fill"></span>
                    {{ username.error }}
                  </div>
              </label>
              <label class = "label">
                  Password
                  <input class="my-input" type="password" v-bind:style="password.error?{'border-color':'red'}:{}"
                  placeholder="Enter password"
                  v-model="password.data"/>
                  <div class="error-message" v-if=password.error>
                    <span class="bi bi-exclamation-circle-fill"></span>
                    {{ password.error }}
                  </div>
              </label>
              <div class = "wrapper-button-main">
                  <button type="submit" class = "button-main">Log in</button>
              </div>
            </form>
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

import {logInUser} from "@/axios/getters.js"

export default {
  name: 'logInModal',
  data()
  {
    return {
      username:{data:null,error:null},
      password:{data:null,error:null}
    }
  },
  methods:
  {
    logIn()
    {
      this.username.error=null;
      if (!this.username.data) this.username.error="Required field";

      this.password.error=null;
      if (!this.password.data) this.password.error="Required field";

      if ((this.username.error) || (this.password.error)) return;

      (async () =>
      {
        const r = await logInUser(this.username.data,this.password.data);
        if (r.token)
        {
          this.$store.dispatch('logIn',r.token);
          this.$router.push(`/`);
        }
        else
        {
          if (r.usernameError) this.username.error = r.usernameError;
          if (r.passwordError) this.password.error = r.passwordError;
        }
      })();
    },
  }
}
</script>

<style>

</style>