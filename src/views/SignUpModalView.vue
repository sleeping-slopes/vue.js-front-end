<template>
  <modal :width="'400px'">
    <template v-slot:content>
          <div style="height:200px;font-size:40px;color:var(--text-color-primary)">
              Sign up to SSS
          </div>
          <form @submit.prevent="signUp" style="gap:10px">
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
                  <button type="submit" class = "button-primary hoverable h5">Sign up</button>
              </div>
            </form>
          <hr />
          <div style="color:var(--text-color-primary)">
              <span>Already have an account? <router-link to="login" class="button-link">Log in</router-link></span>
          </div>
        </template>
    </modal>
</template>

<script>

import {postUser} from "@/axios/getters.js"

import modal from "@/components/modal.vue"

export default {
  name: 'signUpModal',
  components:{modal},
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
          if (r.error.message.emailError) this.email.error = r.error.message.emailError;
          if (r.error.message.loginError) this.login.error = r.error.message.loginError;
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
