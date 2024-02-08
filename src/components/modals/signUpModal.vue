<template>
  <modal :width="'400px'">
    <template v-slot:content>
          <h2 class="primary-text left right" style="padding:57px 0px 57px 0px">Sign up to 3V3R51NC3</h2>
          <form @submit.prevent="postUser" class="h4 column gap-10 y-center">
              <label class = "label">
                  <span>Email</span>
                  <input type="text" v-bind:class="{'input-error': email.error}" placeholder="Enter email"
                    v-model="email.data"
                  />
                  <span class="icon-text notification-error" v-if=email.error>
                    <span class="bi bi-exclamation-circle-fill"></span><span>{{ email.error }}</span>
                  </span>
              </label>
              <label class = "label">
                <span>Password</span>
                  <input type="password" v-bind:class="{'input-error': password.error}" placeholder="Enter password"
                    v-model="password.data"
                  />
                  <span class="icon-text notification-error" v-if=password.error>
                    <span class="bi bi-exclamation-circle-fill"></span><span>{{ password.error }}</span>
                  </span>
              </label>
              <label class = "label">
                <span>Login</span>
                  <input type="text" v-bind:class="{'input-error': login.error}" placeholder="What should we call you?"
                    v-model="login.data"
                  />
                  <span class="icon-text notification-error" v-if=login.error>
                    <span class="bi bi-exclamation-circle-fill"></span><span>{{ login.error }}</span>
                  </span>
              </label>
              <button type="submit" class = "button button-primary hoverable h5">Sign up</button>
            </form>
          <hr/>
          <span class="primary-text h5 left right">Already have an account?
            <button class="button button-link" v-on:click="this.$router.replace({query:{action:'login',to:this.$route.query.to}});">Log in</button>
          </span>
        </template>
    </modal>
</template>

<script>

import API from "@/axios/API";

import modal from "@/components/containers/modal.vue"

import { validEmail, validLogin } from "@/functions.js"


export default
{
  name: 'signUpModal',
  components: { modal },
  data()
  {
    return {
      email:{ data: null,error: null },
      password:{ data: null, error: null },
      login:{ data: null ,error: null }
    }
  },
  created()
  {
    if (!this.$store.state.currentUser) return;
    if (this.$route.query.to && this.$router.hasRoute(this.$route.query.to)) this.$router.push({name:this.$route.query.to});
    else this.$router.replace({query: null});
  },
  methods:
  {
    async postUser()
    {
      this.email.data = this.email.data || null;
      this.email.error = null;
      if (this.email.data)
      {
        this.email.data = this.email.data.trim().toLowerCase();
        if (!validEmail(this.email.data)) this.email.error='Invalid email.';
      }
      else this.email.error="Required field.";

      this.login.data = this.login.data || null;
      this.login.error = null;
      if (this.login.data)
      {
        this.login.data = this.login.data.trim().toLowerCase();
        if (!(this.login.data.length>=6 || this.login.data.length<=50)) this.login.error='Enter a login from 6 to 50 characters.';
        else if (!validLogin(this.login.data)) this.login.error='Invalid login.';
      }
      else this.login.error="Required field.";

      this.password.data = this.password.data || null;
      this.password.error = null;
      if (this.password.data)
      {
        if (!(this.password.data.length>=6 || this.password.data.length<=60)) this.password.error='Enter a password from 6 to 60 characters.';
      }
      else this.password.error="Required field.";

      if ((this.email.error) || (this.password.error) || (this.login.error)) return;

      const r = await API.post('users',{ email:this.email.data, password:this.password.data, login:this.login.data });
      if (r.error)
      {
        if (r.error.message.emailError) this.email.error = r.error.message.emailError;
        if (r.error.message.loginError) this.login.error = r.error.message.loginError;
      }
      else if (r.loginData)
      {
        this.$store.dispatch('logIn',r.loginData);

        if (this.$route.query.to && this.$router.hasRoute(this.$route.query.to)) this.$router.push({name:this.$route.query.to});
        else this.$router.replace({query: null});
      }
    }
  }
}

</script>