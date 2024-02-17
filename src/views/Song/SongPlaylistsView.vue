<template>
  <div class="content column">
    <songHeader></songHeader>
    <playlistContainer :type="'ul-list'" :playlists="this.playlists" :dynamicComponent="'playlistExpansible'"/>
    <article class="project-info row">
      <p>
        <span>About website</span><br>
        Non-commercial project created solely for demonstration purposes.<br>
        I do not own the copyrights to the posted content.
      </p>
      <p>
        <span>Technologies used</span><br>
        Frontend: HTML, CSS (PostCSS), Vue.js, Axios;<br>
        Backend: Express.js, MySQL, REST API, Multer, JSON Web Token.
      </p>
      <p>Created by <a href="https://github.com/sleeping-slopes" class="accent-text alink" target=”_blank” rel="noopener noreferrer">@sleeping-slopes</a></p>
      <p class="right"><span class="accent-text">Language:&nbsp</span>English (US)</p>
    </article>
  </div>
</template>

<script>

import API from "@/axios/API";

import songHeader from "./songHeader.vue";
import playlistContainer from "@/components/containers/playlistContainer.vue";

export default
{
  name: 'SongPlaylistsView',
  components: { songHeader, playlistContainer },
  props:
  {
    id: { default: "route_param_id" }
  },
  data()
  {
    return {
      playlists: undefined
    }
  },
  async created()
  {
    this.playlists = await API.get('songs/'+this.id+'/playlists');
  }
}

</script>