<template>
    <div class="context-menu-select" v-bind:class="{'context-menu-select-active': this.active}">
        <div class="context-menu-select-header" ref="header" v-on:click="this.active=!this.active">
            <slot name="header"></slot>
        </div>
        <ul class="context-menu-select-options">
            <slot name="options"></slot>
        </ul>
    </div>
</template>

<script>

export default
{
    name: 'contextMenuSelect',
    data()
    {
        return {
            active:false
        }
    },
    mounted()
    {
        document.addEventListener('click', this.close);
    },
    beforeUnmount()
    {
        document.removeEventListener('click', this.close);
    },
    methods:
    {
        close(e)
        {
            if (!this.$refs.header.contains(e.target)) this.active=false;
        }
    }
}

</script>

<style scoped>

.context-menu-select
{
    position:relative;
}

.context-menu-select .context-menu-select-header
{
    height:100%;
    width:100%;
}

.context-menu-select .context-menu-select-options
{
    display:flex;
    flex-direction: column;
    width:100%;
    position:absolute;
    z-index:10;
    box-shadow: 0 0 15px 1px rgba(0,0,0,.2);
    visibility:hidden;
    border-bottom-left-radius:8px;
    border-bottom-right-radius:8px;
    overflow:hidden;
}

.context-menu-select.context-menu-select-active .context-menu-select-options { visibility:visible; }

</style>