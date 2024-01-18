<template>
    <songContainer :type="'ul-grid hidden-scroll'" :dynamicComponent="'songCard'" :playlist="playlist"/>
</template>

<script>

import songContainer from "@/components/songContainer.vue";
import API from "@/axios/API";

export default
{
    name: 'TagPopularView',
    components: { songContainer },
    props:
    {
        tag: { default:"notag" }
    },
    data()
    {
        return {
            playlist: undefined,
        }
    },
    async created()
    {
        this.playlist = await API.get('tags/'+this.tag+"/popular");
    }
}

</script>


