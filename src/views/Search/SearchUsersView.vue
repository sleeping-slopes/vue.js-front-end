<template>
  <span class="secondary-text h4" v-if="this.users?.length">Found {{ abbreviateNumber(this.users.length) }} user{{this.users.length==1?'':'s'}}</span>
  <userContainer :type="'column gap-10'" :dynamicComponent="'userItem'" :users="this.users"></userContainer>
</template>

<script>

import API from '@/axios/API';
import userContainer from '@/components/containers/userContainer.vue';
import { abbreviateNumber } from '@/functions';

export default
{
  name: 'searchUsersView',
  components: { userContainer },
  data()
  {
    return {
        users: undefined
    }
  },
  methods: { abbreviateNumber:abbreviateNumber },
  async created()
  {
    this.users = await API.get('search/'+this.$route.query.q.trim()+'/users');
  }
}

</script>