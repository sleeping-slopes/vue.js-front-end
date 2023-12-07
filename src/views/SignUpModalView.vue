<template>
  <teleport to=".app">
  <div class="modal-shade" style="background-color:rgba(0,0,0,0.5)">
    <div class="modal">
      <div class="panel" style="width:400px; z-index:999">
          <div class ="panel-content" style="height:200px;font-size:2.5em;color:var(--text-color-primary)">
              Sign up to SSS
          </div>
          <form @submit.prevent="signUp" class ="panel-content" style="gap:10px">
              <label class = "label">
                  Email
                  <input class="my-input" type="text" v-bind:style="email.error?{'border-color':'red'}:{}"
                  placeholder="Enter email"
                  v-model="email.data"/>
                  <div class="error" v-if=email.error>
                    <span class="bi bi-exclamation-circle-fill"></span>
                    {{ email.error }}
                  </div>
              </label>
              <label class = "label">
                  Password
                  <input class="my-input" type="password" v-bind:style="password.error?{'border-color':'red'}:{}"
                  placeholder="Enter password"
                  v-model="password.data"/>
                  <div class="error" v-if=password.error>
                    <span class="bi bi-exclamation-circle-fill"></span>
                    {{ password.error }}
                  </div>
              </label>
              <label class = "label">
                  Login
                  <input class="my-input" type="text" v-bind:style="login.error?{'border-color':'red'}:{}"
                  placeholder="What should we call you?"
                  v-model="login.data"/>
                  <div class="error" v-if=login.error>
                    <span class="bi bi-exclamation-circle-fill"></span>
                    {{ login.error }}
                  </div>
              </label>
              <div class = "wrapper-button-main">
                  <button type="submit" class = "button-primary">Sign up</button>
              </div>
            </form>
          <hr />
          <div class ="panel-content" style="color:var(--text-color-primary)">
              <span>Already have an account? <router-link to="login" class="button-link">Log in</router-link></span>
          </div>
      </div>
      <button class="bi bi-x modal-close-button" v-on:click="$router.back(-1)"/>
    </div>
  </div>
  </teleport>
</template>

<script>

import {postUser} from "@/axios/getters.js"

export default {
  name: 'signUpModal',
  data()
  {
    return {
      email:{data:null,error:null},
      password:{data:null,error:null},
      login:{data:null,error:null}
    }
  },
  methods:
  {
    signUp()
    {
      this.email.error=null;
      if (!this.email.data) this.email.error="Required field";
      else if (!this.validEmail(this.email.data)) this.email.error='Invalid email';

      this.password.error=null;
      if (!this.password.data) this.password.error="Required field";
      else if (this.password.data.length<5) this.password.error='Password is too short';

      this.login.error=null;
      if (!this.login.data) this.login.error="Required field";
      else if (!this.validLogin(this.login.data)) this.login.error='Invalid login';
      else if (this.login.data.length<5) this.login.error='Login is too short';

      if ((this.email.error) || (this.password.error) || (this.login.error)) return;

      (async () =>
      {
        const r = await postUser(this.email.data,this.password.data,this.login.data);
        if (r.token)
        {
          this.$store.dispatch('logIn',r.token);
          this.$router.push(`/`);
        }
        else
        {
          if (r.emailError) this.email.error = r.emailError;
          if (r.loginError) this.login.error = r.loginError;
        }
      })();
    },
    validEmail(email)
    {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    validLogin(login)
    {
      const re = /^[a-zA-Z0-9_.-]*$/;
      return re.test(login);
    }
  }
}
</script>

<style>

</style>
