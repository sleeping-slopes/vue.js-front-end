<template>
<div class="context-menu-nav" v-bind:class="{'context-active': this.active}">
  <div class="context-header" ref="header" v-on:click="this.active=!this.active">
    <slot name="header"></slot>
  </div>
  <ul class="context-options">
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

.context-menu-nav .context-header
{
  height:100%;
}

.context-menu-nav .context-options
{
  position:absolute;
  top:100%;
  display:flex;
  flex-direction: column;
  background-color: var(--panel-background-color);
  border-bottom-left-radius:3px;
  border-bottom-right-radius:3px;
  border: 1px solid var(--panel-border-color);
  overflow:hidden;
  box-shadow: 0 0 15px 1px rgba(0,0,0,.2);
  border-top:none;
  visibility:hidden;
}

.context-menu-nav.context-active .context-options { visibility:visible; }

</style>