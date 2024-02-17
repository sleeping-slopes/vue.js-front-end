<template>
  <div class="content column">
    <songHeader></songHeader>
    <panel>
      <template v-slot:content>
        <songContainer :type="'ul-list'" :dynamicComponent="'songExtended'" :playlist="playlist"/>
      </template>
    </panel>
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
import panel from "@/components/containers/panel.vue";
import songContainer from "@/components/containers/songContainer.vue";

export default
{
  name: 'SongRelatedView',
  components: { songHeader, panel, songContainer },
  props:
  {
    id: { default: "route_param_id" }
  },
  data()
  {
    return {
      playlist: undefined
    }
  },
  async created()
  {
    this.playlist = (await API.get('/songs/'+this.id+"/related")).songList;
  }
}

</script>