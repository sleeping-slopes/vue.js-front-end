

<template>
<div class="my-dropdown">
    <div  @click.stop="this.show=!this.show" v-bind:class="{'toggled':this.show}">
        <slot name="label"></slot>
    </div>
    <div class="dropdown-wrapper" v-show="this.show">
        <div class="dropdown-menu" >
            <slot name="dropdown"></slot>
        </div>
    </div>
</div>

</template>

  <script>

export default
{
name: 'dropdown',
data()
{
    return{
        show:false
    }
},
mounted()
{
    document.addEventListener('click', this.close);
},
beforeDestroy()
{
    document.removeEventListener('click',this.close);
},
methods:
{
    close(e)
    {
        if (!this.$el.contains(e.target)) this.show = false;
    }
}
}

</script>

<style scoped>

.my-dropdown
{
    position: relative;
    display:flex;
    align-items: center;
    /* background-color:red; */

}

.dropdown-wrapper
{
    position:absolute;
    top:100%;
    right:0;
    border-radius: 5px;
    overflow: hidden;
    background-color: var(--panel-background-color);
    box-shadow: 0 0 15px 1px rgba(0,0,0,.2);
}

.dropdown-menu
{
    z-index: 999;
    display:flex;
    flex-direction: column;
}

.dropdown-menu > button
{
    background:none;
    border:none;
    width:100%;
    border: 1px solid var(--panel-border-color);
    color: var(--text-color-primary);
    cursor:pointer;
    padding:4px 10px 4px 10px;
    white-space: nowrap;
}

.dropdown-menu > button:hover
{
    background-color:var(--selected-item-background-color);
}

</style>