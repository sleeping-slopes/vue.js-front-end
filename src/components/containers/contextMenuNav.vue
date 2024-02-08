<template>
<div class="context-menu-nav" v-bind:class="{'context-menu-nav-active': this.active}">
  <div class="context-menu-nav-header" ref="header" v-on:click="this.active=!this.active">
    <slot name="header"></slot>
  </div>
  <ul class="context-menu-nav-options">
    <slot name="options"></slot>
  </ul>
</div>
</template>

<script>

export default
{
  name: 'contextMenuNav',
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

.context-menu-nav
{
  position:relative;
  height:100%;
}

.context-menu-nav .context-menu-nav-header
{
  height:100%;
}

.context-menu-nav .context-menu-nav-options
{
  position:absolute;
  top:100%;
  display:none;
  flex-direction: column;
  background-color: var(--panel-background-color);
  border-bottom-left-radius:3px;
  border-bottom-right-radius:3px;
  border: 1px solid var(--panel-border-color);
  overflow:hidden;
  box-shadow: 0 0 15px 1px rgba(0,0,0,.2);
  border-top:none;
}

.context-menu-nav.context-menu-nav-active .context-menu-nav-options { display:flex; }

</style>