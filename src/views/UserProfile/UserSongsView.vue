<template>
  <panel>
    <template v-slot:header>Songs by {{ this.user.username }}</template>
    <template v-slot:content>
      <songContainer :type="'ul-list'" :dynamicComponent="'songExtended'" :playlist="this.playlist"></songContainer>
    </template>
  </panel>
</template>

<script>

import panel from '@/components/containers/panel.vue';
import songContainer from '@/components/containers/songContainer.vue';

import API from '@/axios/API';

export default
{
  name: 'UserSongsView',
  components: { panel, songContainer },
  props:
  {
    login: { default: "route_param_login" }
  },
  data()
  {
    return{
      playlist: undefined
    }
  },
  computed:
  {
    user() { return this.$store.getters.getUser(this.login) }
  },
  async created()
  {
    this.playlist = (await API.get('users/'+this.login+'/songs/created')).songList;
  },
}

</script>