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