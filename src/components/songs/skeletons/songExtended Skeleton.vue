<template>

<div class = "song item">
  <div class = "cover-wrapper s52x52 shimmer"/>
  <div class= "info-wrapper column gap-0">
    <skeleton class="h5 shimmer"/>
    <skeleton class="h4 shimmer"/>
    <div class="row">
      <skeleton class="h6 shimmer" :exactwidth="50"/>
      <skeleton class="h6 shimmer" :exactwidth="50"/>
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