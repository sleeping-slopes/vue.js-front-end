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
        <ul class="user-list">
            <li v-for="following in this.followings"><userCard :login="following.login"></userCard></li>
        </ul>
    </div>
</template>

    <script>

      import { getUserByToken, getUserFollowing } from "@/axios/getters";

      import panel from "@/components/panel.vue"
      import userCard from "@/components/userCard.vue"

        export default {
          name: 'YourFollowersView',
          components:{panel,userCard},
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
            const userByToken = await getUserByToken();
            if (userByToken.error) this.user=undefined;
            else this.user=userByToken.values;
            this.followings = await getUserFollowing(this.user.login);
            this.followings = Array(15).fill({login:"admin"})

            // document.title=(this.user.username || this.user.login)+" follows";
          }
        }
        </script>

        <style>

        </style>

