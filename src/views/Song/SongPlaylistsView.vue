<template>
  <template v-if="this.song && !this.song.error">
    <div class="content column">
      <div class="sticky-top">
        <div style="position:relative">
          <songHeader :id="this.id"></songHeader>
        </div>
        <nav class="nav-tab">
          <ul>
            <li><router-link :to="{ name: 'SongLikes', params: { id: this.id }}">Likes</router-link></li>
            <li><router-link :to="{ name: 'SongPlaylists', params: { id: this.id }}">In playlists</router-link></li>
            <li><router-link :to="{ name: 'SongRelated', params: { id: this.id }}">Related songs</router-link></li>
          </ul>
        </nav>
      </div>
      <playlistContainer :type="'ul-list'" :playlists="this.playlists" :dynamicComponent="'playlistExpansible'"></playlistContainer>
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
        <p style="white-space:nowrap">Created by <a href="https://github.com/sleeping-slopes" class="accent-text alink" target=”_blank” rel="noopener noreferrer">@sleeping-slopes</a></p>
        <p class="right" style="white-space:nowrap"><span class="accent-text">Language:&nbsp</span>English (US)</p>
      </article>
    </div>
  </template>
</template>

<script>

import API from "@/axios/API";

import songHeader from "@/components/songs/songHeader.vue";
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
      song: undefined,
      playlists: undefined
    }
  },
  async created()
  {
    this.song = await API.get('songs/'+this.id);
    if (this.song.error) this.$router.push({ name:"Song", params: { id: this.id } });

    this.playlists = await API.get('songs/'+this.id+'/playlists');
  }
}

</script>