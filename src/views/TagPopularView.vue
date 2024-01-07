<template>
    <songContainer :type="'ul-grid hidden-scroll'"
      :playlist="playlist"
      :dynamicComponent="'songCard'"/>
</template>

<script>

import songContainer from "@/components/songContainer.vue";
import API from "@/axios/API";

export default
{
    name: 'TagPopularView',
    components:{songContainer},
    props:
    {
        tag: {default:"notag"}
    },
    data()
    {
        return {
            playlist: {},
        }
    },
    async created()
    {
        this.playlist = await API.get('tags/'+this.tag+"/popular");
    }
}

</script>


