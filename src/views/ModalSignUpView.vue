<template>
  <modal :width="'400px'">
    <template v-slot:content>
          <h2 class="primary-text" style="height:200px">Sign up to 3V3R51NC3</h2>
          <form @submit.prevent="signUp" class="h4">
              <label class = "label">
                  <span>Email</span>
                  <input class="my-input" type="text" v-bind:style="email.error?{'border-color':'red'}:{}"
                  placeholder="Enter email"
                  v-model="email.data"/>
                  <span class="icon-text error" v-if=email.error>
                    <span class="bi bi-exclamation-circle-fill"></span><span>{{ email.error }}</span>
                  </span>
              </label>
              <label class = "label">
                <span>Password</span>
                  <input class="my-input" type="password" v-bind:style="password.error?{'border-color':'red'}:{}"
                  placeholder="Enter password"
                  v-model="password.data"/>
                  <span class="icon-text error" v-if=password.error>
                    <span class="bi bi-exclamation-circle-fill"></span><span>{{ password.error }}</span>
                  </span>
              </label>
              <label class = "label">
                <span>Login</span>
                  <input class="my-input" type="text" v-bind:style="login.error?{'border-color':'red'}:{}"
                  placeholder="What should we call you?"
                  v-model="login.data"/>
                  <span class="icon-text error" v-if=login.error>
                    <span class="bi bi-exclamation-circle-fill"></span><span>{{ login.error }}</span>
                  </span>
              </label>
              <button type="submit" class = "button-primary hoverable h5">Sign up</button>
            </form>
          <hr />
          <span class="primary-text h5">Already have an account?
            <button class="button-link" v-on:click="$router.push({path: $route.fullPath,query:{action:'login'}})">Log in</button>
          </span>
        </template>
    </modal>
</template>

<script>

import {postUser} from "@/axios/getters.js"

import modal from "@/components/containers/modal.vue"

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
