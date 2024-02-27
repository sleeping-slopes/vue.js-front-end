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
    async follow()
    {
      const response = await API.post("me/users/following", { login: this.login });
      if (response.error?.status==401) return this.$router.push({path: this.$route.fullPath,query:{action:'login'}});
      this.$store.dispatch('toggleUserFollow',this.login);
      this.user.followers_count++;
      this.user.youFollow=true;
    },
    async unfollow()
    {
      const response = await API.delete("me/users/following/"+this.login);
      if (response?.error?.status==401) return this.$router.push({path: this.$route.fullPath,query:{action:'login'}});
      this.$store.dispatch('toggleUserFollow',this.login);
    },
    async uploadProfilePicture(event)
    {
      const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

      const selectedFile = event.target.files[0];
      if (!selectedFile || !validImageTypes.includes(selectedFile.type)) return;

      const fd = new FormData();
      fd.append('userProfilePicture',selectedFile,selectedFile.name);
      const r = await API.post('me/profile-picture', fd);
      this.$store.dispatch('uploadUserProfilePicture',this.login);
    },
    async deleteProfilePicture()
    {
      const r = await API.delete('me/profile-picture');

      this.$store.dispatch('deleteUserProfilePicture',this.login);
    },
    async uploadBanner(event)
    {
      const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

      const selectedFile = event.target.files[0];
      if (!selectedFile || !validImageTypes.includes(selectedFile.type)) return;

      const fd = new FormData();
      fd.append('userBanner',selectedFile,selectedFile.name);
      const r = await API.post('me/banner', fd);

      this.$store.dispatch('uploadUserBanner',this.login);
    },
    async deleteBanner()
    {
      const r = await API.delete('me/banner');

      this.$store.dispatch('deleteUserBanner',this.login);
    },
    abbreviateNumber: abbreviateNumber
  }
}

</script>