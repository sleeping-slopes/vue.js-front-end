<script>

import skeleton from '@/components/skeleton.vue';

export default
{
  name: 'playlistSkeletonInterface',
  components: { skeleton },
  props:
  {
    login: { default: "nologin"}
  },
  async created()
  {
    await this.$store.dispatch('loadUser',this.login);
    this.$emit('loaded');
  }
}

</script>