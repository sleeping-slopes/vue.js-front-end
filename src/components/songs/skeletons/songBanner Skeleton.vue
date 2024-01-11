<template>
    <div class="row gap-20" style="overflow: hidden; width:1200px;">
        <div class="column w-100" style="overflow:hidden;">
            <div class="row">
                <button class="button button-round huge toggled bi bi-pause-circle-fill"></button>
                <div class="info-wrapper column gap-10">
                    <skeleton class="banner-info h3 shimmer" :minwidth="150" :maxwidth="300"/>
                    <skeleton class="banner-info h2 shimmer" :minwidth="350" :maxwidth="500" />
                    <skeleton class="banner-info h5 shimmer" :exactwidth="140"/>
                </div>
            </div>
            <div class="row bottom gap-5 y-center">
                <skeleton class="button button-banner h2 shimmer" :exactwidth="75"></skeleton>
                <skeleton class="button button-banner h2 shimmer" :exactwidth="135"></skeleton>
                <skeleton class="button button-banner h2 shimmer" :exactwidth="100"></skeleton>
                <skeleton class="button button-banner h2 shimmer" :exactwidth="100"></skeleton>
                <skeleton class="button button-banner h2 shimmer" :exactwidth="105"></skeleton>
            </div>
        </div>
        <div class = "cover-wrapper s320x320 right shimmer"/>
    </div>
</template>

  <script>

  import skeleton from '@/components/skeleton.vue';

  export default
  {
    name: 'songBannerSkeleton',
    components: { skeleton },
    props: { id: { default: "noid"} },
    async created()
    {
      await this.$store.dispatch('loadSong',this.id);
      this.$emit('loaded');
    }
  }

  </script>


<style scoped>

.tag-container
{
    display:flex;
    flex-wrap:wrap;
    flex-direction: row-reverse;
    gap:10px;
    min-width:min-content;
    width:min-content;
    max-width:320px;
    height:fit-content;
    flex-shrink: 0;
}
.button-tag
{
    background-color:var(--light-gray);
    color: var(--soft-white);
    padding:3px 7px 3px 7px;
    border-radius: 50vh;

    white-space: nowrap;
}

.button-tag::before
{
    content:"# "
}

.button-tag:hover
{
    background-color:var(--dark-gray);
}

</style>