<script>

import skeleton from '@/components/skeleton.vue';

export default
{
    name: 'songSkeletonInterface',
    components: { skeleton },
    props:
    {
        id: { default: "noid" }
    },
    async created()
    {
        await this.$store.dispatch('loadSong',this.id);
        this.$emit('loaded');
    }
}

</script>