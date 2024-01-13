<template>
<errorMessage  v-if="this.users.error">
    <template v-slot:errorIcon><span class="bi bi-person-fill"></span></template>
    <template v-slot:message>{{ this.users.error.message }}</template>
</errorMessage>
<ul class="row gap-0" v-else>
  <li v-for="(user,index) in this.getShortList">
    <router-link :to="{ name: 'User', params: { login: user.login }}">
        <img class = "user-image s36x36" :src="getUserPicture(user.login)"  v-if="imageAvailable[index]" @error="imageAvailable[index]=false"/>
        <div class = "user-image s36x36 gradient-bg" v-else/>
    </router-link>
  </li>
</ul>
</template>

  <script>

import errorMessage from '@/components/containers/errorMessage.vue';
import API from '@/axios/API';

  export default
  {
    name: 'userList',
    components: { errorMessage },
    props:
    {
      users: { default: {} },
      maxDisplay: {default:0},
    },
    data()
    {
        return {
            picturesrc: API.defaults.baseURL+`users/user/picture`,
            imageAvailable: Array(this.maxDisplay).fill(true)
        }
    },
    methods:
    {
      getUserPicture(login)
      {
        return API.defaults.baseURL+`users/`+login+`/picture`
      }
    },
    computed:
    {
        getShortList() { return this.maxDisplay<1?this.users:this.users.slice(0,this.maxDisplay); }
    }
  }
  </script>

  <style scoped>

    .user-image
    {
        border:2px solid var(--panel-background-color);
        margin-right:-10px;
        box-sizing: border-box;
    }
</style>