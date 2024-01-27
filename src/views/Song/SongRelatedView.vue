<template>
  <div class="content column" style="padding-top:0px;">
    <songHeader :id="this.id"></songHeader>
    <panel>
      <template v-slot:content>
        <songContainer :type="'ul-list hidden-scroll'" :dynamicComponent="'songExtended'" :playlist="playlist"/>
      </template>
    </panel>
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
    id: { default: "noid" }
  },
  data()
  {
    return {
      playlist: undefined
    }
  },
  async created()
  {
    this.playlist = await API.get('/songs/'+this.id+"/related");
  }
}

</script>