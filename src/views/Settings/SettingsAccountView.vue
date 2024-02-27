<template>
<div class="column gap-15" style="width:360px;">
  <form class="column" @submit.prevent="changeEmail">
    <div class="form-field">
      <label for="input_userEmail">Email</label>
      <input id="input_userEmail" type="text" v-bind:class="{'input-error': email.error}" placeholder="Enter email"
        v-model="email.data"
      />
      <span class="icon-text notification-error" v-if=email.error>
        <span class="bi bi-exclamation-circle-fill"></span><span>{{ email.error }}</span>
      </span>
    </div>
    <button type="submit" class="button button-secondary">Change email</button>
  </form>
  <div class="column gap-5">
    <span class="primary-text font-size-small">Password</span>
    <button class="button button-secondary">Send password-reset link to email</button>
  </div>
  <button class="button button-default toggled" style="margin-top:90px;" v-on:click="deleteAccount">Delete account</button>
</div>
</template>

<script>

import API from '@/axios/API';

import { validEmail } from "@/functions.js"

export default
{
  name: 'AccountSettingsView',
  data()
  {
    return {
      email:{ data: this.$store.getters.getCurrentUser.email, error: null },
    }
  },
  methods:
  {
    async changeEmail()
    {
      this.email.data = this.email.data || null;
      this.email.error=null;
      if (this.email.data)
      {
        this.email.data = this.email.data.trim().toLowerCase();
        if (this.email.data.length>50) this.email.error='Enter an email that is up to 50 characters.';
        else if (!validEmail(this.email.data)) this.email.error='Invalid email.';
      }
      else this.email.error="Required field.";

      if (this.email.error) return;

      const r = await API.put('me/credentials', { email:this.email.data });
      if (r.error)
      {
        if (r.error.message.emailError) this.email.error = r.error.message.emailError;
      }
    },
    async deleteAccount()
    {
      const r = await API.delete('me');
      // if (r.error)
      if (false)
      {
        alert (JSON.stringify(r.error));
      }
      else
      {
        this.$store.dispatch('logOut');
      }
    }
  }
}

</script>


