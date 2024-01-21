<script>

import API from "@/axios/API.js"
import { abbreviateNumber } from "@/functions.js"

export default
{
  name: 'userInterface',
  props:
  {
    login: { default: "nologin" }
  },
  data()
  {
    return {
      picturesrc: API.defaults.baseURL+`users/`+this.login+`/picture`,
      imageAvailable: true
    }
  },
  computed:
  {
    user(){ return this.$store.getters.getUser(this.login) }
  },
  methods:
  {
    abbreviateNumber: abbreviateNumber,
    async follow()
    {
      const response = await API.post('users/'+this.login+"/action/follow/post");
      if (response.error?.status==401) { this.$router.push({path: this.$route.fullPath,query:{action:'login'}}) }
      else
      {
        this.user.followers_count++;
        this.user.youFollow=true;
      }
    },
    async unfollow()
    {
      const response = await API.post('users/'+this.login+"/action/follow/delete");
      if (response.error?.status==401) { this.$router.push({path: this.$route.fullPath,query:{action:'login'}}) }
      else
      {
        this.user.followers_count--;
        this.user.youFollow=false;
      }
    }
  }
}

</script>