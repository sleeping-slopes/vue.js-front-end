<template>
    <div class="skeleton" v-bind:style="{'width':this.width+'px'}">&#8203</div>
</template>

<script>

export default
{
  name: 'skeleton',
  props:
  {
    minwidth: { default: 80 },
    maxwidth: { default: 200 },
    exactwidth: { default: 0 }
  },
  computed:
  {
    width() { return this.exactwidth || Math.floor(this.minwidth+Math.random()*(this.maxwidth+1-this.minwidth)) }
  }
}

</script>