<template>
  <modal :width="'400px'">
    <template v-slot:content>
      <span class="primary-text font-size-large left right" style="padding:57px 0px 57px 0px">Log in to 3V3R51NC3</span>
      <form @submit.prevent="logIn" class="column gap-10 y-center">
        <div class="form-field">
          <label for="input_userLogin">Login or email</label>
          <input id="input_userLogin" type="text" v-bind:class="{'input-error': login.error}" placeholder="Enter login or email"
            v-model="login.data"
          />
          <span class="icon-text notification-error" v-if=login.error>
            <span class="bi bi-exclamation-circle-fill"></span><span>{{ login.error }}</span>
          </span>
        </div>
        <div class="form-field">
          <label for="input_userPassword">Password</label>
          <div class="row gap-5">
            <input id="input_userPassword" class="w-100" :type="this.showPassword?'text':'password'" v-bind:class="{'input-error': password.error}" placeholder="Enter password"
              v-model="password.data"
            />
            <button type="button" class="button form-button" v-bind:class="{'bi bi-eye-slash-fill': !showPassword, 'bi bi-eye-fill': showPassword}"
              v-on:click="this.showPassword=!this.showPassword">
            </button>
          </div>
          <span class="icon-text notification-error" v-if=password.error>
            <span class="bi bi-exclamation-circle-fill"></span><span>{{ password.error }}</span>
          </span>
        </div>
        <div class="form-checkbox">
          <button type="button" class="button button-checkbox" id="checkbox_staySignedIn" v-bind:class="{'bi bi-check-square': !staySignedIn, 'bi bi-check-square-fill toggled': staySignedIn}"
              v-on:click="this.staySignedIn=!this.staySignedIn">
          </button>
          <label for="checkbox_staySignedIn">Stay signed in</label>
        </div>
        <button type="submit" class="button button-primary hoverable">Log in</button>
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
      showPassword: false,
      staySignedIn: false
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
        this.$store.dispatch('logIn',r.loginData);

        if (this.$route.query.to && this.$router.hasRoute(this.$route.query.to)) this.$router.push({name:this.$route.query.to});
        else this.$router.replace({query: null});
      }

    },
  }
}

</script>