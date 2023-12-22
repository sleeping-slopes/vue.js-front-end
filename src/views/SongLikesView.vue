<template>
  <ul class="ul-grid" v-if="this.users.length>0">
    <li v-for="users in this.users"><userCard :login="users.login"></userCard></li>
  </ul>
  <errorMessage  v-else>
    <template v-slot:errorIcon><span class="bi bi-person-fill"></span></template>
    <template v-slot:message>No one liked this song yet</template>
  </errorMessage>
</template>

<script>

import errorMessage from "@/components/containers/errorMessage.vue";
import userCard from "@/components/userCard.vue";
import API from "@/axios/API";

  export default {
    name: 'SongLikesView',
    components:{userCard,errorMessage},
    props:
    {
      id: { default: "noid" },
    },
    data()
    {
      return {
        users:[]
      }
    },
    async created()
    {
      this.users = await API.get('songs/'+this.id+'/likes');
    }
  }
  </script>

