<template>
    <span class="skeleton" v-bind:style="{'width':this.width+'px'}"></span>
</template>

<script>

export default
{
name: 'skeleton',
props:
{
    minwidth: {default: 80},
    maxwidth: {default: 150},
    exactwidth: {default: 0}
},
computed:
{
    width() { return this.exactwidth || this.minwidth+Math.random()*(this.maxwidth-this.minwidth) }
}
}

</script>

<style>

.skeleton
{
    background-color: var(--panel-border-color);
    color: var(--panel-border-color);
    height:1.0em;
    border-radius: 5px;
    max-width:100%;
}

.skeleton.button-secondary
{
    background-color: var(--panel-border-color);
    border:none;
}

.info-wrapper:has(.skeleton)
{
    justify-content: space-between;
}

.song .row
{
    height:min-content;
}

.card .info-wrapper:has(.skeleton), .playlist-expansible .right-column .info-wrapper:has(.skeleton)
{
    gap:7px;
}



</style>