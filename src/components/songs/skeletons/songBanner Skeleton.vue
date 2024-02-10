<template>
    <div class="song banner">
        <div class="column w-100" style="overflow:hidden;">
            <div class="banner-bg" :style="this.gradient"></div>
            <div class="row">
                <button class="button button-default button-round button-huge toggled bi bi-play-circle-fill"></button>
                <div class="info-wrapper gap-10">
                    <skeleton class="banner-info h3 shimmer" :minwidth="150" :maxwidth="300"/>
                    <skeleton class="banner-info h2 shimmer" :minwidth="350" :maxwidth="500"/>
                    <skeleton class="banner-info h5 shimmer" :exactwidth="140"/>
                </div>
            </div>
            <div class="row bottom gap-5 y-center">
                <skeleton class="button button-banner h5 shimmer" :exactwidth="75"></skeleton>
                <skeleton class="button button-banner h5 shimmer" :exactwidth="135"></skeleton>
                <skeleton class="button button-banner h5 shimmer" :exactwidth="100"></skeleton>
                <skeleton class="button button-banner h5 shimmer" :exactwidth="100"></skeleton>
                <skeleton class="button button-banner h5 shimmer" :exactwidth="105"></skeleton>
            </div>
        </div>
        <div class="cover-wrapper s320x320 right shimmer"></div>
    </div>
</template>

<script>

import skeleton from '@/components/skeleton.vue';

export default
{
    name: 'songBannerSkeleton',
    components: { skeleton },
    data()
    {
        return {
            colorA:'var(--panel-border-color)',
            colorB:'var(--main-background-color)'
        }
    },
    computed:
    {
        gradient()
        {
            return "background: linear-gradient(135deg, "+this.colorA+" 0%, "+this.colorB+" 100%)";
        }
    },
}

</script>