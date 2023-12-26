<template>

<div class = "song item">
  <div class = "cover-wrapper s52x52">
    <div class = "cover"/>
  </div>
  <div class= "info-wrapper">
    <skeleton class="h5"/>
    <skeleton class="h4"/>
    <div class="row">
      <skeleton class="h6" :exactwidth="50"/>
      <skeleton class="h6" :exactwidth="50"/>
    </div>
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

<style>

</style>