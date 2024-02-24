<script>

import API from "@/axios/API.js"
import { abbreviateNumber } from "@/functions.js"

export default
{
  name: 'playlistInterface',
  props:
  {
    id: { default: "noid" }
  },
  data()
  {
    return {
      loaded:false
    }
  },
  computed:
  {
    playlist() { return this.$store.getters.getPlaylist(this.id); },
    current() { return this.$store.state.currentPlaylist.id===this.id; },
    isPlaying() { return this.current?this.$store.state.isPlaying:false; }
  },
  async created()
  {
    await this.$store.dispatch('loadPlaylist',this.id);
    this.loaded = true;
    this.$emit('loaded');
  },
  methods:
  {
    async like()
    {
      if (!this.playlist.liked)
      {
        const response = await API.post("me/playlists/likes", { id: this.id });
        if (response.error?.status==401) return this.$router.push({path: this.$route.fullPath,query:{action:'login'}});
        this.playlist.likes_count++;
        this.playlist.liked=true;
      }
      else
      {
        const response = await API.delete("me/playlists/likes/"+this.id);
        if (response?.error?.status==401) return this.$router.push({path: this.$route.fullPath,query:{action:'login'}});
        this.playlist.likes_count--;
        this.playlist.liked=false;
      }
    },
    playPlaylist()
    {
        if (this.playlist.songList.songs?.length>0)
        {
          if (!this.current) this.$store.dispatch('setCurrentPlaylistAndSong',{playlist: {id:this.id,songs:this.playlist.songList.songs}, songIndex: 0});
          else this.$store.dispatch('togglePlayingState');
        }
    },
    abbreviateNumber: abbreviateNumber
  }
}

</script>