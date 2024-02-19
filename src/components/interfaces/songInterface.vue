<script>

import API from '@/axios/API';
import { numberToTimeString,abbreviateNumber } from "@/functions.js"

export default
{
  name: 'songInterface',
  props:
  {
    id: { default: "noid" },
    pos: { type: Number, default: -1 }
  },
  data()
  {
    return {
      coversrc: API.defaults.baseURL+`songs/`+this.id+`/cover`,
      loaded:false
    }
  },
  computed:
  {
    song(){ return this.$store.getters.getSong(this.id) },
    current()
    {
        return this.id == this.$store.getters.getCurrentSong && this.pos!=-1;
        // this.pos == this.$store.state.currentPlaylist.songs[this.$store.state.currentSongIndex].pos
        // parent?
    },
    isPlaying()
    {
      return this.current?this.$store.state.isPlaying:false;
    }
  },
  async created()
  {
    await this.$store.dispatch('loadSong',this.id);
    this.loaded = true;
    this.$emit('loaded');
  },
  methods:
  {
    numberToTimeString:numberToTimeString,
    abbreviateNumber:abbreviateNumber,
    setCurrentSong()
    {
        if (!this.current) this.$emit('setCurrentSong');
        else this.$store.dispatch('togglePlayingState');
    },
    openDropdown(event)
    {
      this.$emit('openSongDropdown',event,{id:this.id,pos:this.pos});
    },
    copyLinkToClipboard()
    {
      const route = this.$router.resolve({ name:"Song", params: {id:this.id} });
      const absoluteURL = new URL(route.href, window.location.origin).href;
      navigator.clipboard.writeText(absoluteURL);
    },
    async like()
    {
      if (!this.song.liked)
      {
        const response = await API.post("me/songs/likes", { id: this.id });
        if (response.error?.status==401) return this.$router.push({path: this.$route.fullPath,query:{action:'login'}});
        this.song.likes_count++;
        this.song.liked=true;
      }
      else
      {
        const response = await API.delete("me/songs/likes/"+this.id);
        if (response?.error?.status==401) return this.$router.push({path: this.$route.fullPath,query:{action:'login'}});
        this.song.likes_count--;
        this.song.liked=false;
      }
    }
  }
}

</script>