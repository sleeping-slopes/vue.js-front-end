

<template>
    <div class="context-menu" :style="'left:'+ this.x +'px; top:'+ this.y +'px;'">
      <button class="button button-context h6 icon-text"><span class="bi bi-suit-heart-fill"></span><span>CONTEXTMENU</span></button>
      <button class="button button-context h6 icon-text"><span class="bi bi-suit-heart-fill"></span><span>CONTEXTMENU</span></button>
      <button class="button button-context h6 icon-text"><span class="bi bi-suit-heart-fill"></span><span>CONNU</span></button>
      <button class="button button-context h6 icon-text"><span class="bi bi-suit-heart-fill"></span><span>CONTEXTMENU</span></button>
    </div>
</template>

  <script>

export default
{
name: 'dropdown',
data()
{
    return{
        isDropped: false
    }
},
props:
{
    x: {default:0},
    y: {default:0}
},
methods: {
    dropIt() {
      this.isDropped = !this.isDropped
    }
  }
}

</script>

<style scoped>


.context-menu
{
  position:absolute;
  background-color: var(--panel-background-color);
  display:flex;
  flex-direction: column;
  overflow:hidden;
  border-radius: 5px;
  border:1px solid var(--panel-border-color);
}

.button-context
{
  padding: 3px 5px 3px 5px;
  border:none;
  border-bottom:1px solid var(--panel-border-color);
  color: var(--text-color-primary);
  background-color:transparent;
  width:100%;
  justify-content: flex-start;
}

.button-context:hover
{
  background-color: var(--selected-item-background-color);
}

</style>