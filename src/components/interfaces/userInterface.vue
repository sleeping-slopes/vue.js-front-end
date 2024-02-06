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
      imageAvailable: true,
      loaded: false
    }
  },
  computed:
  {
    user(){ return this.$store.getters.getUser(this.login) }
  },
  async created()
  {
    await this.$store.dispatch('loadUser',this.login);
    this.loaded = true;
    this.$emit('loaded');
  },
  methods:
  {
    abbreviateNumber: abbreviateNumber,
    async follow()
    {
      const response = await API.post("me/users/following", { login: this.login });
      if (response.error?.status==401) return this.$router.push({path: this.$route.fullPath,query:{action:'login'}});
      this.user.followers_count++;
      this.user.youFollow=true;
    },
    async unfollow()
    {
      const response = await API.delete("me/users/following/"+this.login);
      if (response?.error?.status==401) return this.$router.push({path: this.$route.fullPath,query:{action:'login'}});
      this.user.followers_count--;
      this.user.youFollow=false;
    }
  }
}

</script>