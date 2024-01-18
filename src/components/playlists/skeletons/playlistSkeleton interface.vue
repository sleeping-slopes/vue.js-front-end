<script>

import skeleton from '@/components/skeleton.vue';

export default
{
  name: 'playlistSkeletonInterface',
  components: { skeleton },
  props:
  {
    id: { default: "noid"}
  },
  async created()
  {
    await this.$store.dispatch('loadPlaylist',this.id);
    this.$emit('loaded');
  }
}

</script>