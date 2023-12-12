<template>
  <modal :width="'400px'">
    <template v-slot:content>
          <div style="height:200px;font-size:40px;color:var(--text-color-primary)">
              Log in to SSS
          </div>
          <form @submit.prevent="logIn" style="gap:10px">
              <label class = "label">
                  Login or email
                  <input class="my-input" type="text" v-bind:style="login.error?{'border-color':'red'}:{}"
                  placeholder="Enter login or email"
                  v-model="login.data"/>
                  <div class="error" v-if=login.error>
                    <span class="bi bi-exclamation-circle-fill"></span>
                    {{ login.error }}
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
              <div class = "wrapper-button-main">
                  <button type="submit" class = "button-primary hoverable h5">Log in</button>
              </div>
            </form>
          <hr />
          <div style="color:var(--text-color-primary)">
              <span>Don't have an account? <router-link to="signup" class="button-link">Sign up</router-link></span>
          </div>
    </template>
</modal>
</template>

<script>

import {logInUser} from "@/axios/getters.js"

import modal from "@/components/modal.vue"

export default {
  name: 'logInModal',
  components: { modal },
  data()
  {
    return {
      login:{data:null,error:null},
      password:{data:null,error:null}
    }
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
        const r = await logInUser(this.login.data,this.password.data);
        if (r.token)
        {
          this.$store.dispatch('logIn',r.token);
          this.$router.push(`/`);
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

<style>

</style>