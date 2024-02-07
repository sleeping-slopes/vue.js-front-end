<template>
<div class="context-menu" v-bind:class="{'context-menu-active': this.active}">
  <div class="context-menu-header" ref="header" v-on:click="this.active=!this.active">
    <slot name="header"></slot>
  </div>
  <ul class="context-menu-options">
    <slot name="options"></slot>
  </ul>
</div>
</template>

<script>

export default
{
  name: 'contextMenu',
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

.context-menu
{
  border-radius:3px;
  background-color: var(--soft-white);
  overflow:hidden;
  box-shadow: 0 0 15px 1px rgba(0,0,0,.2);
}

.context-menu:not(.context-menu-active) { opacity:0.0; }

div:hover > .context-menu:not(.context-menu-active) { opacity:0.7; }

div:hover > .context-menu:hover { opacity:1.0; }


.context-menu .context-menu-options
{
  display:none;
  flex-direction: column;
  width:100%;
}

.context-menu.context-menu-active .context-menu-options { display:flex; }

</style>