<template>
  <modal :width="'400px'">
    <template v-slot:content>
      <h2 class="primary-text left right" style="padding:57px 0px 57px 0px">Log in to 3V3R51NC3</h2>
      <form @submit.prevent="logIn" class="h4 column gap-5 y-center">
        <label class = "label">
          <span>Login or email</span>
          <input type="text" v-bind:style="login.error?{'border-color':'red'}:{}" placeholder="Enter login or email"
            v-model="login.data"
          />
          <span class="icon-text error" v-if=login.error>
            <span class="bi bi-exclamation-circle-fill"></span><span>{{ login.error }}</span>
          </span>
        </label>
        <label class = "label">
          <span>Password</span>
          <input type="password" v-bind:style="password.error?{'border-color':'red'}:{}" placeholder="Enter password"
            v-model="password.data"
          />
          <span class="icon-text error" v-if=password.error>
            <span class="bi bi-exclamation-circle-fill"></span><span>{{ password.error }}</span>
          </span>
        </label>
        <button type="submit" class = "button button-primary hoverable h5">Log in</button>
      </form>
      <hr/>
      <span class="primary-text h5 left right">Don't have an account?
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
      login:{data:null,error:null},
      password:{data:null,error:null}
    }
  },
  created()
  {
    if (!this.$store.state.loggedIn) return
    if (this.$route.query.to && this.$router.hasRoute(this.$route.query.to)) this.$router.push({name:this.$route.query.to});
    else this.$router.replace({query:null});
  },
  methods:
  {
    logIn()
    {
      this.login.error=null;
      if (!this.login.data) this.login.error="Required field";

      this.password.error=null;
      if (!this.password.data) this.password.error="Required field";

      if ((this.login.error) || (this.password.error)) return;

      (async () =>
      {
        const r = await API.post('auth/login',{ login:this.login.data, password:this.password.data});
        if (r.token)
        {
          this.$store.dispatch('logIn',r.token);
          if (this.$route.query.to && this.$router.hasRoute(this.$route.query.to)) this.$router.push({name:this.$route.query.to});
          else this.$router.replace({query:null});
        }
        else
        {
          if (r.error.message.loginError) this.login.error = r.error.message.loginError;
          if (r.error.message.passwordError) this.password.error = r.error.message.passwordError;
        }
      })();
    },
  }
}

</script>