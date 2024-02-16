<template>
    <songContainer :type="'ul-grid'" :dynamicComponent="'songCard'" :playlist="playlist"/>
</template>

<script>

import songContainer from "@/components/containers/songContainer.vue";
import API from "@/axios/API";

export default
{
    name: 'TagPopularView',
    components: { songContainer },
    props:
    {
        tag: { default:"route_param_tag" }
    },
    data()
    {
        return {
            playlist: undefined,
        }
    },
    async created()
    {
        this.playlist = (await API.get('tags/'+this.tag+"?popular")).songList;
    }
}

</script>


