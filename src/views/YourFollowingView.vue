<template>
    <div class="column">
        <div style="display:flex; justify-content: space-between; align-items: center;">
            <span class="h3 secondary-text">Hear what the people you follow have posted:</span>
            <div class="wrapper-search h4">
                <div class="search-panel">
                    <input class="search" type="text" placeholder="Filter" autocomplete="off">
                    <i class="fa fa-search"></i>
                </div>
            </div>
        </div>
        <errorMessage  v-if="this.followings.length==0">
          <template v-slot:errorIcon><span class="bi bi-person-fill"></span></template>
          <template v-slot:message>You aren’t following anyone</template>
        </errorMessage>
        <ul class="ul-grid">
            <li v-for="following in this.followings"><userCard :login="following.login"></userCard></li>
        </ul>
    </div>
</template>

    <script>

      import { getUserFollowing } from "@/axios/getters";

      import panel from "@/components/containers/panel.vue"
      import userCard from "@/components/userCard.vue"
      import errorMessage from "@/components/containers/errorMessage.vue";

        export default {
          name: 'YourFollowersView',
          components:{panel,userCard,errorMessage},
          props:
          {

          },
          data()
          {
            return {
              user:undefined,
              followings:[],
            }
          },
          async created()
          {
            this.followings = await getUserFollowing(this.login);
          },
          props:
          {
            login:{default:"nologin"}
          }
        }
        </script>

        <style>

        </style>

