<template>
    <songContainer :type="'ul-grid hidden-scroll'" :dynamicComponent="'songCard'" :playlist="playlist"/>
</template>

<script>

import songContainer from "@/components/songContainer.vue";
import API from "@/axios/API";

export default
{
    name: 'TagNewView',
    components: { songContainer },
    props:
    {
        tag: { default: "notag" }
    },
    data()
    {
        return {
            playlist: {},
        }
    },
    async created()
    {
        this.playlist = await API.get('tags/'+this.tag+"/new");
    }
}

</script>


