<template>

    <template v-if="this.users.length">
    <span class="secondary-text h4">Found {{ abbreviateNumber(this.users.length) }} user{{this.users.length==1?'':'s'}}</span>
    <ul class="column gap-20">
        <li v-for="user in this.users">
            <userItem :login="user.login"/>
        </li>
    </ul>
    </template>
    <errorMessage v-if="this.users.error">
        <template v-slot:errorIcon><span class="bi bi-person-fill"></span></template>
        <template v-slot:message>{{ this.users.error.message }}</template>
    </errorMessage>
</template>

<script>

import API from '@/axios/API';
import userItem from '@/components/users/userItem.vue';
import { abbreviateNumber } from '@/functions';
import errorMessage from '@/components/containers/errorMessage.vue';

export default
{
  name: 'searchPlaylistView',
  components: { userItem, errorMessage },
  data()
  {
    return {
        users: []
    }
  },
  methods: { abbreviateNumber:abbreviateNumber },
  async created()
  {
    this.users = await API.get('search/'+this.$route.query.q.trim()+'/users');
  }
}

</script>