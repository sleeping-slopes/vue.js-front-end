<template>
    <panel style="height:100%;">
        <template v-slot:header>Songs</template>
        <template v-slot:content>TEST</template>
    </panel>
</template>

<script>

import panel from '@/components/containers/panel.vue';

export default
{
name: 'FeedView',
components: { panel }
}
</script>