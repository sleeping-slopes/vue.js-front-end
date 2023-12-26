<template>
  <div class = "song card">
    <div class = "cover-wrapper s180x180" >
      <div class = "cover"/>
    </div>
    <div class= "info-wrapper">
      <skeleton class="h5"/>
      <skeleton class="h4"/>
    </div>
  </div>
</template>

<script>

import skeleton from '@/components/skeleton.vue';


export default
{
  name: 'songSkeleton',
  components: { skeleton },
  props: { id: { default: "noid"} },
  async created()
  {
    await this.$store.dispatch('loadSong',this.id);
    this.$emit('loaded');
  }
}

</script>
