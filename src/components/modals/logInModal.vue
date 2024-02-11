<template>
  <modal :width="'400px'">
    <template v-slot:content>
      <span class="primary-text left right font-size-large" style="padding:57px 0px 57px 0px">Log in to 3V3R51NC3</span>
      <form @submit.prevent="logIn" class="column gap-10 y-center">
        <label class="label-form">
          <span>Login or email</span>
          <input type="text" v-bind:class="{'input-error': login.error}" placeholder="Enter login or email"
            v-model="login.data"
          />
          <span class="icon-text notification-error" v-if=login.error>
            <span class="bi bi-exclamation-circle-fill"></span><span>{{ login.error }}</span>
          </span>
        </label>
        <label class="label-form">
          <span>Password</span>
          <input type="password" v-bind:class="{'input-error': password.error}" placeholder="Enter password"
            v-model="password.data"
          />
          <span class="icon-text notification-error" v-if=password.error>
            <span class="bi bi-exclamation-circle-fill"></span><span>{{ password.error }}</span>
          </span>
        </label>
        <label class="label-checkbox">
          <button type="button" class="button button-checkbox" v-bind:class="{'bi bi-check-square': !rememberMe, 'bi bi-check-square-fill toggled': rememberMe}"
              v-on:click="this.rememberMe=!this.rememberMe">
          </button>
          <span>Remember me</span>
        </label>
        <button type="submit" class="button button-primary hoverable h5">Log in</button>
      </form>
      <hr/>
      <span class="primary-text left right">Don't have an account?
        <button class="button button-link" v-on:click="this.$router.replace({query:{action:'signup',to:this.$route.query.to}});">Sign up</button>
      </span>
    </template>
</modal>
</template>

<script>

import API from "@/axios/API";

import modal from "@/components/containers/modal.vue"

export default
{
  name: 'logInModal',
  components: { modal },
  data()
  {
    return {
      login: { data: null, error: null },
      password: {data: null, error: null },
      rememberMe : false
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
    async logIn()
    {
      this.login.data = this.login.data || null;
      this.login.error=null;
      if (this.login.data)
      {
        this.login.data = this.login.data.trim();
      }
      else this.login.error="Required field.";

      this.password.data = this.password.data || null;
      this.password.error=null;
      if (this.password.data)
      {
      }
      else this.password.error="Required field.";

      if ((this.login.error) || (this.password.error)) return;

      const r = await API.post('auth/login',{ login:this.login.data, password:this.password.data});
      if (r.error)
      {
        if (r.error.message.loginError) this.login.error = r.error.message.loginError;
        if (r.error.message.passwordError) this.password.error = r.error.message.passwordError;
      }
      else if (r.loginData)
      {
        r.loginData.rememberMe=this.rememberMe;

        this.$store.dispatch('logIn',r.loginData);

        if (this.$route.query.to && this.$router.hasRoute(this.$route.query.to)) this.$router.push({name:this.$route.query.to});
        else this.$router.replace({query: null});
      }

    },
  }
}

</script>